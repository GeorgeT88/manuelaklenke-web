import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface AdminMobileNavButtonProps {
  labelKey: string;
  adminPath: string;
}

function AdminMobileNavButton({ labelKey, adminPath }: AdminMobileNavButtonProps) {
  const { t } = useTranslation('common');

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={adminPath}
        sx={{ color: 'secondary.main', fontWeight: 700 }}
      >
        <ListItemText primary={t(labelKey)} />
      </ListItemButton>
    </ListItem>
  );
}

export default AdminMobileNavButton;
