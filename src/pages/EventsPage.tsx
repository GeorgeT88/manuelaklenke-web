import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dieGuteTageImg2 from '../photo/p11.png';
import buchmesseImg from '../photo/p10.png';

function EventsPage() {
  const { t } = useTranslation('events');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: 'primary.main',
            px: { xs: 3, md: 6 },
            pt: { xs: 4, md: 5 },
            pb: 8,
          }}
        >
          <Typography variant="h2" component="h1" sx={{ mb: 6, color: '#ffffff', fontWeight: 700 }}>
            {t('heading')}
          </Typography>

          {/* Leipziger Buchmesse */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={buchmesseImg}
                alt={t('leipzigerBuchmesse.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('leipzigerBuchmesse.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('leipzigerBuchmesse.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('leipzigerBuchmesse.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('leipzigerBuchmesse.description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Link
                href="https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
              >
                {t('leipzigerBuchmesse.link1')} →
              </Link>
            </Box>
          </Box>

          {/* Die guten Tage VI */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={dieGuteTageImg2}
                alt={t('dieGuteTage.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
            </Box>
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
