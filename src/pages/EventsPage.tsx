import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import dieGuteTageImg from '../photo/p9.png';
import dieGuteTageImg2 from '../photo/p11.png';
import buchmesseImg from '../photo/p10.png';

const dieGuteTagePhotos = [dieGuteTageImg, dieGuteTageImg2];

function EventsPage() {
  const { t } = useTranslation('events');
  const [carouselIndex, setCarouselIndex] = useState(0);

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
            <Box
              component="img"
              src={buchmesseImg}
              alt={t('leipzigerBuchmesse.title')}
              sx={{ width: '100%', maxWidth: 520, borderRadius: 2, mb: 3, display: 'block' }}
            />
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
            {/* Carousel */}
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 520, mb: 3 }}>
              <Box
                component="img"
                src={dieGuteTagePhotos[carouselIndex]}
                alt={`${t('dieGuteTage.title')} ${carouselIndex + 1}`}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              {/* Prev button */}
              <IconButton
                onClick={() => setCarouselIndex((carouselIndex - 1 + dieGuteTagePhotos.length) % dieGuteTagePhotos.length)}
                sx={{
                  position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.45)', color: '#fff',
                  width: 36, height: 36, borderRadius: '50%',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
                aria-label="previous photo"
              >
                ‹
              </IconButton>
              {/* Next button */}
              <IconButton
                onClick={() => setCarouselIndex((carouselIndex + 1) % dieGuteTagePhotos.length)}
                sx={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.45)', color: '#fff',
                  width: 36, height: 36, borderRadius: '50%',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
                aria-label="next photo"
              >
                ›
              </IconButton>
              {/* Dots */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                {dieGuteTagePhotos.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    sx={{
                      width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
                      backgroundColor: i === carouselIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                      transition: 'background-color 0.2s',
                    }}
                  />
                ))}
              </Box>
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
