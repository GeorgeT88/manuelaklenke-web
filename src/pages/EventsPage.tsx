import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function EventsPage() {
  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
        <Box sx={{ flex: 1, backgroundColor: 'primary.main' }} />
      </Container>
    </Box>
  );
}

export default EventsPage;
