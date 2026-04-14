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
import { useAboutContent } from '../hooks/useAboutContent';

const TEXT_BG = '#5B4A3F';

type FieldKey = 'heading' | 'paragraph1' | 'paragraph2' | 'paragraph3';

const fieldSx = {
  '& .MuiInput-root': { color: '#ffffff' },
  '& .MuiInput-underline:before': { borderBottomColor: '#ffffff44' },
  '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
};

function EditableField({
  label, rows = 4, value, onChange, onSave, saving, saved,
}: {
  label: string;
  rows?: number;
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <Box>
      <TextField
        variant="standard"
        multiline
        fullWidth
        rows={rows}
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        InputLabelProps={{ style: { color: '#ffffffaa' } }}
        sx={fieldSx}
      />
      <Button
        size="small"
        variant="contained"
        onClick={onSave}
        disabled={saving}
        sx={{
          mt: 1,
          backgroundColor: saved ? '#66bb6a' : '#ffffff',
          color: saved ? '#ffffff' : TEXT_BG,
          '&:hover': { backgroundColor: saved ? '#57a05a' : '#e0d6d0' },
        }}
      >
        {saving ? 'Saving…' : 'Save'}
      </Button>
    </Box>
  );
}

function AdminAboutPage() {
  const { t, i18n } = useTranslation('about');
  const dbContent = useAboutContent();
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
    setFields({
      heading: dbContent?.heading ?? t('heading'),
      paragraph1: dbContent?.paragraph1 ?? t('paragraph1'),
      paragraph2: dbContent?.paragraph2 ?? t('paragraph2'),
      paragraph3: dbContent?.paragraph3 ?? t('paragraph3'),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbContent]);

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
      setTimeout(() => setSaved(null), 300);
    }
  }

  if (session === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!session) return <Navigate to="/admin" replace />;

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
            <EditableField label="Heading" rows={1} value={fields.heading} onChange={v => setFields(p => ({ ...p, heading: v }))} onSave={() => saveField('heading')} saving={saving === 'heading'} saved={saved === 'heading'} />
            <EditableField label="Paragraph 1" value={fields.paragraph1} onChange={v => setFields(p => ({ ...p, paragraph1: v }))} onSave={() => saveField('paragraph1')} saving={saving === 'paragraph1'} saved={saved === 'paragraph1'} />
            <EditableField label="Paragraph 2" value={fields.paragraph2} onChange={v => setFields(p => ({ ...p, paragraph2: v }))} onSave={() => saveField('paragraph2')} saving={saving === 'paragraph2'} saved={saved === 'paragraph2'} />
            <EditableField label="Paragraph 3" value={fields.paragraph3} onChange={v => setFields(p => ({ ...p, paragraph3: v }))} onSave={() => saveField('paragraph3')} saving={saving === 'paragraph3'} saved={saved === 'paragraph3'} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminAboutPage;
