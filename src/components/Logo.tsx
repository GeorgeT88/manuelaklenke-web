import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Logo() {
  return (
    <Box
      component="a"
      href="#"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          border: '2px solid',
          borderColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8H4.69c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            fill="#5B4A3F"
          />
        </svg>
      </Box>
      {/* Text */}
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '0.95rem',
            color: 'primary.main',
            lineHeight: 1.2,
            letterSpacing: 1,
          }}
        >
          ANA
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem',
            color: 'text.secondary',
            lineHeight: 1.2,
            letterSpacing: 2,
          }}
        >
          TEST
        </Typography>
      </Box>
    </Box>
  );
}

export default Logo;
