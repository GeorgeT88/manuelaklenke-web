import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto from '../photo/profilePhoto.png';

function Hero() {
  const { t } = useTranslation('common');

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
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
        }}
      >
        <Box
          component="img"
          src={profilePhoto}
          alt={`${t('logo.name')} ${t('logo.surname')}`}
          sx={{
            width: '100%',
            height: { xs: '90vh', md: '95vh' },
            objectFit: 'contain',
            objectPosition: 'center center',
            display: 'block',
          }}
        />

        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />

        {/* Name */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 400,
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
            letterSpacing: { xs: '0.15em', md: '0.25em' },
            textTransform: 'uppercase',
          }}
        >
          {t('logo.name')} {t('logo.surname')}
        </Typography>
      </Box>
      </Container>
    </Box>
  );
}

export default Hero;
