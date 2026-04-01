import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dincerImg from '../photo/p14.png';
import dieGuteTageImg2 from '../photo/p11.png';
import buchmesseImg from '../photo/p10.png';
import naturalezasImg from '../photo/p9.png';
import viceVersaImg from '../photo/p12.png';
import salutareImg from '../photo/p13.png';

function EventsPage() {
  const { t } = useTranslation('events');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: 'primary.main',
            px: { xs: 3, md: 6 },
            pt: { xs: 4, md: 5 },
            pb: 8,
          }}
        >
          <Typography variant="h2" component="h1" sx={{ mb: 6, color: '#ffffff', fontWeight: 700 }}>
            {t('heading')}
          </Typography>

          {/* Dinçer Güçyeter */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={dincerImg}
                alt={t('dincerGucyeter.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)' }}>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>📷</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by Marius Şumlea
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('dincerGucyeter.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('dincerGucyeter.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('dincerGucyeter.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('dincerGucyeter.description')}
            </Typography>
            <Link
              href="https://www.convietuiri.ro/stiri/comunitatea-germana/stire-germ-radio-tg-mures-3-8867.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('dincerGucyeter.link')} →
            </Link>
          </Box>

          {/* Leipziger Buchmesse */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={buchmesseImg}
                alt={t('leipzigerBuchmesse.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Link
                href="https://www.instagram.com/p/DHuEs2BsUD9/?img_index=1&igsh=MXRicmR5OGp0anJjbQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } }}
              >
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>📷</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by Traduki
                </Typography>
              </Link>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('leipzigerBuchmesse.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('leipzigerBuchmesse.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('leipzigerBuchmesse.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('leipzigerBuchmesse.description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Link
                href="https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
              >
                {t('leipzigerBuchmesse.link1')} →
              </Link>
            </Box>
          </Box>

          {/* Die guten Tage VI */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={dieGuteTageImg2}
                alt={t('dieGuteTage.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Link
                href="https://www.instagram.com/p/C_6NMFONdsT/?img_index=3&igsh=cWkwNjI3NXdlaThy"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } }}
              >
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>📷</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by Kristin Bethge
                </Typography>
              </Link>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('dieGuteTage.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('dieGuteTage.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('dieGuteTage.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('dieGuteTage.description')}
            </Typography>
            <Link
              href="https://lcb.de/programm/die-guten-tage-6/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('dieGuteTage.link')} →
            </Link>
          </Box>

          {/* Naturalezas Literarias */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={naturalezasImg}
                alt={t('naturalezasLiterarias.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Link
                href="https://www.instagram.com/stabios.litbuerown?igsh=bm91NXpjbHQ5YnR2"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } }}
              >
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>📷</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by stabios.litbuerown
                </Typography>
              </Link>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('naturalezasLiterarias.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('naturalezasLiterarias.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('naturalezasLiterarias.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('naturalezasLiterarias.description')}
            </Typography>
            <Link
              href="https://www.signaturen-magazin.de/simona-popescu--fuenf-gedichte.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('naturalezasLiterarias.link')} →
            </Link>
          </Box>

          {/* ViceVersa 2023 */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={viceVersaImg}
                alt={t('viceVersa2023.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)' }}>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>📷</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by Marius Şumlea
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('viceVersa2023.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('viceVersa2023.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('viceVersa2023.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('viceVersa2023.description')}
            </Typography>
            <Link
              href="https://www.toledo-programm.de/projekte/5/viceversa/5438/viceversa-deutsch-rumaenische-werkstatt"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('viceVersa2023.link')} →
            </Link>
          </Box>

          {/* Salutare Barbarilor */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={salutareImg}
                alt={t('salutareBarbarilor.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)' }}>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>🎨</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>
                  by Ana Toma
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('salutareBarbarilor.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('salutareBarbarilor.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('salutareBarbarilor.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('salutareBarbarilor.description')}
            </Typography>
            <Link
              href="https://www.poetic.ro/25-12-2022-2022-cand-poezia-romaneasca-redevine-contemporana-cu-ea-insasi/#:~:text=Ai%20de%20r%C4%83sfoit%20m%C4%83car%20%E2%80%9DSalutare%20barbarilor!%E2%80%9D%2C%20antologie,cultura%20poetic%C4%83%20din%20ultima%20jum%C4%83tate%20de%20secol"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('salutareBarbarilor.link')} →
            </Link>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default EventsPage;
