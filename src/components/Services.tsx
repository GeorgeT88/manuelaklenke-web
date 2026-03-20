import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import p1 from '../photo/p1.png';
import p2 from '../photo/p2.png';
import p3 from '../photo/p3.png';
import p4 from '../photo/p4.png';
import p5 from '../photo/p5.png';
import p6 from '../photo/p6.png';
import p7 from '../photo/p7.png';
import p8 from '../photo/p8.png';

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7, p8];
const LINKS: (string | null)[] = [null, null, null, 'https://www.danube-books.eu/florin-iaru-die-gruenen-brueste', null, null, null, null];

function Services() {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
          }}
        >
          {PHOTOS.map((src, i) => {
            const img = (
              <Box
                key={i}
                component="img"
                src={src}
                alt={`Portfolio photo ${i + 1}`}
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
            return LINKS[i] ? (
              <a key={i} href={LINKS[i]!} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
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
