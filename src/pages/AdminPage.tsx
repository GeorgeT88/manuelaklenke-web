import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const LANGUAGES = ['en', 'de', 'ro'] as const;
type Lang = typeof LANGUAGES[number];

interface ContentRow {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image_alt: string;
}

type AllContent = Record<Lang, ContentRow>;

const EMPTY_ROW: ContentRow = {
  heading: '',
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  image_alt: '',
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState<AllContent>({ en: { ...EMPTY_ROW }, de: { ...EMPTY_ROW }, ro: { ...EMPTY_ROW } });
  const [selectedLang, setSelectedLang] = useState<Lang>('en');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchAllContent();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAllContent();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchAllContent() {
    const { data } = await supabase.from('about_content').select('*');
    if (data) {
      const map: AllContent = { en: { ...EMPTY_ROW }, de: { ...EMPTY_ROW }, ro: { ...EMPTY_ROW } };
      for (const row of data) {
        if (LANGUAGES.includes(row.lang as Lang)) map[row.lang as Lang] = row;
      }
      setContent(map);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
  }

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    const { error } = await supabase
      .from('about_content')
      .update(content[selectedLang])
      .eq('lang', selectedLang);
    setSaving(false);
    if (error) {
      setSaveMessage(`Error: ${error.message}`);
    } else {
      setSaveMessage('Saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  }

  function handleChange(field: keyof ContentRow, value: string) {
    setContent(prev => ({
      ...prev,
      [selectedLang]: { ...prev[selectedLang], [field]: value },
    }));
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return (
      <Container maxWidth="xs" sx={{ mt: 10 }}>
        <Typography variant="h5" mb={3}>Admin Login</Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <Button type="submit" variant="contained">Login</Button>
        </Box>
      </Container>
    );
  }

  const current = content[selectedLang];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Edit About Me</Typography>
        <Button variant="outlined" onClick={() => supabase.auth.signOut()}>Logout</Button>
      </Box>

      <Tabs value={selectedLang} onChange={(_, v: Lang) => setSelectedLang(v)} sx={{ mb: 3 }}>
        <Tab label="English" value="en" />
        <Tab label="Deutsch" value="de" />
        <Tab label="Română" value="ro" />
      </Tabs>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Heading"
          value={current.heading}
          onChange={e => handleChange('heading', e.target.value)}
          fullWidth
        />
        <TextField
          label="Paragraph 1"
          value={current.paragraph1}
          onChange={e => handleChange('paragraph1', e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Paragraph 2"
          value={current.paragraph2}
          onChange={e => handleChange('paragraph2', e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Paragraph 3"
          value={current.paragraph3}
          onChange={e => handleChange('paragraph3', e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Image Alt Text"
          value={current.image_alt}
          onChange={e => handleChange('image_alt', e.target.value)}
          fullWidth
        />
        {saveMessage && (
          <Alert severity={saveMessage.startsWith('Error') ? 'error' : 'success'}>
            {saveMessage}
          </Alert>
        )}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{ alignSelf: 'flex-start' }}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </Box>
    </Container>
  );
}

export default AdminPage;
