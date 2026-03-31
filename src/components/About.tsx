import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto1 from '../photo/profilePhoto2.png';

const TEXT_BG = '#5B4A3F';

function About() {
  const { t } = useTranslation('about');

  return (
    <Box
      component="section"
      id="about"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Photo side */}
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          flex: { md: 1 },
          height: { xs: '50%', md: '100%' },
        }}
      >
        <Box
          component="img"
          src={profilePhoto1}
          alt={t('imageAlt')}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

      </Box>

      {/* Text side */}
      <Box
        sx={{
          flex: { md: 1 },
          backgroundColor: TEXT_BG,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 6, lg: 8 },
          py: { xs: 5, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
