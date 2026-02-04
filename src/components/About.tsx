import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import profilePhoto1 from '../photo/profilePhoto1.png';

function About() {
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
              alt="Ana Test reading a book in her study"
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
              About Me
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              With over 20 years of professional translation experience, I have
              dedicated my career to bridging language barriers between German,
              Romanian, and English. My journey began in Bucharest, where my
              passion for languages led me to pursue formal training in
              translation and linguistics.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              Over the past two decades, I have worked with clients across
              diverse industries — from legal firms requiring precise contract
              translations to medical institutions needing accurate clinical
              documentation. My expertise spans legal, medical, technical, and
              literary translation, ensuring that every project receives the
              specialized attention it deserves.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              I believe that great translation goes beyond words — it captures
              tone, intent, and cultural nuance. Whether you need a certified
              legal document, a technical manual, or a literary work brought to
              life in another language, I bring the same level of care and
              precision to every project.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary' }}>
              My approach is rooted in deep cultural understanding and
              meticulous attention to detail. Every document I translate
              undergoes thorough quality assurance — from initial analysis and
              terminology research to final proofreading — ensuring consistency,
              accuracy, and natural fluency in the target language.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
