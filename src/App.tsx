import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import useDocumentMeta from './hooks/useDocumentMeta';
import { useTranslation } from 'react-i18next';

function AppContent() {
  const { t } = useTranslation('common');
  useDocumentMeta();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="a"
        href="#main"
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
      <Box component="main" id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
