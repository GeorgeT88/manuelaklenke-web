import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Logo() {
  const { t } = useTranslation('common');
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
      }}
    >
      {/* Icon box with name inside */}
      <Box
        sx={{
          borderRadius: 1.5,
          border: '2px solid',
          borderColor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 1,
          py: 0.5,
          lineHeight: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '0.75rem',
            color: 'primary.main',
            lineHeight: 1.2,
            letterSpacing: 1,
          }}
        >
          {t('logo.name')}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '0.65rem',
            color: 'text.secondary',
            lineHeight: 1.2,
            letterSpacing: 2,
          }}
        >
          {t('logo.surname')}
        </Typography>
      </Box>
    </Box>
  );
}

export default Logo;
