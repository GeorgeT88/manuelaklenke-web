import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dieGuteTageImg from '../photo/p9.png';
import buchmesseImg from '../photo/p10.png';
import worteBewegenImg from '../photo/p11.png';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DHuEs2BsUD9/',
  'https://www.instagram.com/p/C_6NMFONdsT/',
];

function EventsPage() {
  const { t } = useTranslation('events');

  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    if (document.getElementById(scriptId)) {
      window.instgrm?.Embeds.process();
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

          {/* Die guten Tage VI */}
          <Box sx={{ mb: 8 }}>
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

          {/* Leipziger Buchmesse */}
          <Box sx={{ mb: 8 }}>
            <Box
              component="img"
              src={buchmesseImg}
              alt={t('leipzigerBuchmesse.title')}
              sx={{ width: '100%', maxWidth: 520, borderRadius: 2, mb: 3, display: 'block' }}
            />
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('leipzigerBuchmesse.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('leipzigerBuchmesse.date')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('leipzigerBuchmesse.description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Link
                href="https://www.doopin.de/2024/leipziger-buchmesse-2025/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
              >
                {t('leipzigerBuchmesse.link1')} →
              </Link>
              <Link
                href="https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
              >
                {t('leipzigerBuchmesse.link2')} →
              </Link>
            </Box>
          </Box>

          {/* Worte bewegen Welten */}
          <Box sx={{ mb: 8 }}>
            <Box
              component="img"
              src={worteBewegenImg}
              alt={t('worteBewegenWelten.title')}
              sx={{ width: '100%', maxWidth: 520, borderRadius: 2, mb: 3, display: 'block' }}
            />
            <Typography variant="h5" sx={{ mb: 2.5, color: '#ffffff', fontWeight: 600 }}>
              {t('worteBewegenWelten.title')}
            </Typography>
            <Link
              href="https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('worteBewegenWelten.link')} →
            </Link>
          </Box>

          {/* Instagram posts */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {INSTAGRAM_POSTS.map((url) => (
              <Box key={url} sx={{ maxWidth: 400, width: '100%' }}>
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{ margin: 0, width: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default EventsPage;
