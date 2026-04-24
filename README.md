# 🌐 manuelaklenke.com

Official website for **Manuela Klenke** — Human Translator working between Romanian, German, and English. Built with React, TypeScript and Vite, deployed on Vercel.

🔗 **Live site:** [https://manuelaklenke.com](https://manuelaklenke.com)

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **UI Library:** Material UI (MUI v7)
- **Routing:** React Router v7
- **Backend:** Supabase (PostgreSQL)
- **i18n:** i18next (EN / DE / RO)
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Footer, Contact, etc.)
├── pages/            # Page-level components (one per route)
├── hooks/            # Custom React hooks
├── i18n/             # Translations (EN, DE, RO)
├── lib/              # Supabase client
├── photo/            # Static image assets
└── theme.ts          # MUI theme configuration
```

---

## 🗺️ Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Me |
| `/portfolio` | Translated Books |
| `/events` | Events |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/imprint` | Imprint |
| `/admin` | Admin Dashboard |

---

## 🚀 Getting Started

**Install dependencies:**
```bash
npm install
```

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Lint:**
```bash
npm run lint
```

---

## 🔑 Environment Variables

Create a `.env` file at the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_FORM_ENDPOINT=your_form_endpoint
```

---

## ⚙️ CI/CD Pipeline

Every push to `main` triggers the following GitHub Actions workflow:

```
📦 Push to main
      ↓
🔨 Build — compiles TypeScript and Vite bundle
      ↓
⏳ Wait for Vercel — polls until production deployment is live
      ↓
  ┌────────────────────────────────────────────────────────────────────────┐
🎭 Playwright E2E   🔬 Selenium E2E   🌲 Cypress E2E   🛡️ OWASP ZAP
  └────────────────────────────────────────────────────────────────────────┘
      ↓
📊 Test reports published to GitHub Pages
```

The `wait-for-vercel` step polls the GitHub Deployments API every 15 s (up to ~10 min) and only releases the E2E jobs once the Vercel production deployment reaches `success` state. This ensures tests always run against the newly deployed code.

---

## 🧪 Testing

E2E tests are maintained in two separate QA repositories, both triggered automatically after every Vercel deployment:

| Suite | Repository | Report |
|---|---|---|
| Playwright | [GeorgeT88/manuelaklenke-playwright-e2e](https://github.com/GeorgeT88/manuelaklenke-playwright-e2e) | [GitHub Pages](https://georget88.github.io/manuelaklenke-playwright-e2e/) |
| Selenium | [GeorgeT88/manuelaklenke-selenium-e2e](https://github.com/GeorgeT88/manuelaklenke-selenium-e2e) | [GitHub Pages](https://georget88.github.io/manuelaklenke-selenium-e2e/) |
| Cypress | [GeorgeT88/manuelaklenke-cypress-e2e](https://github.com/GeorgeT88/manuelaklenke-cypress-e2e) | [GitHub Pages](https://georget88.github.io/manuelaklenke-cypress-e2e/) |
| OWASP ZAP | [GeorgeT88/manuelaklenke-owasp-zap-security](https://github.com/GeorgeT88/manuelaklenke-owasp-zap-security) | [GitHub Pages](https://georget88.github.io/manuelaklenke-owasp-zap-security/) |

Both suites run 35 tests and cover:

- Navigation (Navbar, Footer, all page links, 404)
- All public pages (Home, About, Portfolio, Events, Contact)
- Contact form fields, validation, and submit behaviour
- Accessibility (skip-to-content link, image alt text, single h1 per page)
- Language switcher (EN / DE / RO)
