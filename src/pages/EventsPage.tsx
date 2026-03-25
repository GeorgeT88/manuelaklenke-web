import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dieGuteTageImg from '../photo/p9.png';

function EventsPage() {
  const { t } = useTranslation('events');

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'primary.main',
            px: { xs: 3, md: 6 },
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            pt: { xs: 4, md: 5 },
          }}
        >
          <Typography variant="h2" component="h1" sx={{ mb: 6, color: '#ffffff', fontWeight: 700 }}>
            {t('heading')}
          </Typography>

          <Box>
            <Box
              component="img"
              src={dieGuteTageImg}
              alt={t('dieGuteTage.title')}
              sx={{ width: '100%', maxWidth: 520, borderRadius: 2, mb: 3, display: 'block' }}
            />
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('dieGuteTage.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('dieGuteTage.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('dieGuteTage.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('dieGuteTage.description')}
            </Typography>
            <Link
              href="https://lcb.de/programm/die-guten-tage-6/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('dieGuteTage.link')} →
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default EventsPage;
