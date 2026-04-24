import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://manuelaklenke.com';

const PAGE_KEY: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/portfolio': 'portfolio',
  '/events': 'events',
  '/contact': 'contact',
};

const BREADCRUMB_LABELS: Record<string, Record<string, string>> = {
  '/about':     { en: 'About', ro: 'Despre mine', de: 'Über mich' },
  '/portfolio': { en: 'Translated Books', ro: 'Cărți traduse', de: 'Übersetzte Bücher' },
  '/events':    { en: 'Events', ro: 'Evenimente', de: 'Veranstaltungen' },
  '/contact':   { en: 'Contact', ro: 'Contact', de: 'Kontakt' },
};

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const match = selector.match(/^meta\[([^=\]]+)="([^"]*)"\]$/);
    if (match) {
      const [, attrName, attrValue] = match;
      el.setAttribute(attrName, attrValue);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function useDocumentMeta() {
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${BASE_URL}${pathname === '/' ? '/' : pathname}`;
    const pageKey = PAGE_KEY[pathname] ?? 'home';
    const title = t(`meta.pages.${pageKey}.title`, t('meta.title'));
    const description = t(`meta.pages.${pageKey}.description`, t('meta.description'));

    // Title & lang
    document.title = title;
    document.documentElement.lang = i18n.language;

    // Basic meta
    setMeta('meta[name="description"]', 'content', description);

    // Canonical
    setLink('canonical', url);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);

    // Twitter
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    // Hreflang
    setLink('alternate', url, 'en');
    setLink('alternate', url, 'ro');
    setLink('alternate', url, 'de');
    setLink('alternate', url, 'x-default');

    // Breadcrumb JSON-LD
    const lang = i18n.language.startsWith('ro') ? 'ro' : i18n.language.startsWith('de') ? 'de' : 'en';
    const breadcrumbs: { name: string; item: string }[] = [
      { name: lang === 'ro' ? 'Acasă' : lang === 'de' ? 'Startseite' : 'Home', item: BASE_URL + '/' },
    ];
    if (pathname !== '/' && BREADCRUMB_LABELS[pathname]) {
      breadcrumbs.push({ name: BREADCRUMB_LABELS[pathname][lang], item: url });
    }
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    };
    let breadcrumbScript = document.getElementById('breadcrumb-jsonld') as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'breadcrumb-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
  }, [t, i18n.language, pathname]);
}

export default useDocumentMeta;
