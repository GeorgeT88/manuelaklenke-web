import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TestimonialCard from './TestimonialCard';

const TESTIMONIALS_DATA = [
  {
    quote:
      'Ana translated our entire suite of legal contracts from German to English with impeccable accuracy. Her attention to legal terminology saved us countless hours of review.',
    author: 'Michael Weber, Weber & Partners Law Firm',
  },
  {
    quote:
      'We needed urgent medical document translations for a clinical trial. Ana delivered flawless work under a tight deadline — her medical expertise is truly exceptional.',
    author: 'Dr. Elena Popescu, Bucharest University Hospital',
  },
  {
    quote:
      'Ana brought my novel to life in English while preserving every nuance of the original Romanian text. Her literary sensitivity is rare and deeply appreciated.',
    author: 'Maria Ionescu, Author',
  },
];

function Testimonials() {
  return (
    <Box
      component="section"
      id="testimonials"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'primary.main',
            fontSize: { xs: '1.75rem', md: '2.25rem' },
          }}
        >
          Testimonials
        </Typography>
        <Grid container spacing={4}>
          {TESTIMONIALS_DATA.map((testimonial) => (
            <Grid key={testimonial.author} size={{ xs: 12, md: 4 }}>
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Testimonials;
