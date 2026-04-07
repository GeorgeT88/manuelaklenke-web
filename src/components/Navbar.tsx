import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
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
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.portfolio', path: '/portfolio' },
  { labelKey: 'nav.events', path: '/events' },
  { labelKey: 'nav.contact', path: '/contact' },
];

function Navbar() {
  const { t } = useTranslation('common');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
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
              const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
              return (
                <>
                  <li key={item.path}>
                    <Button
                      component={Link}
                      to={item.path}
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
                      {t(item.labelKey)}
                    </Button>
                  </li>
                  {item.path === '/about' && session && (() => {
                    const adminActive = location.pathname === '/admin/about';
                    return (
                      <li key="update-about">
                        <Button
                          component={Link}
                          to="/admin/about"
                          sx={{
                            color: adminActive ? 'primary.contrastText' : 'text.primary',
                            backgroundColor: adminActive ? 'primary.main' : 'transparent',
                            textTransform: 'none',
                            fontWeight: adminActive ? 600 : 500,
                            borderRadius: 6,
                            px: 1.5,
                            py: 0.8,
                            '&:hover': {
                              color: adminActive ? 'primary.contrastText' : 'secondary.main',
                              backgroundColor: adminActive ? 'primary.dark' : 'transparent',
                            },
                          }}
                        >
                          {t('nav.updateAbout')}
                        </Button>
                      </li>
                    );
                  })()}
                  {item.path === '/portfolio' && session && (() => {
                    const adminActive = location.pathname === '/admin/books';
                    return (
                      <li key="update-books">
                        <Button
                          component={Link}
                          to="/admin/books"
                          sx={{
                            color: adminActive ? 'primary.contrastText' : 'text.primary',
                            backgroundColor: adminActive ? 'primary.main' : 'transparent',
                            textTransform: 'none',
                            fontWeight: adminActive ? 600 : 500,
                            borderRadius: 6,
                            px: 1.5,
                            py: 0.8,
                            '&:hover': {
                              color: adminActive ? 'primary.contrastText' : 'secondary.main',
                              backgroundColor: adminActive ? 'primary.dark' : 'transparent',
                            },
                          }}
                        >
                          {t('nav.updateBooks')}
                        </Button>
                      </li>
                    );
                  })()}
                </>
              );
            })}
            {session && (
              <li>
                <Button
                  onClick={() => supabase.auth.signOut()}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 6,
                    px: 1.5,
                    py: 0.8,
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  Logout
                </Button>
              </li>
            )}
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
                  const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
                  return (
                    <>
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={item.path}
                          sx={{
                            color: isActive ? 'secondary.main' : 'text.primary',
                            fontWeight: isActive ? 700 : 400,
                          }}
                        >
                          <ListItemText primary={t(item.labelKey)} />
                        </ListItemButton>
                      </ListItem>
                      {item.path === '/about' && session && (
                        <ListItem key="update-about" disablePadding>
                          <ListItemButton
                            component={Link}
                            to="/admin/about"
                            sx={{ color: 'secondary.main', fontWeight: 700 }}
                          >
                            <ListItemText primary={t('nav.updateAbout')} />
                          </ListItemButton>
                        </ListItem>
                      )}
                      {item.path === '/portfolio' && session && (
                        <ListItem key="update-books" disablePadding>
                          <ListItemButton
                            component={Link}
                            to="/admin/books"
                            sx={{ color: 'secondary.main', fontWeight: 700 }}
                          >
                            <ListItemText primary={t('nav.updateBooks')} />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </>
                  );
                })}
                {session && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => supabase.auth.signOut()}>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
