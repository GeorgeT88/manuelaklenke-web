import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export interface AboutContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image_alt: string;
}

export function useAboutContent() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    const lang = (i18n.language ?? 'en').split('-')[0];
    const validLang = ['en', 'de', 'ro'].includes(lang) ? lang : 'en';

    supabase
      .from('about_content')
      .select('heading, paragraph1, paragraph2, paragraph3, image_alt')
      .eq('lang', validLang)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setContent(data as AboutContent);
      });
  }, [i18n.language]);

  return content;
}
