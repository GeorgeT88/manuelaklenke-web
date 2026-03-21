import { useEffect } from 'react';
import Home from '../components/Home';

function HomePage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return <Home />;
}

export default HomePage;
