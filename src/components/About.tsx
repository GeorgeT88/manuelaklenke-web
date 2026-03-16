import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto1 from '../photo/profilePhoto1.png';

function About() {
  const { t } = useTranslation('about');

  return (
    <Box
      component="section"
      id="about"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              flex: { md: '0 0 auto' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={profilePhoto1}
              alt={t('imageAlt')}
              sx={{
                width: { xs: '70%', sm: 320, md: 380, lg: 420 },
                maxHeight: { xs: 400, md: '70vh' },
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: { xs: '40% 40% 40% 40%', md: '40% 40% 35% 35%' },
                border: '6px solid',
                borderColor: 'background.paper',
                boxShadow: 3,
              }}
            />
          </Box>

          {/* Text content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 3,
                color: 'primary.main',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {t('heading')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              {t('paragraph1')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              {t('paragraph2')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              {t('paragraph3')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              {t('paragraph4')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
