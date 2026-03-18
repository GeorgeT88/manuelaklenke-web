import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import profilePhoto from '../photo/profilePhoto.png';

function Hero() {
  const { t } = useTranslation('hero');

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 0 },
          }}
        >
          {/* Text content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
              py: { xs: 4, md: 0 },
              pr: { md: 6 },
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: 'text.primary',
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                lineHeight: 1.15,
              }}
            >
              {t('title')}{' '}
              <br />
              {t('titleLine2')}{' '}
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {t('titleHighlight')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 480,
                mx: { xs: 'auto', md: 0 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
              }}
            >
              {t('tagline')}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="#contact"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.05rem',
                textTransform: 'none',
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              {t('cta')}
            </Button>
          </Box>

          {/* Photo */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={profilePhoto}
              alt={t('imageAlt')}
              sx={{
                width: { xs: '70%', sm: 320, md: 380, lg: 420 },
                maxHeight: { xs: 400, md: '70vh' },
                border: '6px solid',
                borderColor: 'background.paper',
                boxShadow: 3,
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: { xs: '40% 40% 40% 40%', md: '40% 40% 35% 35%' },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
