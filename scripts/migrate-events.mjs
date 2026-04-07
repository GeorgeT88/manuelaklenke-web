/**
 * One-time migration: uploads the 7 local event photos to Supabase Storage
 * and seeds the events table with all content in EN / DE / RO.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/migrate-events.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://wlypvymrvgeteesbldho.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is required.');
  console.error('Run:  SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/migrate-events.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const BUCKET = 'event-photos';

const EVENTS = [
  {
    file: 'p14.webp',
    link_url: 'https://www.convietuiri.ro/stiri/comunitatea-germana/stire-germ-radio-tg-mures-3-8867.html',
    photo_credit: 'Marius Şumlea',
    photo_credit_url: null,
    photo_credit_icon: '📷',
    order_index: 0,
    content: {
      en: {
        title: 'Public Reading Evening and Discussion with German Writer Dinçer Güçyeter',
        date: '6 November 2025',
        location: 'Cinema Arta | Cluj-Napoca, Str. Universității nr. 3',
        description: 'On 6 November 2025, an evening of reading and dialogue took place with German writer Dinçer Güçyeter, dedicated to his award-winning novel "O poveste despre Germania noastră" – "Unser Deutschlandmärchen", alongside translator Manuela Klenke, director Lina Vdovîi, and sociologist Sorin Gog.',
        link_text: 'More about the event',
      },
      de: {
        title: 'Öffentlicher Leseabend und Gespräch mit dem deutschen Schriftsteller Dinçer Güçyeter',
        date: '6. November 2025',
        location: 'Cinema Arta | Cluj-Napoca, Str. Universității nr. 3',
        description: 'Am 6. November 2025 fand ein Lese- und Gesprächsabend mit dem deutschen Schriftsteller Dinçer Güçyeter statt, gewidmet seinem vielfach ausgezeichneten Roman "Unser Deutschlandmärchen" – "O poveste despre Germania noastră", gemeinsam mit der Übersetzerin Manuela Klenke, der Regisseurin Lina Vdovîi und dem Soziologen Sorin Gog.',
        link_text: 'Mehr zur Veranstaltung',
      },
      ro: {
        title: 'Seară de lectură publică și discuție cu scriitorul german Dinçer Güçyeter',
        date: '6 noiembrie 2025',
        location: 'Cinema Arta | Cluj-Napoca, Str. Universității nr. 3',
        description: 'În data de 6 noiembrie 2025 a avut loc o seară de lectură și dialog cu scriitorul german Dinçer Güçyeter dedicată romanului său multipremiat "O poveste despre Germania noastră" - "Unser Deutschlandmärchen", alături de traducătoarea Manuela Klenke, regizoarea Lina Vdovîi și sociologul Sorin Gog.',
        link_text: 'Mai multe despre eveniment',
      },
    },
  },
  {
    file: 'p15.webp',
    link_url: 'https://www.muzeulliteraturiiiasi.ro/cela/cela-masterclass-with-manuela-klenke-germany-and-corina-oproae-spain-migration-and-double-identity-translators-and-writers-as-double-agents/',
    photo_credit: null,
    photo_credit_url: null,
    photo_credit_icon: '📷',
    order_index: 1,
    content: {
      en: {
        title: 'CELA Masterclass with Manuela Klenke (Germany) and Corina Oproae (Spain)',
        date: '10 September 2025 · 5:00 PM',
        location: 'Online | Zoom',
        description: 'CELA masterclass with Manuela Klenke (Germany) and Corina Oproae (Spain): Migration and double identity – translators and writers as "double-agents".',
        link_text: 'More about the event',
      },
      de: {
        title: 'CELA-Masterclass mit Manuela Klenke (Deutschland) und Corina Oproae (Spanien)',
        date: '10. September 2025 · 17:00 Uhr',
        location: 'Online | Zoom',
        description: 'CELA-Masterclass mit Manuela Klenke (Deutschland) und Corina Oproae (Spanien): Migration und doppelte Identität – Übersetzer und Schriftsteller als "Doppelagenten".',
        link_text: 'Mehr zur Veranstaltung',
      },
      ro: {
        title: 'CELA Masterclass cu Manuela Klenke (Germania) și Corina Oproae (Spania)',
        date: '10 septembrie 2025 · ora 17:00',
        location: 'Online | Zoom',
        description: 'Masterclass CELA cu Manuela Klenke (Germania) și Corina Oproae (Spania): Migrație și identitate dublă – traducători și scriitori ca "agenți dubli".',
        link_text: 'Mai multe despre eveniment',
      },
    },
  },
  {
    file: 'p10.webp',
    link_url: 'https://www.leipziginfo.de/aktuelles/artikel/worte-bewegen-welten-leipziger-buchmesse-2025',
    photo_credit: 'Traduki',
    photo_credit_url: 'https://www.instagram.com/p/DHuEs2BsUD9/?img_index=1&igsh=MXRicmR5OGp0anJjbQ%3D%3D',
    photo_credit_icon: '📷',
    order_index: 2,
    content: {
      en: {
        title: 'Worte bewegen Welten – Leipziger Buchmesse 2025',
        date: '27 – 30 March 2025 · 10:00 am – 6:00 pm',
        location: 'Messe-Allee 1, 04356 Leipzig, Germany',
        description: 'One of Europe\'s most important spring events for the book and media industry, held in Leipzig from March 27–30, 2025. The fair brought together readers, authors, publishers, and media from around the world. Manuela Klenke and Alexandru Bulucz presented their translations from Romanian: Re.volver by Livia Ştefan (parasitenpresse) and Metallische Igel by Moni Stănilă (Edition Fototapeta).',
        link_text: 'More about the fair',
      },
      de: {
        title: 'Worte bewegen Welten – Leipziger Buchmesse 2025',
        date: '27. – 30. März 2025 · 10:00 – 18:00 Uhr',
        location: 'Messe-Allee 1, 04356 Leipzig, Deutschland',
        description: 'Eine der bedeutendsten Frühjahrsmessen für die Buch- und Medienbranche in Europa, die vom 27.–30. März 2025 in Leipzig stattfand. Die Messe brachte Leserinnen und Leser, Autorinnen und Autoren, Verlage und Medien aus aller Welt zusammen. Manuela Klenke und Alexandru Bulucz stellten ihre Übersetzungen aus dem Rumänischen vor: Re.volver von Livia Ştefan (parasitenpresse) und Metallische Igel von Moni Stănilă (Edition Fototapeta).',
        link_text: 'Mehr zur Messe',
      },
      ro: {
        title: 'Worte bewegen Welten – Leipziger Buchmesse 2025',
        date: '27 – 30 martie 2025 · 10:00 – 18:00',
        location: 'Messe-Allee 1, 04356 Leipzig, Germania',
        description: 'Unul dintre cele mai importante evenimente de primăvară din Europa pentru industria cărții și a mass-media, desfășurat la Leipzig în perioada 27–30 martie 2025. Târgul a reunit cititori, autori, editori și reprezentanți media din întreaga lume. Manuela Klenke și Alexandru Bulucz și-au prezentat traducerile din română: Re.volver de Livia Ştefan (parasitenpresse) și Metallische Igel de Moni Stănilă (Edition Fototapeta).',
        link_text: 'Mai multe despre târg',
      },
    },
  },
  {
    file: 'p11.webp',
    link_url: 'https://lcb.de/programm/die-guten-tage-6/',
    photo_credit: 'Kristin Bethge',
    photo_credit_url: 'https://www.instagram.com/p/C_6NMFONdsT/?img_index=3&igsh=cWkwNjI3NXdlaThy',
    photo_credit_icon: '📷',
    order_index: 3,
    content: {
      en: {
        title: 'Die guten Tage VI',
        date: '13 September 2024 · 7:30 PM',
        location: 'Literarisches Colloquium Berlin, Am Sandwerder 5, 14109 Berlin',
        description: 'An evening celebrating Southeast European poetry, jointly organised by TRADUKI and the Literarisches Colloquium Berlin. Manuela Klenke translated and read from "re.volver" by Romanian poet Livia Ștefan — a powerful collection exploring trauma, memory, and personal transformation.',
        link_text: 'More about the event',
      },
      de: {
        title: 'Die guten Tage VI',
        date: '13. September 2024 · 19:30 Uhr',
        location: 'Literarisches Colloquium Berlin, Am Sandwerder 5, 14109 Berlin',
        description: 'Ein Abend für südosteuropäische Lyrik, gemeinsam veranstaltet von TRADUKI und dem Literarischen Colloquium Berlin. Manuela Klenke übersetzte und las aus "re.volver" der rumänischen Dichterin Livia Ștefan — eine eindringliche Gedichtsammlung über Trauma, Erinnerung und persönliche Transformation.',
        link_text: 'Mehr zur Veranstaltung',
      },
      ro: {
        title: 'Die guten Tage VI',
        date: '13 septembrie 2024 · ora 19:30',
        location: 'Literarisches Colloquium Berlin, Am Sandwerder 5, 14109 Berlin',
        description: 'O seară dedicată poeziei din Europa de Sud-Est, organizată în comun de TRADUKI și Literarisches Colloquium Berlin. Manuela Klenke a tradus și a lecturat din "re.volver" a poetei române Livia Ștefan — o colecție despre traumă, memorie și transformare personală.',
        link_text: 'Mai multe despre eveniment',
      },
    },
  },
  {
    file: 'p9.webp',
    link_url: 'https://www.signaturen-magazin.de/simona-popescu--fuenf-gedichte.html',
    photo_credit: 'stabios.litbuerown',
    photo_credit_url: 'https://www.instagram.com/stabios.litbuerown?igsh=bm91NXpjbHQ5YnR2',
    photo_credit_icon: '📷',
    order_index: 4,
    content: {
      en: {
        title: 'Naturalezas Literarias',
        date: '27 May 2023 · 7:30 PM',
        location: 'Ledenhof | Osnabrück',
        description: 'On the occasion of St. George\'s Day, students of Romance Studies from Osnabrück organised, in collaboration with the Literaturbüro Westniedersachsen and the DE-IT and DE-FR societies, a literary event called "Naturalezas literarias – Romanische Sprachen der Natur", at which Manuela Klenke, together with jazz musician Shabnam Parvaresh, presented a lyrical-musical performance as the Romanian contribution, based on poems by Simona Popescu.',
        link_text: 'More about the performance',
      },
      de: {
        title: 'Naturalezas Literarias',
        date: '27. Mai 2023 · 19:30 Uhr',
        location: 'Ledenhof | Osnabrück',
        description: 'Zum Tag des Hl. Georg organisierten Studierende der Romanistik aus Osnabrück in Zusammenarbeit mit dem Literaturbüro Westniedersachsen sowie der Gesellschaften DE-IT und DE-FR eine Literaturveranstaltung namens „Naturalezas literarias – Romanische Sprachen der Natur", bei der Manuela Klenke zusammen mit der Jazz-Musikerin Shabnam Parvaresh eine lyrisch-musikalische Performance als rumänischen Beitrag vorstellte, dessen Textvorlage aus Gedichten von Simona Popescu bestand.',
        link_text: 'Mehr zu der Performance',
      },
      ro: {
        title: 'Naturalezas Literarias',
        date: '27 mai 2023 · ora 19:30',
        location: 'Ledenhof | Osnabrück',
        description: 'Cu ocazia Zilei Sfântului Gheorghe, studenți de la studii romanice din Osnabrück au organizat, în colaborare cu Literaturbüro Westniedersachsen și societățile DE-IT și DE-FR, un eveniment literar numit „Naturalezas literarias – Romanische Sprachen der Natur", la care Manuela Klenke, împreună cu muziciana de jazz Shabnam Parvaresh, a prezentat o performanță lirico-muzicală ca contribuție română, al cărei text se baza pe poezii de Simona Popescu.',
        link_text: 'Mai multe despre performance',
      },
    },
  },
  {
    file: 'p12.webp',
    link_url: 'https://www.toledo-programm.de/projekte/5/viceversa/5438/viceversa-deutsch-rumaenische-werkstatt',
    photo_credit: 'Marius Şumlea',
    photo_credit_url: null,
    photo_credit_icon: '📷',
    order_index: 5,
    content: {
      en: {
        title: 'ViceVersa 2023: German-Romanian Translation Workshop',
        date: '21–26 May 2023',
        location: 'Deutsches Kulturzentrum Klausenburg | Universității 7-9',
        description: 'Together with Jan Schönherr, Manuela Klenke co-led the second German-Romanian ViceVersa Translation Workshop, organised in cooperation with Traduki, the Goethe-Institut Bucharest, the Toledo Programme, and the German Cultural Centre Cluj-Napoca. The workshop brought together translators from both countries to collaborate on literary texts, exploring the nuances of translating between German and Romanian.',
        link_text: 'More about the workshop',
      },
      de: {
        title: 'ViceVersa 2023: Deutsch-Rumänische Übersetzerwerksatt',
        date: '21.–26. Mai 2023',
        location: 'Deutsches Kulturzentrum Klausenburg | Universității 7-9',
        description: 'Zusammen mit Jan Schönherr leitete Manuela Klenke die zweite Deutsch-Rumänische ViceVersa-Übersetzungswerkstatt, die in Kooperation mit Traduki, dem Goethe-Institut Bukarest, dem Toledo-Programm und dem Deutschen Kulturzentrum Cluj-Napoca geplant wurde. Die Werkstatt brachte Übersetzerinnen und Übersetzer aus beiden Ländern zusammen, um gemeinsam an literarischen Texten zu arbeiten und die Feinheiten der Übersetzung zwischen Deutsch und Rumänisch zu erkunden.',
        link_text: 'Mehr zur Werkstatt',
      },
      ro: {
        title: 'ViceVersa 2023: Atelier de Traducere Germano-Român',
        date: '21–26 mai 2023',
        location: 'Centrul Cultural German Cluj-Napoca | Universității 7-9',
        description: 'Împreună cu Jan Schönherr, Manuela Klenke a co-condus cel de-al doilea Atelier de Traducere ViceVersa germano-român, organizat în colaborare cu Traduki, Institutul Goethe București, Programul Toledo și Centrul Cultural German Cluj-Napoca. Atelierul a reunit traducători din ambele țări pentru a colabora la texte literare, explorând nuanțele traducerii între germană și română.',
        link_text: 'Mai multe despre atelier',
      },
    },
  },
  {
    file: 'p13.webp',
    link_url: 'https://www.poetic.ro/25-12-2022-2022-cand-poezia-romaneasca-redevine-contemporana-cu-ea-insasi/',
    photo_credit: 'Ana Toma',
    photo_credit_url: null,
    photo_credit_icon: '🎨',
    order_index: 6,
    content: {
      en: {
        title: 'A New Anthology of Contemporary German Poetry in Romanian',
        date: '13 November 2022',
        location: 'Hidden – The Social Space, Strada Doamna Chiajna 26, 031234 București',
        description: 'Together with Joachim Umlauf and Claudiu Komartin, Manuela Klenke presents the anthology of contemporary German poetry "Salutare, barbarilor!" which she recently translated.',
        link_text: 'More about the anthology',
      },
      de: {
        title: 'Eine neue Anthologie deutscher Gegenwartslyrik in rumänischer Sprache',
        date: '13. November 2022',
        location: 'Hidden – The Social Space, Strada Doamna Chiajna 26, 031234 București',
        description: 'Zusammen mit Joachim Umlauf und Claudiu Komartin stellt Manuela Klenke die von ihr zuletzt übersetzte Anthologie deutscher Gegenwartslyrik "Salutare, barbarilor!" vor.',
        link_text: 'Mehr zur Anthologie',
      },
      ro: {
        title: 'O nouă antologie de poezie germană contemporană în limba română',
        date: '13 noiembrie 2022',
        location: 'Hidden – The Social Space, Strada Doamna Chiajna 26, 031234 București',
        description: 'Împreună cu Joachim Umlauf și Claudiu Komartin, Manuela Klenke prezintă antologia de poezie germană contemporană "Salutare, barbarilor!", tradusă recent de ea.',
        link_text: 'Mai multe despre antologie',
      },
    },
  },
];

async function main() {
  // 1. Create bucket
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (bucketError && !bucketError.message.toLowerCase().includes('already exists')) {
    console.error('Failed to create bucket:', bucketError.message);
    process.exit(1);
  }
  console.log(`Bucket "${BUCKET}" ready.\n`);

  // 2. Upload each photo
  const rows = [];
  for (const event of EVENTS) {
    const filePath = join(__dirname, '../src/photo', event.file);
    const fileData = readFileSync(filePath);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(event.file, fileData, { contentType: 'image/webp', upsert: true });

    if (uploadError) {
      console.error(`  ✗ ${event.file}: ${uploadError.message}`);
      process.exit(1);
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(event.file);
    console.log(`  ✓ ${event.file} → ${publicUrl}`);

    rows.push({
      photo_url: publicUrl,
      link_url: event.link_url,
      photo_credit: event.photo_credit,
      photo_credit_url: event.photo_credit_url,
      photo_credit_icon: event.photo_credit_icon,
      order_index: event.order_index,
      content: event.content,
    });
  }

  // 3. Clear and re-seed events table
  console.log('\nUpdating database...');
  await supabase.from('events').delete().gte('order_index', 0);
  const { error: insertError } = await supabase.from('events').insert(rows);
  if (insertError) {
    console.error('Failed to insert rows:', insertError.message);
    process.exit(1);
  }

  console.log('\nDone! All 7 event photos uploaded and DB seeded.');
}

main().catch(console.error);
