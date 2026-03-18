import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

const NAV_ITEMS = [
  { labelKey: 'nav.home', href: '#home' },
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.portfolio', href: '#services' },
  { labelKey: 'nav.contact', href: '#contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

function Navbar() {
  const { t } = useTranslation('common');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AppBar
      component="nav"
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo />

          {/* Desktop nav */}
          <Box
            component="ul"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 1,
              listStyle: 'none',
              m: 0,
              p: 0,
              alignItems: 'center',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <Button
                    component="a"
                    href={item.href}
                    sx={{
                      color: isActive ? 'primary.contrastText' : 'text.primary',
                      backgroundColor: isActive ? 'primary.main' : 'transparent',
                      textTransform: 'none',
                      fontWeight: isActive ? 600 : 500,
                      borderRadius: 6,
                      px: 2.5,
                      py: 0.8,
                      '&:hover': {
                        color: isActive ? 'primary.contrastText' : 'secondary.main',
                        backgroundColor: isActive ? 'primary.dark' : 'transparent',
                      },
                    }}
                  >
                    {t(item.labelKey)}
                  </Button>
                </li>
              );
            })}
            <li>
              <LanguageSelector />
            </li>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', gap: 1 }}>
            <LanguageSelector />
            <IconButton
              aria-label={t('aria.openMenu')}
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => setDrawerOpen(false)}
            >
              <List>
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <ListItem key={item.href} disablePadding>
                      <ListItemButton
                        component="a"
                        href={item.href}
                        sx={{
                          color: isActive ? 'secondary.main' : 'text.primary',
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        <ListItemText primary={t(item.labelKey)} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
