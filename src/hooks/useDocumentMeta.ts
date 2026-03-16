import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useDocumentMeta() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    // Update document title
    document.title = t('meta.title');

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('meta.description');
      document.head.appendChild(meta);
    }

    // Update html lang attribute
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);
}

export default useDocumentMeta;
