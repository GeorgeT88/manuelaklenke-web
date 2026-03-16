import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ServiceCard from './ServiceCard';

const SERVICE_ICONS = ['⚖️', '🏥', '⚙️', '📚'];

function Services() {
  const { t } = useTranslation('services');
  const items = t('items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

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
          {t('heading')}
        </Typography>
        <Grid container spacing={4}>
          {items.map((service, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={SERVICE_ICONS[index]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
