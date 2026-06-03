import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

interface AdminNavButtonProps {
  labelKey: string;
  adminPath: string;
}

function AdminNavButton({ labelKey, adminPath }: AdminNavButtonProps) {
  const { t } = useTranslation('common');
  const location = useLocation();
  const isActive = location.pathname === adminPath;

  return (
    <Button
      component={Link}
      to={adminPath}
      sx={{
        color: isActive ? 'primary.contrastText' : 'text.primary',
        backgroundColor: isActive ? 'primary.main' : 'transparent',
        textTransform: 'none',
        fontWeight: isActive ? 600 : 500,
        borderRadius: 6,
        px: 1.5,
        py: 0.8,
        '&:hover': {
          color: isActive ? 'primary.contrastText' : 'secondary.main',
          backgroundColor: isActive ? 'primary.dark' : 'transparent',
        },
      }}
    >
      {t(labelKey)}
    </Button>
  );
}

export default AdminNavButton;
