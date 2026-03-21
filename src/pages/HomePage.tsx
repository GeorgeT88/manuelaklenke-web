import { useEffect } from 'react';
import Hero from '../components/Hero';

function HomePage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return <Hero />;
}

export default HomePage;
