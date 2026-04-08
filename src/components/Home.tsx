import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto from '../photo/profilePhoto.webp';

function Home() {
  const { t } = useTranslation('common');
  const imgRef = useRef<HTMLImageElement>(null);
  const [lineInset, setLineInset] = useState(0);

  const calcInset = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    const containerRatio = img.clientWidth / img.clientHeight;
    const naturalRatio = img.naturalWidth / img.naturalHeight;
    if (naturalRatio < containerRatio) {
      // photo letterboxed left/right — no top/bottom inset
      setLineInset(0);
    } else {
      // photo letterboxed top/bottom
      const renderedHeight = img.clientWidth / naturalRatio;
      setLineInset((img.clientHeight - renderedHeight) / 2);
    }
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) calcInset();
    img.addEventListener('load', calcInset);
    window.addEventListener('resize', calcInset);
    return () => {
      img.removeEventListener('load', calcInset);
      window.removeEventListener('resize', calcInset);
    };
  }, [calcInset]);

  return (
    <Box
      component="section"
      id="home"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
      {/* Centered photo container with overlay and name */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          lineHeight: 0,
          backgroundColor: 'primary.main',
        }}
      >
        <Box
          ref={imgRef}
          component="img"
          src={profilePhoto}
          alt={`${t('logo.name')} ${t('logo.surname')}`}
          sx={{
            width: '100%',
            height: { xs: '90vh', md: '95vh' },
            objectFit: 'contain',
            objectPosition: { xs: 'center center', md: 'center top' },
            display: 'block',
          }}
        />

        {/* Decorative brown vertical lines - before overlay */}
        <Box sx={{ position: 'absolute', left: 0, top: `${lineInset}px`, width: '11px', height: `calc(100% - ${lineInset * 2}px)`, backgroundColor: 'primary.main' }} />
        <Box sx={{ position: 'absolute', right: 0, top: `${lineInset}px`, width: '11px', height: `calc(100% - ${lineInset * 2}px)`, backgroundColor: 'primary.main' }} />

        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />

        {/* Decorative gray vertical lines - after overlay */}
        <Box sx={{ position: 'absolute', left: '11px', top: `${lineInset}px`, width: { xs: '3px', md: '6px' }, height: `calc(100% - ${lineInset * 2}px)`, backgroundColor: 'rgba(200,200,200,0.85)' }} />
        <Box sx={{ position: 'absolute', right: '11px', top: `${lineInset}px`, width: { xs: '3px', md: '6px' }, height: `calc(100% - ${lineInset * 2}px)`, backgroundColor: 'rgba(200,200,200,0.85)' }} />

{/* Name + tagline */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: '#ffffff',
              fontWeight: 400,
              fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
              letterSpacing: { xs: '0.15em', md: '0.25em' },
              textTransform: 'uppercase',
            }}
          >
            {t('logo.name')} {t('logo.surname')}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: '#ffffff',
              fontWeight: 300,
              fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
              letterSpacing: { xs: '0.1em', md: '0.18em' },
              mt: 0.75,
              opacity: 0.9,
            }}
          >
            {t('logo.subtitle')}
          </Typography>
        </Box>
      </Box>
      </Container>
    </Box>
  );
}

export default Home;
