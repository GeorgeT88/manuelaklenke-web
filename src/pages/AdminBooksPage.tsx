import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { supabase } from '../lib/supabase';

const TEXT_BG = '#5B4A3F';
const BUCKET = 'book-covers';

interface Book {
  id: string;
  photo_url: string;
  link: string | null;
  order_index: number;
}

async function uploadToStorage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'webp';
  const fileName = `book-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return publicUrl;
}

function AdminBooksPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  // Edit dialog
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string>('');
  const [editLink, setEditLink] = useState('');
  const [editOrder, setEditOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Add dialog
  const [addOpen, setAddOpen] = useState(false);
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addPreview, setAddPreview] = useState<string>('');
  const [addLink, setAddLink] = useState('');
  const [addOrder, setAddOrder] = useState(0);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchBooks();
  }, [session]);

  async function fetchBooks() {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('translated_books')
      .select('*')
      .order('order_index');

    if (error) {
      setError(error.message);
      setLoading(false);
      fetchingRef.current = false;
      return;
    }

    const rows: Book[] = data ?? [];

    // Deduplicate by photo_url — keep the first occurrence, delete the rest
    const seen = new Map<string, string>();
    const toDelete: string[] = [];
    for (const book of rows) {
      if (seen.has(book.photo_url)) {
        toDelete.push(book.id);
      } else {
        seen.set(book.photo_url, book.id);
      }
    }
    if (toDelete.length > 0) {
      await supabase.from('translated_books').delete().in('id', toDelete);
    }

    setBooks(rows.filter(b => !toDelete.includes(b.id)));
    setLoading(false);
    fetchingRef.current = false;
  }

  function openEdit(book: Book) {
    setEditBook(book);
    setEditFile(null);
    setEditPreview(book.photo_url);
    setEditLink(book.link ?? '');
    setEditOrder(book.order_index);
    setEditError(null);
    setSaved(false);
  }

  function handleEditFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (editPreview.startsWith('blob:')) URL.revokeObjectURL(editPreview);
    setEditFile(file);
    setEditPreview(URL.createObjectURL(file));
  }

  function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (addPreview.startsWith('blob:')) URL.revokeObjectURL(addPreview);
    setAddFile(file);
    setAddPreview(URL.createObjectURL(file));
  }

  async function saveEdit() {
    if (!editBook) return;
    setSaving(true);
    setEditError(null);

    let photoUrl = editBook.photo_url;
    if (editFile) {
      try {
        photoUrl = await uploadToStorage(editFile);
      } catch (err: unknown) {
        setEditError(err instanceof Error ? err.message : 'Upload failed');
        setSaving(false);
        return;
      }
    }

    const { error } = await supabase
      .from('translated_books')
      .update({ photo_url: photoUrl, link: editLink.trim() || null, order_index: editOrder })
      .eq('id', editBook.id);

    setSaving(false);
    if (error) { setEditError(error.message); return; }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditBook(null);
      fetchingRef.current = false;
      fetchBooks();
    }, 300);
  }

  async function addBook() {
    if (!addFile) { setAddError('Please select an image file.'); return; }
    setAdding(true);
    setAddError(null);

    let photoUrl: string;
    try {
      photoUrl = await uploadToStorage(addFile);
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : 'Upload failed');
      setAdding(false);
      return;
    }

    const { error } = await supabase.from('translated_books').insert({
      photo_url: photoUrl,
      link: addLink.trim() || null,
      order_index: addOrder,
    });

    setAdding(false);
    if (error) { setAddError(error.message); return; }

    if (addPreview.startsWith('blob:')) URL.revokeObjectURL(addPreview);
    setAddOpen(false);
    setAddFile(null);
    setAddPreview('');
    setAddLink('');
    setAddOrder(0);
    fetchingRef.current = false;
    fetchBooks();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await supabase.from('translated_books').delete().eq('id', deleteId);
    setDeleting(false);
    if (error) { setError(error.message); return; }
    setDeleteId(null);
    fetchingRef.current = false;
    fetchBooks();
  }

  if (session === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!session) return <Navigate to="/admin" replace />;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Update Translated Books
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setAddOpen(true);
              setAddError(null);
              setAddFile(null);
              setAddPreview('');
              setAddLink('');
              setAddOrder(books.length);
            }}
            sx={{ backgroundColor: TEXT_BG, '&:hover': { backgroundColor: '#4a3830' } }}
          >
            Add Book
          </Button>
        </Box>

        {error && (
          <Box sx={{ color: 'error.main', mb: 3, p: 1.5, border: '1px solid', borderColor: 'error.main', borderRadius: 1, fontSize: '0.875rem' }}>
            {error}
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
            {books.map((book) => (
              <Box key={book.id}>
                <Box
                  component="img"
                  src={book.photo_url}
                  alt="Book cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = '#e0d6d0'; }}
                  sx={{ width: '100%', aspectRatio: '2/3', display: 'block', objectFit: 'cover', border: '4px solid #5C3D2E', backgroundColor: '#e0d6d0' }}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
                  <IconButton size="small" onClick={() => openEdit(book)}
                    sx={{ backgroundColor: TEXT_BG, color: '#fff', borderRadius: 1, px: 1.5, '&:hover': { backgroundColor: '#4a3830' } }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeleteId(book.id)}
                    sx={{ backgroundColor: '#c62828', color: '#fff', borderRadius: 1, px: 1.5, '&:hover': { backgroundColor: '#a31515' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editBook !== null} onClose={() => setEditBook(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          {editError && (
            <Box sx={{ color: 'error.main', fontSize: '0.875rem', p: 1, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
              {editError}
            </Box>
          )}
          {/* Current / new cover preview */}
          {editPreview && (
            <Box sx={{ textAlign: 'center' }}>
              <Box component="img" src={editPreview} alt="Preview"
                sx={{ maxHeight: 180, objectFit: 'contain', border: `2px solid ${TEXT_BG}` }} />
            </Box>
          )}
          {/* Replace image */}
          <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}
            sx={{ borderColor: TEXT_BG, color: TEXT_BG, '&:hover': { borderColor: '#4a3830', backgroundColor: '#f5f0ec' } }}>
            {editFile ? editFile.name : 'Replace image…'}
            <input type="file" accept="image/*" hidden onChange={handleEditFile} />
          </Button>
          <TextField label="Link (optional)" fullWidth value={editLink}
            onChange={e => setEditLink(e.target.value)}
            helperText="URL to the book page (publisher, bookshop, etc.)" />
          <TextField label="Order" type="number" value={editOrder}
            onChange={e => setEditOrder(Number(e.target.value))}
            helperText="Display order (lower numbers appear first)" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditBook(null)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit} disabled={saving}
            sx={{ backgroundColor: saved ? '#66bb6a' : TEXT_BG, '&:hover': { backgroundColor: saved ? '#57a05a' : '#4a3830' } }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          {addError && (
            <Box sx={{ color: 'error.main', fontSize: '0.875rem', p: 1, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
              {addError}
            </Box>
          )}
          {/* Image preview */}
          {addPreview && (
            <Box sx={{ textAlign: 'center' }}>
              <Box component="img" src={addPreview} alt="Preview"
                sx={{ maxHeight: 180, objectFit: 'contain', border: `2px solid ${TEXT_BG}` }} />
            </Box>
          )}
          {/* File picker */}
          <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}
            sx={{ borderColor: TEXT_BG, color: TEXT_BG, '&:hover': { borderColor: '#4a3830', backgroundColor: '#f5f0ec' } }}>
            {addFile ? addFile.name : 'Choose image…'}
            <input type="file" accept="image/*" hidden onChange={handleAddFile} />
          </Button>
          <TextField label="Link (optional)" fullWidth value={addLink}
            onChange={e => setAddLink(e.target.value)}
            helperText="URL to the book page (publisher, bookshop, etc.)" />
          <TextField label="Order" type="number" value={addOrder}
            onChange={e => setAddOrder(Number(e.target.value))}
            helperText="Display order (lower numbers appear first)" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addBook} disabled={adding}
            sx={{ backgroundColor: TEXT_BG, '&:hover': { backgroundColor: '#4a3830' } }}>
            {adding ? 'Uploading…' : 'Add Book'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book? This cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminBooksPage;
