/**
 * One-time migration: uploads the 8 local book cover images to Supabase Storage
 * and updates the translated_books table with the new permanent public URLs.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_service_key node scripts/migrate-images.mjs
 *
 * Get your service role key from:
 *   Supabase dashboard → Project Settings → API → service_role (secret)
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
  console.error('Run:  SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/migrate-images.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const BUCKET = 'book-covers';

// Same order as SEED_BOOKS in AdminBooksPage.tsx
const BOOKS = [
  { file: 'p1.webp', link: 'https://edituratact.ro/carte/durs-grunbein-un-dispozitiv-pentru-captat-viitorul-poezii-alese-1988-2022/', order_index: 0 },
  { file: 'p3.webp', link: 'https://mikrotext.de/book/lavinia-braniste-du-findest-mich-wenn-du-willst-roman/', order_index: 1 },
  { file: 'p2.webp', link: 'https://edituratact.ro/carte/dincer-gucyeter-o-poveste-despre-germania-noastra/', order_index: 2 },
  { file: 'p5.webp', link: 'https://parasitenpresse.wordpress.com/2024/06/28/livia-stefan-re-volver/', order_index: 3 },
  { file: 'p6.webp', link: 'https://www.maxblecher.ro/salutare_barbarilor.php', order_index: 4 },
  { file: 'p8.webp', link: 'https://mikrotext.de/book/lavinia-braniste-sonia-meldet-sich-roman/', order_index: 5 },
  { file: 'p4.webp', link: 'https://www.danube-books.eu/florin-iaru-die-gruenen-brueste', order_index: 6 },
  { file: 'p7.webp', link: 'https://mikrotext.de/book/lavinia-braniste-null-komma-irgendwas-roman-aus-dem-rumanischen/', order_index: 7 },
];

async function main() {
  // 1. Create the storage bucket (public, so images are accessible without auth)
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (bucketError && !bucketError.message.toLowerCase().includes('already exists')) {
    console.error('Failed to create bucket:', bucketError.message);
    process.exit(1);
  }
  console.log(`Bucket "${BUCKET}" ready.\n`);

  // 2. Upload each image and collect its public URL
  const rows = [];
  for (const book of BOOKS) {
    const filePath = join(__dirname, '../src/photo', book.file);
    const fileData = readFileSync(filePath);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(book.file, fileData, { contentType: 'image/webp', upsert: true });

    if (uploadError) {
      console.error(`  ✗ ${book.file}: ${uploadError.message}`);
      process.exit(1);
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(book.file);
    console.log(`  ✓ ${book.file} → ${publicUrl}`);

    rows.push({ photo_url: publicUrl, link: book.link, order_index: book.order_index });
  }

  // 3. Replace all rows in translated_books with the new Storage URLs
  console.log('\nUpdating database...');
  const { error: deleteError } = await supabase
    .from('translated_books')
    .delete()
    .gte('order_index', 0); // delete all rows

  if (deleteError) {
    console.error('Failed to clear table:', deleteError.message);
    process.exit(1);
  }

  const { error: insertError } = await supabase.from('translated_books').insert(rows);
  if (insertError) {
    console.error('Failed to insert rows:', insertError.message);
    process.exit(1);
  }

  console.log('\nDone! All 8 images are now in Supabase Storage and the DB is updated.');
}

main().catch(console.error);
