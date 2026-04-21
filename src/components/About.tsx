import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhotoDesktop from '../photo/profilePhoto2.webp';
import profilePhotoMobile from '../photo/profilePhoto3.webp';
import { useAboutContent } from '../hooks/useAboutContent';

const TEXT_BG = '#5B4A3F';

function About() {
  const { t } = useTranslation('about');
  const dbContent = useAboutContent();

  const heading = dbContent?.heading ?? t('heading');
  const paragraph1 = dbContent?.paragraph1 ?? t('paragraph1');
  const paragraph2 = dbContent?.paragraph2 ?? t('paragraph2');
  const paragraph3 = dbContent?.paragraph3 ?? t('paragraph3');
  const imageAlt = dbContent?.image_alt ?? t('imageAlt');

  return (
    <Box
      component="section"
      id="about"
      data-testid="about-section"
      sx={{
        minHeight: '100vh',
        overflow: { xs: 'visible', md: 'hidden' },
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
            alt={imageAlt}
            sx={{ width: '100%', height: 'auto', maxHeight: '35vh', objectFit: 'contain', display: { xs: 'block', md: 'none' } }}
          />
          <Box
            component="img"
            src={profilePhotoDesktop}
            alt={imageAlt}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: { xs: 'none', md: 'block' } }}
          />
        </Box>

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
            <Typography variant="h4" component="h1" sx={{ color: '#ffffff', mb: 1 }}>{heading}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph1}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph2}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff' }}>{paragraph3}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
