import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ServiceCard from './ServiceCard';

const SERVICES_DATA = [
  {
    title: 'Legal Translation',
    description:
      'Certified translations of contracts, court documents, legal correspondence, and regulatory filings with precise legal terminology.',
    icon: '⚖️',
  },
  {
    title: 'Medical Translation',
    description:
      'Accurate translation of clinical reports, patient documentation, pharmaceutical texts, and medical research papers.',
    icon: '🏥',
  },
  {
    title: 'Technical Translation',
    description:
      'Clear and precise translations of technical manuals, engineering specifications, software documentation, and patents.',
    icon: '⚙️',
  },
  {
    title: 'Literary Translation',
    description:
      'Thoughtful translations of novels, poetry, essays, and creative works that preserve the author\'s voice and style.',
    icon: '📚',
  },
];

function Services() {
  return (
    <Box
      component="section"
      id="services"
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
          Services
        </Typography>
        <Grid container spacing={4}>
          {SERVICES_DATA.map((service) => (
            <Grid key={service.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
