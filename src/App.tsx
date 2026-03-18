import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import useDocumentMeta from './hooks/useDocumentMeta';

function App() {
  const { t } = useTranslation('common');
  useDocumentMeta();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="a"
        href="#about"
        sx={{
          position: 'absolute',
          left: '-9999px',
          '&:focus': {
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 2000,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            px: 2,
            py: 1,
            borderRadius: 1,
            textDecoration: 'none',
          },
        }}
      >
        {t('aria.skipToContent')}
      </Box>
      <Navbar />
      <Toolbar />
      <Box component="main">
        <Hero />
        <About />
        <Services />
        <Contact />
      </Box>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
