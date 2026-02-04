import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            mb: 3,
            color: 'text.primary',
            lineHeight: 1.8,
          }}
        >
          &ldquo;{quote}&rdquo;
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'secondary.dark',
          }}
        >
          — {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
