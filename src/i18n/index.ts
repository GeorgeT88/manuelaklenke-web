import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './locales/en/common.json';
import heroEn from './locales/en/hero.json';
import aboutEn from './locales/en/about.json';
import servicesEn from './locales/en/services.json';
import testimonialsEn from './locales/en/testimonials.json';
import contactEn from './locales/en/contact.json';
import legalEn from './locales/en/legal.json';
import eventsEn from './locales/en/events.json';

import commonRo from './locales/ro/common.json';
import heroRo from './locales/ro/hero.json';
import aboutRo from './locales/ro/about.json';
import servicesRo from './locales/ro/services.json';
import testimonialsRo from './locales/ro/testimonials.json';
import contactRo from './locales/ro/contact.json';
import legalRo from './locales/ro/legal.json';
import eventsRo from './locales/ro/events.json';

import commonDe from './locales/de/common.json';
import heroDe from './locales/de/hero.json';
import aboutDe from './locales/de/about.json';
import servicesDe from './locales/de/services.json';
import testimonialsDe from './locales/de/testimonials.json';
import contactDe from './locales/de/contact.json';
import legalDe from './locales/de/legal.json';
import eventsDe from './locales/de/events.json';

export const supportedLanguages = [
  { code: 'en', shortName: 'EN', name: 'English' },
  { code: 'ro', shortName: 'RO', name: 'Romana' },
  { code: 'de', shortName: 'DE', name: 'Deutsch' },
] as const;

const GEO_CACHE_KEY = 'i18nGeoCache';
export const USER_SELECTED_KEY = 'i18nUserSelected';
const GEO_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const COUNTRY_TO_LANG: Record<string, string> = { RO: 'ro', DE: 'de' };

function getCachedGeoLang(): string | null {
  try {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (!cached) return null;
    const { lang, expires } = JSON.parse(cached) as { lang: string; expires: number };
    if (Date.now() < expires) return lang;
  } catch { /* ignore */ }
  return null;
}

async function fetchAndCacheGeoLang(): Promise<void> {
  try {
    // Same-origin endpoint backed by a Vercel serverless function that reads
    // the `x-vercel-ip-country` header. Avoids the CORS / rate-limit issues
    // we used to hit calling https://ipapi.co/json/ directly from the browser.
    const res = await fetch('/api/geo');
    if (!res.ok) return;
    const data = await res.json() as { country_code?: string | null };
    const lang = COUNTRY_TO_LANG[data.country_code ?? ''] ?? 'en';
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ lang, expires: Date.now() + GEO_CACHE_TTL }));
    await i18n.changeLanguage(lang);
  } catch { /* silently fail, keep current language */ }
}

// Determine initial language: cached geo result takes priority unless user manually selected
const userSelected = localStorage.getItem(USER_SELECTED_KEY) === 'true';
const cachedGeoLang = userSelected ? null : getCachedGeoLang();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: cachedGeoLang ?? undefined,
    resources: {
      en: {
        common: commonEn,
        hero: heroEn,
        about: aboutEn,
        services: servicesEn,
        testimonials: testimonialsEn,
        contact: contactEn,
        legal: legalEn,
        events: eventsEn,
      },
      ro: {
        common: commonRo,
        hero: heroRo,
        about: aboutRo,
        services: servicesRo,
        testimonials: testimonialsRo,
        contact: contactRo,
        legal: legalRo,
        events: eventsRo,
      },
      de: {
        common: commonDe,
        hero: heroDe,
        about: aboutDe,
        services: servicesDe,
        testimonials: testimonialsDe,
        contact: contactDe,
        legal: legalDe,
        events: eventsDe,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// If no cached geo result, fetch it now (first visit or expired cache)
if (!userSelected && !cachedGeoLang) {
  fetchAndCacheGeoLang();
}

export default i18n;
