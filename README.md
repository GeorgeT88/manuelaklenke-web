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
🌐 Vercel deploys automatically
      ↓
🎭 E2E Tests triggered in GeorgeT88/playwright
      ↓
📊 Test report published to GitHub Pages
```

**E2E Test Report:** [https://georget88.github.io/playwright/](https://georget88.github.io/playwright/)
**QA Repository:** [https://github.com/GeorgeT88/playwright](https://github.com/GeorgeT88/playwright)

---

## 🧪 Testing

E2E tests are maintained in a separate QA repository — [GeorgeT88/playwright](https://github.com/GeorgeT88/playwright). Tests run automatically after every Vercel deployment and cover:

- Navigation
- All public pages
- Contact form validation
- Accessibility (skip link, image alt text, h1 structure)
- Language switcher (EN / DE / RO)
