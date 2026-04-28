import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhotoDesktop from '../photo/profilePhoto2.webp';
import profilePhotoMobile from '../photo/profilePhoto3.webp';
import { useAboutContent } from '../hooks/useAboutContent';

const TEXT_BG = '#5B4A3F';

function About() {

  const dbContent = useAboutContent();

  const { heading, paragraph1, paragraph2, paragraph3, image_alt: imageAlt } = dbContent;

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
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <img
              src={profilePhotoMobile}
              alt={imageAlt}
              width={550}
              height={642}
              style={{ width: '100%', height: 'auto', maxHeight: '35vh', objectFit: 'contain', display: 'block' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', height: '100%' }}>
            <img
              src={profilePhotoDesktop}
              alt={imageAlt}
              width={910}
              height={1062}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </Box>
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
