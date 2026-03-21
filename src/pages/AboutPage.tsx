import { useEffect } from 'react';
import About from '../components/About';

function AboutPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return <About />;
}

export default AboutPage;
