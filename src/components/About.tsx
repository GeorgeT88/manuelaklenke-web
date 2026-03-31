import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhotoDesktop from '../photo/profilePhoto2.png';
import profilePhotoMobile from '../photo/profilePhoto3.png';

const TEXT_BG = '#5B4A3F';

function About() {
  const { t } = useTranslation('about');

  return (
    <Box
      component="section"
      id="about"
      sx={{
        minHeight: '100vh',
        overflow: { xs: 'visible', md: 'hidden' },
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Photo side */}
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { xs: 'auto', md: '100%' } }}>
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
          alt={t('imageAlt')}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '35vh',
            objectFit: 'contain',
            display: { xs: 'block', md: 'none' },
          }}
        />
        <Box
          component="img"
          src={profilePhotoDesktop}
          alt={t('imageAlt')}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: { xs: 'none', md: 'block' },
          }}
        />

      </Box>

      {/* Text side */}
      <Box
        sx={{
          flex: { md: 1 },
          backgroundColor: TEXT_BG,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          px: { xs: 3, md: 6, lg: 8 },
          py: { xs: 3, md: 0 },
          overflowY: { xs: 'auto', md: 'visible' },
          height: { xs: '50vh', md: 'auto' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: { xs: 8, md: 0 } }}>
          <Typography variant="h4" sx={{ color: '#ffffff', mb: 1 }}>
            {t('heading')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            {t('paragraph1')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            {t('paragraph2')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            {t('paragraph3')}
          </Typography>
        </Box>
      </Box>
      </Container>
    </Box>
  );
}

export default About;
