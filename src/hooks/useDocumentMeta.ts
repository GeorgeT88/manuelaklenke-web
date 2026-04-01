import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://manuelaklenke.com';

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('="');
    el.setAttribute(attrName, attrValue.replace('"', ''));
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
    const title = t('meta.title');
    const description = t('meta.description');

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
  }, [t, i18n.language, pathname]);
}

export default useDocumentMeta;
