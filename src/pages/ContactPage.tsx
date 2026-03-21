import { useEffect } from 'react';
import Contact from '../components/Contact';

function ContactPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return <Contact />;
}

export default ContactPage;
