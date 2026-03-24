import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('legal');

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        py: 0.75,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 1100,
      }}
    >
      <Typography
        component={Link}
        to="/privacy"
        variant="caption"
        sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
      >
        {t('footer.privacy')}
      </Typography>
      <Typography
        component={Link}
        to="/imprint"
        variant="caption"
        sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
      >
        {t('footer.imprint')}
      </Typography>
    </Box>
  );
}

export default Footer;
