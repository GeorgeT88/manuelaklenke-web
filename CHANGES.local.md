# Local Change Log

---

## 2026-04-03

### Events – salutareBarbarilor (DE / RO / EN)
- Updated title in all 3 languages to reflect the anthology as new contemporary German poetry in Romanian
  - DE: "Eine neue Anthologie deutscher Gegenwartslyrik in rumänischer Sprache"
  - RO: "O nouă antologie de poezie germană contemporană în limba română"
  - EN: "A New Anthology of Contemporary German Poetry in Romanian"
- Updated description in all 3 languages: Manuela Klenke reframed as presenting translator, Blecher Institute removed, anthology title without comma
  - Commits: f698bed

### SEO – Canonical / www redirect
- Added 301 permanent redirect from www.manuelaklenke.com → manuelaklenke.com in vercel.json
- Fixes Google Search Console "Duplicate, Google chose different canonical than user" error
  - Commit: 83e37ef

### Google Analytics GA4
- Created GA4 web stream for manuelaklenke.com (Measurement ID: G-0H090P5S92)
- Added gtag.js snippet to index.html
  - Commit: 98ef9cc

### Sitemap
- Updated all lastmod dates from 2025-04-01 to 2026-04-03
  - Commit: 92b96ec

### Privacy Policy (EN / RO / DE)
- Added Google Analytics GA4 disclosure in all 3 languages
- Mentions: cookie usage, Google LLC processing, US data transfer, opt-out instructions
  - Commit: d9fb9b9

### Privacy Policy – Mobile scroll fix
- Page is now scrollable on mobile (xs–md); desktop remains locked to viewport
  - Commit: 88b7a67

---

## 2026-04-05

### Google Analytics GA4 – Tag verification
- Investigated "Data collection isn't active" warning in GA4 dashboard
- Confirmed tag is correctly implemented in index.html (Measurement ID G-0H090P5S92)
- Confirmed no CSP headers blocking the script
- Verified via DevTools Network tab: collect request to `region1.google-analytics.com/g/collect` returns **204 No Content** (success)
- Verified via Google Tag Assistant: tag found, Page View event firing correctly
- Internal Traffic filter is in **Testing** state (not blocking data)
- **Conclusion:** implementation is correct; "Data collection isn't active" warning and Realtime showing 0 users are a new property delay — GA4 takes 24–48 hours to start reflecting data for a newly created property

---

## 2026-04-06

### Admin – Supabase-powered About Me editing

#### Database
- Created free Supabase project (wlypvymrvgeteesbldho.supabase.co)
- Created `about_content` table with columns: lang, heading, paragraph1, paragraph2, paragraph3, image_alt, updated_at
- Seeded 3 rows (EN / DE / RO) with existing i18n content
- RLS policies: SELECT for anon + authenticated, UPDATE for authenticated
- Admin user created via Supabase Authentication

#### Frontend
- Installed `@supabase/supabase-js`; client hardcoded in `src/lib/supabase.ts` (anon key is public-facing)
- `src/hooks/useAboutContent.ts` — fetches About text from Supabase per language, falls back to i18n JSON if unavailable
- `src/components/About.tsx` — public page now reads from DB; always shows clean reading view
- `src/pages/AdminPage.tsx` — login-only page at `/admin`; redirects to home after login
- `src/pages/AdminAboutPage.tsx` — edit page at `/admin/about`; fields pre-filled from DB; per-field Save buttons turn green on success; redirects to `/admin` if not authenticated
- Navbar: **Update About Me** button (light brown, admin-only) appears next to About Me tab; **Logout** button appears at end of nav when logged in
  - Commits: 656d6d7, 6eef152, bd24e84, b731bf9, c72b1bc, dc3e347, 491445e, 1f286ab, 06bd417, 12cdd76, 1156813, d878947, 717b227, 2ce3782

#### Workflow
1. Navigate to `/admin` → log in
2. Click **Update About Me** in navbar → edit fields pre-filled with current text
3. Edit any paragraph/heading → click **Save** (turns green on success)
4. Switch site language (EN/DE/RO) to edit other language versions
5. Click **Logout** in navbar when done

---

## 2026-04-07

### Admin – Supabase-powered Translated Books management

#### Database
- Created `translated_books` table with columns: id, photo_url, link, order_index, created_at
- RLS policies: SELECT for anon + authenticated, all operations for authenticated
- Uploaded all 8 book cover images (`p1–p8.webp`) to Supabase Storage bucket `book-covers` (public)
- DB seeded with permanent public Supabase Storage URLs via `scripts/migrate-images.mjs`
- Local `src/photo/p1–p8.webp` files deleted from project

#### Frontend
- `src/pages/AdminBooksPage.tsx` — new CRUD page at `/admin/books`; protected (redirects to `/admin` if not authenticated); displays all books as a visual grid (same layout as public portfolio); each book has Edit (pencil) and Delete (trash) buttons; Add Book button at top opens a dialog with photo URL, link, and order fields; both Edit and Add dialogs show a live image preview as URL is typed; Delete requires confirmation
- `src/components/Services.tsx` — portfolio page now reads exclusively from Supabase DB (local hardcoded fallback removed)
- Navbar: **Update Translated Books** button appears next to Translated Books tab when logged in (desktop + mobile)
- Routes: `/admin/books` added to `App.tsx`
- Translations: `nav.updateBooks` added in EN, DE, and RO `common.json`

#### Migration script
- `scripts/migrate-images.mjs` — one-time script that creates the `book-covers` storage bucket, uploads all 8 local `.webp` files, and re-seeds the DB with the permanent Storage URLs
- Run with: `SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/migrate-images.mjs`

#### Workflow
1. Navigate to `/admin` → log in
2. Click **Update Translated Books** in navbar
3. All existing books are displayed as cover images in a 3-column grid
4. Click the **pencil icon** under a book to edit its photo URL, link, or display order
5. Click the **trash icon** to delete a book (confirmation required)
6. Click **Add Book** to add a new book (enter Supabase Storage or external image URL)
