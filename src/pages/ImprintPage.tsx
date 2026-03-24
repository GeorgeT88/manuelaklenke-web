import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function ImprintPage() {
  const { t } = useTranslation('legal');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex' }}>
        <Box sx={{ flex: 1, backgroundColor: 'primary.main', px: { xs: 3, md: 6 }, py: 6 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 4, color: '#ffffff', fontWeight: 700 }}>
            {t('imprint.title')}
          </Typography>

          <Typography variant="h5" sx={{ mb: 1.5, color: '#ffffff', fontWeight: 600 }}>
            {t('imprint.responsible.heading')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>{t('imprint.responsible.name')}</Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.85)' }}>{t('imprint.responsible.email')}</Typography>

          <Typography variant="h5" sx={{ mb: 1.5, color: '#ffffff', fontWeight: 600 }}>
            {t('imprint.disclaimer.heading')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('imprint.disclaimer.body')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ImprintPage;
