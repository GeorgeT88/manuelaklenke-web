import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

interface Book {
  id: string;
  photo_url: string;
  link: string | null;
  order_index: number;
}

function Services() {
  const { t } = useTranslation('services');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    supabase
      .from('translated_books')
      .select('id, photo_url, link, order_index')
      .order('order_index')
      .then(({ data }) => {
        if (data) setBooks(data as Book[]);
      });
  }, []);

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 3, md: 5 },
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: { xs: 3, md: 5 }, fontWeight: 700, color: 'primary.main' }}
        >
          {t('translatedBooks')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
          }}
        >
          {books.map((book, i) => {
            const img = (
              <Box
                key={book.id}
                component="img"
                src={book.photo_url}
                alt={`Book cover ${i + 1}`}
                sx={{
                  width: '100%',
                  aspectRatio: '2/3',
                  display: 'block',
                  objectFit: 'cover',
                  border: '4px solid #5C3D2E',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            );
            return book.link ? (
              <a key={book.id} href={book.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                {img}
              </a>
            ) : img;
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default Services;
