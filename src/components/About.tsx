import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Session } from '@supabase/supabase-js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import profilePhotoDesktop from '../photo/profilePhoto2.webp';
import profilePhotoMobile from '../photo/profilePhoto3.webp';
import { useAboutContent } from '../hooks/useAboutContent';
import { supabase } from '../lib/supabase';

const TEXT_BG = '#5B4A3F';

type FieldKey = 'heading' | 'paragraph1' | 'paragraph2' | 'paragraph3';

function About() {
  const { t, i18n } = useTranslation('about');
  const dbContent = useAboutContent();
  const [session, setSession] = useState<Session | null>(null);
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
  }, [dbContent, t]);

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

  const heading = dbContent?.heading ?? t('heading');
  const paragraph1 = dbContent?.paragraph1 ?? t('paragraph1');
  const paragraph2 = dbContent?.paragraph2 ?? t('paragraph2');
  const paragraph3 = dbContent?.paragraph3 ?? t('paragraph3');
  const imageAlt = dbContent?.image_alt ?? t('imageAlt');

  const fieldSx = {
    '& .MuiInput-root': { color: '#ffffff' },
    '& .MuiInput-underline:before': { borderBottomColor: '#ffffff44' },
    '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
  };

  function EditableField({ fieldKey, label, rows = 4 }: { fieldKey: FieldKey; label: string; rows?: number }) {
    const isSaving = saving === fieldKey;
    const isSaved = saved === fieldKey;
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
          disabled={isSaving}
          sx={{ mt: 1, backgroundColor: '#ffffff', color: TEXT_BG, '&:hover': { backgroundColor: '#e0d6d0' } }}
        >
          {isSaving ? 'Saving…' : isSaved ? 'Saved!' : 'Save'}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="about"
      sx={{
        minHeight: '100vh',
        overflow: { xs: 'visible', md: 'hidden' },
        height: { xs: 'auto', md: session ? 'auto' : '100vh' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { xs: 'auto', md: '100%' } }}>

        {/* Photo side */}
        <Box
          sx={{
            position: 'relative',
            flex: { md: 1 },
            height: { xs: 'auto', md: '100%' },
            backgroundColor: { xs: TEXT_BG, md: 'transparent' },
          }}
        >
          <Box
            component="img"
            src={profilePhotoMobile}
            alt={imageAlt}
            sx={{ width: '100%', height: 'auto', maxHeight: '35vh', objectFit: 'contain', display: { xs: 'block', md: 'none' } }}
          />
          <Box
            component="img"
            src={profilePhotoDesktop}
            alt={imageAlt}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: { xs: 'none', md: 'block' } }}
          />
        </Box>

        {/* Text side */}
        <Box
          sx={{
            flex: { md: 1 },
            backgroundColor: TEXT_BG,
            display: 'flex',
            alignItems: { xs: 'flex-start', md: session ? 'flex-start' : 'center' },
            px: { xs: 3, md: 6, lg: 8 },
            py: { xs: 3, md: session ? 6 : 0 },
            overflowY: { xs: 'auto', md: session ? 'auto' : 'visible' },
            height: { xs: session ? 'auto' : '50vh', md: 'auto' },
          }}
        >
          {session ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', py: 2 }}>
              {saveError && (
                <Box sx={{ color: '#ffaaaa', fontSize: '0.85rem', p: 1, border: '1px solid #ffaaaa', borderRadius: 1 }}>
                  Save failed: {saveError}
                </Box>
              )}
              <EditableField fieldKey="heading" label="Heading" rows={1} />
              <EditableField fieldKey="paragraph1" label="Paragraph 1" />
              <EditableField fieldKey="paragraph2" label="Paragraph 2" />
              <EditableField fieldKey="paragraph3" label="Paragraph 3" />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: { xs: 8, md: 0 } }}>
              <Typography variant="h4" sx={{ color: '#ffffff', mb: 1 }}>{heading}</Typography>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph1}</Typography>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph2}</Typography>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph3}</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default About;
