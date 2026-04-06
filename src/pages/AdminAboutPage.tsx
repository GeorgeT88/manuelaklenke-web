import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import profilePhotoDesktop from '../photo/profilePhoto2.webp';
import profilePhotoMobile from '../photo/profilePhoto3.webp';
import { supabase } from '../lib/supabase';

const TEXT_BG = '#5B4A3F';

type FieldKey = 'heading' | 'paragraph1' | 'paragraph2' | 'paragraph3';

function AdminAboutPage() {
  const { i18n } = useTranslation('about');
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [fields, setFields] = useState({ heading: '', paragraph1: '', paragraph2: '', paragraph3: '' });
  const [saving, setSaving] = useState<FieldKey | null>(null);
  const [saved, setSaved] = useState<FieldKey | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const lang = (i18n.language ?? 'en').split('-')[0];
    const validLang = ['en', 'de', 'ro'].includes(lang) ? lang : 'en';
    supabase.from('about_content').select('*').eq('lang', validLang).single().then(({ data }) => {
      if (data) setFields({ heading: data.heading, paragraph1: data.paragraph1, paragraph2: data.paragraph2, paragraph3: data.paragraph3 });
    });
  }, [session, i18n.language]);

  async function saveField(field: FieldKey) {
    setSaving(field);
    setSaveError(null);
    const lang = (i18n.language ?? 'en').split('-')[0];
    const validLang = ['en', 'de', 'ro'].includes(lang) ? lang : 'en';
    const { error } = await supabase.from('about_content').update({ [field]: fields[field] }).eq('lang', validLang);
    setSaving(null);
    if (error) {
      setSaveError(`${field}: ${error.message}`);
    } else {
      setSaved(field);
      setTimeout(() => setSaved(null), 2000);
    }
  }

  if (session === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!session) return <Navigate to="/admin" replace />;

  const fieldSx = {
    '& .MuiInput-root': { color: '#ffffff' },
    '& .MuiInput-underline:before': { borderBottomColor: '#ffffff44' },
    '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
  };

  function EditableField({ fieldKey, label, rows = 4 }: { fieldKey: FieldKey; label: string; rows?: number }) {
    return (
      <Box>
        <TextField
          variant="standard"
          multiline
          fullWidth
          rows={rows}
          label={label}
          value={fields[fieldKey]}
          onChange={e => setFields(prev => ({ ...prev, [fieldKey]: e.target.value }))}
          InputLabelProps={{ style: { color: '#ffffffaa' } }}
          sx={fieldSx}
        />
        <Button
          size="small"
          variant="contained"
          onClick={() => saveField(fieldKey)}
          disabled={saving === fieldKey}
          sx={{ mt: 1, backgroundColor: '#ffffff', color: TEXT_BG, '&:hover': { backgroundColor: '#e0d6d0' } }}
        >
          {saving === fieldKey ? 'Saving…' : saved === fieldKey ? 'Saved!' : 'Save'}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

        {/* Photo side */}
        <Box sx={{ position: 'relative', flex: { md: 1 }, backgroundColor: { xs: TEXT_BG, md: 'transparent' } }}>
          <Box component="img" src={profilePhotoMobile} alt=""
            sx={{ width: '100%', height: 'auto', maxHeight: '35vh', objectFit: 'contain', display: { xs: 'block', md: 'none' } }} />
          <Box component="img" src={profilePhotoDesktop} alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: { xs: 'none', md: 'block' } }} />
        </Box>

        {/* Edit side */}
        <Box sx={{
          flex: { md: 1 },
          backgroundColor: TEXT_BG,
          px: { xs: 3, md: 6, lg: 8 },
          py: 6,
          overflowY: 'auto',
        }}>
          <Typography variant="h6" sx={{ color: '#ffffffaa', mb: 3 }}>
            Editing: {(i18n.language ?? 'en').split('-')[0].toUpperCase()}
          </Typography>
          {saveError && (
            <Box sx={{ color: '#ffaaaa', fontSize: '0.85rem', p: 1, border: '1px solid #ffaaaa', borderRadius: 1, mb: 2 }}>
              Save failed: {saveError}
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <EditableField fieldKey="heading" label="Heading" rows={1} />
            <EditableField fieldKey="paragraph1" label="Paragraph 1" />
            <EditableField fieldKey="paragraph2" label="Paragraph 2" />
            <EditableField fieldKey="paragraph3" label="Paragraph 3" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminAboutPage;
