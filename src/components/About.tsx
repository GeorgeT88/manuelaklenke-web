import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto1 from '../photo/profilePhoto1.png';

const TEXT_BG = '#5B4A3F';

function About() {
  const { t } = useTranslation('about');
  const { t: tCommon } = useTranslation('common');

  return (
    <Box
      component="section"
      id="about"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Photo side */}
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'relative',
          flex: { md: 1 },
          minHeight: { xs: '50vh', md: '100vh' },
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

        {/* Name overlay — mobile only */}
        <Typography
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#ffffff',
            fontWeight: 500,
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
          }}
        >
          {tCommon('logo.name')} {tCommon('logo.surname')}
        </Typography>
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
        <Box>
          <Typography variant="body1" sx={{ mb: 2.5, color: '#ffffff', lineHeight: 1.8 }}>
            {t('paragraph1')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2.5, color: '#ffffff', lineHeight: 1.8 }}>
            {t('paragraph2')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2.5, color: '#ffffff', lineHeight: 1.8 }}>
            {t('paragraph3')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff', lineHeight: 1.8 }}>
            {t('paragraph4')}
          </Typography>
        </Box>
      </Box>
      </Container>
    </Box>
  );
}

export default About;
