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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const TEXT_BG = '#5B4A3F';
const BUCKET = 'event-photos';

interface EventLangContent {
  title: string;
  date: string;
  location: string;
  description: string;
  link_text: string;
}

interface EventRow {
  id: string;
  photo_url: string;
  link_url: string | null;
  photo_credit: string | null;
  photo_credit_url: string | null;
  photo_credit_icon: string;
  order_index: number;
  content: { en: EventLangContent; de: EventLangContent; ro: EventLangContent };
}

const EMPTY_LANG: EventLangContent = { title: '', date: '', location: '', description: '', link_text: '' };

interface FormData {
  link_url: string;
  photo_credit: string;
  photo_credit_url: string;
  photo_credit_icon: string;
  order_index: number;
  en: EventLangContent;
  de: EventLangContent;
  ro: EventLangContent;
}

const EMPTY_FORM: FormData = {
  link_url: '', photo_credit: '', photo_credit_url: '', photo_credit_icon: '📷', order_index: 0,
  en: { ...EMPTY_LANG }, de: { ...EMPTY_LANG }, ro: { ...EMPTY_LANG },
};

async function uploadToStorage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'webp';
  const fileName = `event-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return publicUrl;
}

function AdminEventsPage() {
  const { t, i18n } = useTranslation('common');
  const lang = (i18n.language ?? 'en').split('-')[0] as 'en' | 'de' | 'ro';

  function getContent(event: EventRow): EventLangContent {
    const langContent = event.content?.[lang];
    if (langContent?.title) return langContent;
    return event.content?.en ?? { title: '', date: '', location: '', description: '', link_text: '' };
  }

  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [tabValue, setTabValue] = useState<'common' | 'en' | 'de' | 'ro'>('common');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchEvents();
  }, [session]);

  async function fetchEvents() {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setPageError(null);
    const { data, error } = await supabase.from('events').select('*').order('order_index');
    setLoading(false);
    fetchingRef.current = false;
    if (error) setPageError(error.message);
    else setEvents(data ?? []);
  }

  function openAdd() {
    setEditEventId(null);
    setFormData({ ...EMPTY_FORM, order_index: events.length });
    setSelectedFile(null);
    setPreviewUrl('');
    setTabValue('common');
    setFormError(null);
    setSaved(false);
    setDialogOpen(true);
  }

  function openEdit(event: EventRow) {
    setEditEventId(event.id);
    setFormData({
      link_url: event.link_url ?? '',
      photo_credit: event.photo_credit ?? '',
      photo_credit_url: event.photo_credit_url ?? '',
      photo_credit_icon: event.photo_credit_icon ?? '📷',
      order_index: event.order_index,
      en: { ...EMPTY_LANG, ...event.content?.en },
      de: { ...EMPTY_LANG, ...event.content?.de },
      ro: { ...EMPTY_LANG, ...event.content?.ro },
    });
    setSelectedFile(null);
    setPreviewUrl(event.photo_url);
    setTabValue('common');
    setFormError(null);
    setSaved(false);
    setDialogOpen(true);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function setLang(lang: 'en' | 'de' | 'ro', field: keyof EventLangContent, value: string) {
    setFormData(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  }

  async function handleSave() {
    if (!selectedFile && !editEventId) { setFormError('Please select an image file.'); return; }
    setSaving(true);
    setFormError(null);

    let photoUrl = previewUrl;
    if (selectedFile) {
      try {
        photoUrl = await uploadToStorage(selectedFile);
      } catch (err: unknown) {
        setFormError(err instanceof Error ? err.message : 'Upload failed');
        setSaving(false);
        return;
      }
    }

    const payload = {
      photo_url: photoUrl,
      link_url: formData.link_url.trim() || null,
      photo_credit: formData.photo_credit.trim() || null,
      photo_credit_url: formData.photo_credit_url.trim() || null,
      photo_credit_icon: formData.photo_credit_icon || '📷',
      order_index: formData.order_index,
      content: { en: formData.en, de: formData.de, ro: formData.ro },
    };

    let error = null;
    if (editEventId) {
      ({ error } = await supabase.from('events').update(payload).eq('id', editEventId));
    } else {
      ({ error } = await supabase.from('events').insert(payload));
    }

    setSaving(false);
    if (error) { setFormError(error.message); return; }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setDialogOpen(false);
      fetchingRef.current = false;
      fetchEvents();
    }, 300);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await supabase.from('events').delete().eq('id', deleteId);
    setDeleting(false);
    if (error) { setPageError(error.message); return; }
    setDeleteId(null);
    fetchingRef.current = false;
    fetchEvents();
  }

  if (session === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }
  if (!session) return <Navigate to="/admin" replace />;

  const inputSx = { mb: 0 };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FAF7F4', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {t('nav.updateEvents')}
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}
            sx={{ backgroundColor: TEXT_BG, '&:hover': { backgroundColor: '#4a3830' } }}>
            Add Event
          </Button>
        </Box>

        {pageError && (
          <Box sx={{ color: 'error.main', mb: 3, p: 1.5, border: '1px solid', borderColor: 'error.main', borderRadius: 1, fontSize: '0.875rem' }}>
            {pageError}
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {events.length === 0 && (
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 6 }}>
                No events yet. Click "Add Event" to get started.
              </Typography>
            )}
            {events.map((event) => {
              const c = getContent(event);
              return (
              <Box key={event.id} sx={{
                display: 'flex', gap: 2, alignItems: 'center', p: 2,
                backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>
                <Box component="img" src={event.photo_url} alt=""
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = '#e0d6d0'; }}
                  sx={{ width: 80, height: 90, objectFit: 'cover', borderRadius: 1, flexShrink: 0, border: `2px solid ${TEXT_BG}`, backgroundColor: '#e0d6d0' }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: TEXT_BG, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.title || '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    {c.date}{c.location ? ` · ${c.location}` : ''}
                  </Typography>
                  {c.description && (
                    <Typography variant="body2" sx={{
                      color: 'text.secondary',
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {c.description}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                  <IconButton size="small" onClick={() => openEdit(event)}
                    sx={{ backgroundColor: TEXT_BG, color: '#fff', borderRadius: 1, px: 1.5, '&:hover': { backgroundColor: '#4a3830' } }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeleteId(event.id)}
                    sx={{ backgroundColor: '#c62828', color: '#fff', borderRadius: 1, px: 1.5, '&:hover': { backgroundColor: '#a31515' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              );
            })}
          </Box>
        )}
      </Container>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editEventId ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ px: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tab label="Common" value="common" />
          <Tab label="EN" value="en" />
          <Tab label="DE" value="de" />
          <Tab label="RO" value="ro" />
        </Tabs>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          {formError && (
            <Box sx={{ color: 'error.main', fontSize: '0.875rem', p: 1, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
              {formError}
            </Box>
          )}

          {/* Common tab */}
          {tabValue === 'common' && (
            <>
              {previewUrl && (
                <Box sx={{ textAlign: 'center' }}>
                  <Box component="img" src={previewUrl} alt="Preview"
                    sx={{ maxHeight: 160, maxWidth: '100%', objectFit: 'contain', borderRadius: 1, border: `2px solid ${TEXT_BG}` }} />
                </Box>
              )}
              <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}
                sx={{ borderColor: TEXT_BG, color: TEXT_BG, '&:hover': { borderColor: '#4a3830', backgroundColor: '#f5f0ec' } }}>
                {selectedFile ? selectedFile.name : (editEventId ? 'Replace image…' : 'Choose image…')}
                <input type="file" accept="image/*" hidden onChange={handleFile} />
              </Button>
              <TextField label="Event link URL" fullWidth sx={inputSx}
                value={formData.link_url} onChange={e => setFormData(p => ({ ...p, link_url: e.target.value }))}
                helperText="URL to event page" />
              <TextField label="Photo credit name" fullWidth sx={inputSx}
                value={formData.photo_credit} onChange={e => setFormData(p => ({ ...p, photo_credit: e.target.value }))}
                helperText='e.g. "Marius Şumlea"' />
              <TextField label="Photo credit URL (optional)" fullWidth sx={inputSx}
                value={formData.photo_credit_url} onChange={e => setFormData(p => ({ ...p, photo_credit_url: e.target.value }))}
                helperText="Link on the credit badge (e.g. Instagram post)" />
              <TextField label="Photo credit icon" fullWidth sx={inputSx}
                value={formData.photo_credit_icon} onChange={e => setFormData(p => ({ ...p, photo_credit_icon: e.target.value }))}
                helperText='📷 for photo, 🎨 for illustration' />
              <TextField label="Order" type="number" fullWidth sx={inputSx}
                value={formData.order_index} onChange={e => setFormData(p => ({ ...p, order_index: Number(e.target.value) }))}
                helperText="Display order (lower = first)" />
            </>
          )}

          {/* Language tabs */}
          {(['en', 'de', 'ro'] as const).map(lang => tabValue === lang && (
            <Box key={lang} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Title" fullWidth value={formData[lang].title}
                onChange={e => setLang(lang, 'title', e.target.value)} />
              <TextField label="Date" fullWidth value={formData[lang].date}
                onChange={e => setLang(lang, 'date', e.target.value)}
                helperText='e.g. "6 November 2025" or "27–30 March 2025 · 10:00 am"' />
              <TextField label="Location" fullWidth value={formData[lang].location}
                onChange={e => setLang(lang, 'location', e.target.value)} />
              <TextField label="Description" fullWidth multiline rows={4} value={formData[lang].description}
                onChange={e => setLang(lang, 'description', e.target.value)} />
              <TextField label="Link text" fullWidth value={formData[lang].link_text}
                onChange={e => setLang(lang, 'link_text', e.target.value)}
                helperText='e.g. "More about the event"' />
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}
            sx={{ backgroundColor: saved ? '#66bb6a' : TEXT_BG, '&:hover': { backgroundColor: saved ? '#57a05a' : '#4a3830' } }}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event? This cannot be undone.</Typography>
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

export default AdminEventsPage;
