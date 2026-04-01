import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NotFoundPage() {
  const { t } = useTranslation('common');

  useEffect(() => {
    document.title = t('notFound.title');
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute('content', 'index, follow');
    };
  }, [t]);

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: 'background.default' }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', px: 3 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '6rem', md: '8rem' }, fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
            404
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.primary', fontWeight: 600 }}>
            {t('notFound.heading')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            {t('notFound.description')}
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {t('notFound.backHome')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
