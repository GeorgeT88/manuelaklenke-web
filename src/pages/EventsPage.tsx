import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from '../lib/supabase';

interface EventLangContent {
  title: string;
  date: string;
  location: string;
  description: string;
  link_text: string;
}

interface EventRow {
  id: string;
  photo_url: string;
  link_url: string | null;
  photo_credit: string | null;
  photo_credit_url: string | null;
  photo_credit_icon: string;
  order_index: number;
  content: { en: EventLangContent; de: EventLangContent; ro: EventLangContent };
}

function EventsPage() {
  const { t, i18n } = useTranslation('events');
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  const lang = (i18n.language ?? 'en').split('-')[0] as 'en' | 'de' | 'ro';

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('order_index')
      .then(({ data }) => {
        if (data) setEvents(data);
        setLoading(false);
      });
  }, []);

  // Rebuild JSON-LD whenever events load
  useEffect(() => {
    if (events.length === 0) return;
    const id = 'events-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': events.map(ev => ({
        '@type': 'Event',
        name: ev.content?.en?.title ?? '',
        description: ev.content?.en?.description ?? '',
        url: ev.link_url ?? undefined,
        performer: { '@type': 'Person', name: 'Manuela Klenke' },
      })),
    });
    return () => { document.getElementById(id)?.remove(); };
  }, [events]);

  function getContent(event: EventRow): EventLangContent {
    return event.content?.[lang] ?? event.content?.en ?? { title: '', date: '', location: '', description: '', link_text: '' };
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: 'primary.main', px: { xs: 3, md: 6 }, pt: { xs: 4, md: 5 }, pb: 8 }}>
          <Typography variant="h2" component="h1" sx={{ mb: 6, color: '#ffffff', fontWeight: 700 }}>
            {t('heading')}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#ffffff' }} />
            </Box>
          ) : (
            events.map((event) => {
              const c = getContent(event);
              return (
                <Box key={event.id} sx={{ mb: 6, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, p: { xs: 3, md: 4 } }}>
                  {/* Photo */}
                  <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
                    <Box component="img" src={event.photo_url} alt={c.title}
                      sx={{ width: '100%', borderRadius: 2, display: 'block' }} />
                    {event.photo_credit && (
                      event.photo_credit_url ? (
                        <Link href={event.photo_credit_url} target="_blank" rel="noopener noreferrer" underline="none"
                          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } }}>
                          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>{event.photo_credit_icon}</Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>by {event.photo_credit}</Typography>
                        </Link>
                      ) : (
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1, px: 0.75, py: 0.25, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.35)' }}>
                          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>{event.photo_credit_icon}</Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.95)' }}>by {event.photo_credit}</Typography>
                        </Box>
                      )
                    )}
                  </Box>

                  {/* Text */}
                  <Typography variant="h5" sx={{ mb: 1, color: '#ffffff', fontWeight: 600 }}>
                    {c.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
                    {c.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.65)' }}>
                    {c.location}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
                    {c.description}
                  </Typography>
                  {event.link_url && (
                    <Link href={event.link_url} target="_blank" rel="noopener noreferrer"
                      sx={{ color: 'secondary.light', fontWeight: 500, textDecorationColor: 'rgba(196,149,106,0.5)' }}>
                      {c.link_text} →
                    </Link>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default EventsPage;
