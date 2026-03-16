import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TestimonialCard from './TestimonialCard';

function Testimonials() {
  const { t } = useTranslation('testimonials');
  const items = t('items', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
  }>;

  return (
    <Box
      component="section"
      id="testimonials"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
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
          {t('heading')}
        </Typography>
        <Grid container spacing={4}>
          {items.map((testimonial, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
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
