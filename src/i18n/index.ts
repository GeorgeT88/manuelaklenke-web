import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './locales/en/common.json';
import heroEn from './locales/en/hero.json';
import aboutEn from './locales/en/about.json';
import servicesEn from './locales/en/services.json';
import testimonialsEn from './locales/en/testimonials.json';
import contactEn from './locales/en/contact.json';

import commonRo from './locales/ro/common.json';
import heroRo from './locales/ro/hero.json';
import aboutRo from './locales/ro/about.json';
import servicesRo from './locales/ro/services.json';
import testimonialsRo from './locales/ro/testimonials.json';
import contactRo from './locales/ro/contact.json';

import commonDe from './locales/de/common.json';
import heroDe from './locales/de/hero.json';
import aboutDe from './locales/de/about.json';
import servicesDe from './locales/de/services.json';
import testimonialsDe from './locales/de/testimonials.json';
import contactDe from './locales/de/contact.json';

export const supportedLanguages = [
  { code: 'en', shortName: 'EN', name: 'English' },
  { code: 'ro', shortName: 'RO', name: 'Romana' },
  { code: 'de', shortName: 'DE', name: 'Deutsch' },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        hero: heroEn,
        about: aboutEn,
        services: servicesEn,
        testimonials: testimonialsEn,
        contact: contactEn,
      },
      ro: {
        common: commonRo,
        hero: heroRo,
        about: aboutRo,
        services: servicesRo,
        testimonials: testimonialsRo,
        contact: contactRo,
      },
      de: {
        common: commonDe,
        hero: heroDe,
        about: aboutDe,
        services: servicesDe,
        testimonials: testimonialsDe,
        contact: contactDe,
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

export default i18n;
