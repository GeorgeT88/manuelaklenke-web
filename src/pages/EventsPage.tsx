import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dincerImg from '../photo/p14.webp';
import celaImg from '../photo/p15.webp';
import dieGuteTageImg2 from '../photo/p11.webp';
import buchmesseImg from '../photo/p10.webp';
import naturalezasImg from '../photo/p9.webp';
import viceVersaImg from '../photo/p12.webp';
import salutareImg from '../photo/p13.webp';

const EVENTS_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      name: 'Seară de lectură publică și discuție cu scriitorul german Dinçer Güçyeter',
      startDate: '2025-11-06',
      location: { '@type': 'Place', name: 'Cinema Arta', address: 'Str. Universității nr. 3, Cluj-Napoca, Romania' },
      description: 'An evening of reading and dialogue with German writer Dinçer Güçyeter, dedicated to his award-winning novel "Unser Deutschlandmärchen", alongside translator Manuela Klenke, director Lina Vdovîi, and sociologist Sorin Gog.',
      url: 'https://www.convietuiri.ro/stiri/comunitatea-germana/stire-germ-radio-tg-mures-3-8867.html',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'CELA Masterclass: Migration and Double Identity – Translators and Writers as Double-Agents',
      startDate: '2025-09-10T17:00',
      location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
      description: 'CELA masterclass with Manuela Klenke (Germany) and Corina Oproae (Spain): Migration and double identity – translators and writers as "double-agents".',
      url: 'https://www.muzeulliteraturiiiasi.ro/cela/cela-masterclass-with-manuela-klenke-germany-and-corina-oproae-spain-migration-and-double-identity-translators-and-writers-as-double-agents/',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'Worte bewegen Welten – Leipziger Buchmesse 2025',
      startDate: '2025-03-27',
      endDate: '2025-03-30',
      location: { '@type': 'Place', name: 'Leipziger Messe', address: 'Messe-Allee 1, 04356 Leipzig, Germany' },
      description: 'Manuela Klenke and Alexandru Bulucz presented their translations from Romanian at the Leipzig Book Fair 2025.',
      url: 'https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'Die guten Tage VI',
      startDate: '2024-09-13T19:30',
      location: { '@type': 'Place', name: 'Literarisches Colloquium Berlin', address: 'Am Sandwerder 5, 14109 Berlin, Germany' },
      description: 'An evening celebrating Southeast European poetry. Manuela Klenke translated and read from "re.volver" by Romanian poet Livia Ștefan.',
      url: 'https://lcb.de/programm/die-guten-tage-6/',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'Naturalezas Literarias',
      startDate: '2023-05-27T19:30',
      location: { '@type': 'Place', name: 'Ledenhof', address: 'Osnabrück, Germany' },
      description: 'Manuela Klenke presented a lyrical-musical performance based on poems by Simona Popescu, together with jazz musician Shabnam Parvaresh.',
      url: 'https://www.signaturen-magazin.de/simona-popescu--fuenf-gedichte.html',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'ViceVersa 2023: German-Romanian Translation Workshop',
      startDate: '2023-05-21',
      endDate: '2023-05-26',
      location: { '@type': 'Place', name: 'Deutsches Kulturzentrum Cluj-Napoca', address: 'Universității 7-9, Cluj-Napoca, Romania' },
      description: 'Manuela Klenke co-led the second German-Romanian ViceVersa Translation Workshop.',
      url: 'https://www.toledo-programm.de/projekte/5/viceversa/5438/viceversa-deutsch-rumaenische-werkstatt',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
    {
      '@type': 'Event',
      name: 'German Poetry Anthology: "Salutare, barbarilor!"',
      startDate: '2022-11-13',
      location: { '@type': 'Place', name: 'Hidden – The Social Space', address: 'Strada Doamna Chiajna 26, 031234 București, Romania' },
      description: 'Joachim Umlauf and Manuela Klenke launch the German poetry anthology "Salutare, barbarilor!" together with Claudiu Komartin.',
      url: 'https://www.poetic.ro/25-12-2022-2022-cand-poezia-romaneasca-redevine-contemporana-cu-ea-insasi/',
      performer: { '@type': 'Person', name: 'Manuela Klenke' },
    },
  ],
};

function EventsPage() {
  const { t } = useTranslation('events');

  useEffect(() => {
    const id = 'events-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(EVENTS_JSONLD);
    return () => { script?.remove(); };
  }, []);

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

          {/* CELA Masterclass */}
          <Box sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
            <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
              <Box
                component="img"
                src={celaImg}
                alt={t('celaMasterclass.title')}
                sx={{ width: '100%', borderRadius: 2, display: 'block' }}
              />
            </Box>
            <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
              {t('celaMasterclass.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
              {t('celaMasterclass.date')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
              {t('celaMasterclass.location')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
              {t('celaMasterclass.description')}
            </Typography>
            <Link
              href="https://www.muzeulliteraturiiiasi.ro/cela/cela-masterclass-with-manuela-klenke-germany-and-corina-oproae-spain-migration-and-double-identity-translators-and-writers-as-double-agents/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}
            >
              {t('celaMasterclass.link')} →
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
