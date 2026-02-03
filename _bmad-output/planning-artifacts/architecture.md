---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-02-03'
inputDocuments: ['prd.md', 'product-brief-my-bmad-project-2026-02-03.md']
workflowType: 'architecture'
project_name: 'my-bmad-project'
user_name: 'George'
date: '2026-02-03'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
20 FRs across 7 capability areas, all focused on content presentation and a single contact form. No data persistence, no user accounts, no complex interactions. The site is a one-way information delivery system with a single input point (contact form).

**Non-Functional Requirements:**
11 NFRs focused on performance (Lighthouse 80+, 3s load), accessibility (WCAG 2.1 AA), integration reliability (form service with email fallback), and browser compatibility (Chrome, Firefox, Safari, Edge at 3 breakpoints).

**Scale & Complexity:**

- Primary domain: Frontend web (single-page application)
- Complexity level: Low
- Estimated architectural components: 7-9 React components

### Technical Constraints & Dependencies

- React as framework (decided in PRD)
- Material UI as component library (decided in PRD)
- Third-party form service (Formspree or EmailJS) as sole external dependency
- Static hosting (Vercel or Netlify free tier)
- No backend, no database, no server-side processing
- Professional photo as static asset requiring optimization (NFR3)

### Cross-Cutting Concerns Identified

- **Responsive design** -- All components must adapt across mobile, tablet, and desktop breakpoints
- **Accessibility** -- Semantic HTML, alt text, keyboard navigation, and color contrast apply to all components
- **Theme consistency** -- Warm, approachable MUI theme must be applied uniformly across all sections

## Starter Template Evaluation

### Primary Technology Domain

Frontend web (single-page application) -- React with Material UI, static deployment.

### Starter Options Considered

1. **Create React App** -- Officially deprecated as of February 2025. No longer maintained by the React team. Not recommended for new projects.
2. **Vite + React** -- The current recommended React starter. Uses native ES Modules for near-instant dev server startup, esbuild for fast bundling, and excellent MUI compatibility.

### Selected Starter: Vite + React + TypeScript

**Rationale:** Vite is the React team's recommended build tool for new projects. It provides fast development experience, modern defaults, and a rich plugin ecosystem. TypeScript adds type safety for more maintainable code.

**Initialization Command:**

```bash
npm create vite@latest my-bmad-project -- --template react-ts
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript with React (react-ts template)
- Node.js 20.19+ or 22.12+ required

**Build Tooling:**
- Vite 8.x as dev server and build tool
- esbuild for dependency pre-bundling
- Native ES Modules in development
- Rollup-based production builds

**Development Experience:**
- Near-instant dev server startup (~300ms)
- Fast Hot Module Replacement (HMR)
- Dev server at http://localhost:5173
- TypeScript type checking

**Code Organization:**
- `src/` directory for application code
- `public/` directory for static assets (Ana's photo)
- `index.html` as entry point
- `vite.config.ts` for build configuration

**Note:** Project initialization using this command should be the first implementation story. MUI installation (`@mui/material @emotion/react @emotion/styled`) will follow as a separate setup step.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Frontend component architecture and structure
- MUI theming approach
- Form service integration pattern

**Important Decisions (Shape Architecture):**
- Hosting platform selection (Vercel or Netlify)
- Image optimization strategy

**Deferred Decisions (Post-MVP):**
- Multilingual support architecture (Phase 2)
- SEO optimization strategy (Phase 2)
- CMS integration (Phase 3)

### Data Architecture

Not applicable. This is a static portfolio site with no data persistence, no database, and no server-side processing. All content is hardcoded in React components.

### Authentication & Security

Not applicable. No user accounts, no authentication, no authorization. The only security consideration is the form service API key, stored in an environment variable.

### API & Communication Patterns

**Form Service Integration:**
- Decision: Third-party form service (Formspree or EmailJS) -- final choice deferred to implementation
- Pattern: Direct client-side HTTP POST from the contact form component
- Fallback: Display Ana's email address if form service is unavailable (NFR9)
- Configuration: Form service endpoint/API key stored in `.env` file
- No other API communication required

### Frontend Architecture

**State Management:**
- Decision: React built-in `useState` only
- Rationale: The only stateful UI element is the contact form (field values, submission status, validation errors). No global state, no shared state between sections. No state management library needed.

**Component Architecture:**
- Decision: Flat component structure under `src/components/`
- Top-level section components: `Navbar`, `Hero`, `About`, `Services`, `Testimonials`, `Contact`
- Sub-components: `ServiceCard` (used by Services), `TestimonialCard` (used by Testimonials)
- Theme configuration in `src/theme.ts`
- Estimated total: 8 components + 1 theme file

**Routing:**
- Decision: No routing library
- Rationale: Single-page site with anchor navigation. CSS `scroll-behavior: smooth` handles smooth scrolling. No React Router needed.

**MUI Theming:**
- Decision: Custom `ThemeProvider` wrapping the app
- Theme file: `src/theme.ts` with warm, approachable color palette
- Consistent typography, spacing, and color tokens across all components
- MUI's built-in responsive breakpoints: xs (<600px), sm (600-900px), md (900-1200px), lg (1200px+)

**Performance & Bundle Optimization:**
- Decision: Rely on Vite defaults for code splitting and tree-shaking
- Image optimization: Ana's professional photo in WebP format with fallback, stored in `public/`
- No lazy loading needed -- single page with minimal content

### Infrastructure & Deployment

**Hosting:**
- Decision: Vercel or Netlify (free tier) -- final choice deferred to deployment time
- Rationale: Both platforms offer identical capabilities for static sites: auto-deploy from Git, SSL, CDN, preview deployments. No reason to lock in early.

**CI/CD:**
- Decision: Platform-provided auto-deploy
- Pattern: Push to main branch triggers automatic build and deployment
- No custom CI/CD pipeline needed

**Environment Configuration:**
- Decision: Single `.env` file for form service configuration
- Variables: Form service endpoint URL and/or API key
- `.env.example` committed to repo as reference; `.env` in `.gitignore`

**Monitoring & Logging:**
- Decision: Not needed for MVP
- Rationale: Static site with no backend. Form service provider handles delivery monitoring.

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (Vite + React + TypeScript)
2. MUI installation and theme configuration
3. Component scaffolding (Navbar, Hero, About, Services, Testimonials, Contact)
4. Form service integration
5. Responsive design refinement
6. Accessibility audit
7. Image optimization and static assets
8. Deployment configuration

**Cross-Component Dependencies:**
- All components depend on the MUI theme (`src/theme.ts`)
- Navbar depends on section component IDs for anchor links
- Contact component depends on form service configuration (`.env`)
- No other inter-component dependencies

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
4 areas where AI agents could make different choices: code naming, project structure, error handling, and loading states. Database, API, and event system patterns are not applicable to this static portfolio site.

### Naming Patterns

**Database & API Naming:**
Not applicable -- no database, no custom API.

**Code Naming Conventions:**

| Element | Convention | Example |
|---|---|---|
| Component files | PascalCase `.tsx` | `Navbar.tsx`, `ServiceCard.tsx` |
| Non-component files | camelCase `.ts` | `theme.ts`, `formService.ts` |
| Functions & variables | camelCase | `handleSubmit`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `FORM_ENDPOINT`, `SERVICES_DATA` |
| Component names | PascalCase | `<ServiceCard />`, `<Testimonials />` |
| Props interfaces | PascalCase + `Props` suffix | `ServiceCardProps`, `TestimonialCardProps` |

### Structure Patterns

**Project Organization:**
- All section components in `src/components/` (flat -- no nested folders)
- One component per file
- Tests co-located next to components: `Navbar.tsx` + `Navbar.test.tsx`
- Theme configuration in `src/theme.ts`
- Static assets (Ana's photo) in `public/`
- Form service utility in `src/` (if needed)

**File Structure Rules:**
- No `index.tsx` barrel files -- import directly from component files
- No separate CSS files -- use MUI `sx` prop and `styled()` exclusively
- `.env.example` committed; `.env` in `.gitignore`

### Format Patterns

**Data Formats:**
Not applicable -- no data exchange beyond the contact form POST.

### Communication Patterns

**State Management:**
- React `useState` only -- no Context, no Redux, no external state library
- Immutable state updates (spread operator)
- State kept local to the component that owns it

### Process Patterns

**Error Handling:**
- Contact form: `try/catch` around form submission
- Error display: MUI `Alert` component with `severity="error"`
- Success display: MUI `Alert` component with `severity="success"`
- Fallback: Display Ana's email address if form service is unavailable (NFR9)
- No global error boundary needed

**Loading States:**
- Contact form submit button: disabled + MUI `CircularProgress` spinner during submission
- Single boolean state: `isSubmitting`
- No skeleton loaders or global loading indicators needed

### Enforcement Guidelines

**All AI Agents MUST:**

- Use MUI `sx` prop or `styled()` for all styling -- no inline styles, no CSS modules, no Tailwind
- Use proper TypeScript types -- no `any`
- Follow the naming conventions table above without exception
- Keep components in the flat `src/components/` structure
- Import directly from component files, not through barrel exports

**Anti-Patterns (Avoid):**

```typescript
// BAD: separate CSS file
import './Navbar.css';

// GOOD: MUI sx prop
<AppBar sx={{ backgroundColor: 'primary.main' }}>

// BAD: any type
const handleSubmit = (data: any) => { ... }

// GOOD: typed interface
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
const handleSubmit = (data: ContactFormData) => { ... }

// BAD: barrel export
// src/components/index.ts
export { Navbar } from './Navbar';

// GOOD: direct import
import { Navbar } from './components/Navbar';
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
my-bmad-project/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .env.example
├── .env
├── .gitignore
├── public/
│   └── ana-photo.webp
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── theme.ts
    ├── vite-env.d.ts
    └── components/
        ├── Navbar.tsx
        ├── Navbar.test.tsx
        ├── Hero.tsx
        ├── Hero.test.tsx
        ├── About.tsx
        ├── About.test.tsx
        ├── Services.tsx
        ├── Services.test.tsx
        ├── ServiceCard.tsx
        ├── ServiceCard.test.tsx
        ├── Testimonials.tsx
        ├── Testimonials.test.tsx
        ├── TestimonialCard.tsx
        ├── TestimonialCard.test.tsx
        ├── Contact.tsx
        └── Contact.test.tsx
```

### Architectural Boundaries

**API Boundaries:**
No custom API. The only external communication is the Contact component making an HTTP POST to the form service (Formspree or EmailJS) using the endpoint configured in `.env`.

**Component Boundaries:**
- All section components (`Navbar`, `Hero`, `About`, `Services`, `Testimonials`, `Contact`) are independent and self-contained
- `App.tsx` is the sole composition point -- it renders all sections in order
- No data passes between sibling components
- Only `Navbar` references other sections via anchor IDs (e.g., `#about`, `#services`, `#testimonials`, `#contact`)

**Data Boundaries:**
No data persistence. All content is hardcoded in components. Contact form state is local to `Contact.tsx`.

### Requirements to Structure Mapping

**Feature Mapping:**

| FR Category | Component(s) | File(s) |
|---|---|---|
| Site Navigation (FR1-FR2) | Navbar | `Navbar.tsx` |
| Brand Presentation (FR3-FR6) | Hero | `Hero.tsx` |
| About (FR7-FR8) | About | `About.tsx` |
| Service Discovery (FR9-FR11) | Services, ServiceCard | `Services.tsx`, `ServiceCard.tsx` |
| Social Proof (FR12-FR13) | Testimonials, TestimonialCard | `Testimonials.tsx`, `TestimonialCard.tsx` |
| Contact (FR14-FR17) | Contact | `Contact.tsx` |
| Responsive (FR18-FR20) | All components | MUI `sx` responsive props |

**Cross-Cutting Concerns:**

| Concern | Location |
|---|---|
| Theme (warm palette, typography) | `src/theme.ts` via `ThemeProvider` in `App.tsx` |
| Accessibility (alt text, semantic HTML, keyboard nav) | Each component individually |
| Responsive breakpoints | MUI `sx` prop in each component |

### Integration Points

**External Integrations:**
- Contact form → Formspree/EmailJS (HTTP POST, configured via `.env`)
- Fallback: Ana's email displayed directly if form service unavailable

**Data Flow:**
Top-down only. `App.tsx` → section components. No inter-component communication. Contact form state is entirely local.

### Development Workflow Integration

**Development Server:**
- `npm run dev` → Vite dev server at `localhost:5173` with HMR

**Build Process:**
- `npm run build` → TypeScript compilation + Rollup bundling → output to `dist/`

**Deployment:**
- `dist/` directory deployed to Vercel or Netlify
- Auto-deploy triggered by Git push to main branch

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:**
All technology choices are compatible. Vite 8.x + React + TypeScript + MUI (@mui/material + @emotion/react + @emotion/styled) is a well-established, conflict-free stack. Formspree/EmailJS integrates via simple HTTP POST with no server-side dependencies.

**Pattern Consistency:**
Naming conventions (PascalCase components, camelCase functions/variables) follow standard React/TypeScript community conventions. MUI `sx` styling is consistent with the theme-first approach. All patterns align with the chosen technology stack.

**Structure Alignment:**
The flat `src/components/` structure matches the project's low complexity (8 components). Component boundaries are clear -- each section is self-contained with no inter-component dependencies beyond anchor IDs.

### Requirements Coverage Validation

**Functional Requirements Coverage:**
All 20 FRs (FR1-FR20) are mapped to specific components in the project structure. Every FR category has a dedicated component or is handled as a cross-cutting concern (responsive design via MUI breakpoints).

**Non-Functional Requirements Coverage:**
- NFR1-NFR3 (Performance): Vite's optimized bundling + WebP image format
- NFR4-NFR7 (Accessibility): Semantic HTML + MUI accessibility features in each component
- NFR8-NFR9 (Integration): Form service with email fallback pattern defined
- NFR10-NFR11 (Browser/Responsive): MUI Grid + breakpoint system

### Implementation Readiness Validation

**Decision Completeness:**
All critical decisions are documented with technology versions. No ambiguous choices remain -- implementation can proceed without further architectural decisions.

**Structure Completeness:**
Complete file-level project structure defined. Every component, test file, configuration file, and asset is accounted for.

**Pattern Completeness:**
Naming conventions, styling approach, error handling, loading states, and anti-patterns are all specified with concrete code examples.

### Gap Analysis Results

**Critical Gaps:** None identified.
**Important Gaps:** None identified.
**Nice-to-Have Gaps:**
- Testing framework (Vitest recommended as Vite-native) -- can be decided during implementation setup story.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low)
- [x] Technical constraints identified (no backend, no database)
- [x] Cross-cutting concerns mapped (responsive, accessibility, theme)

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Vite + React + TypeScript + MUI)
- [x] Integration patterns defined (form service HTTP POST)
- [x] Performance considerations addressed (Vite bundling, WebP)

**Implementation Patterns**

- [x] Naming conventions established (PascalCase, camelCase, UPPER_SNAKE_CASE)
- [x] Structure patterns defined (flat components, co-located tests)
- [x] Styling patterns specified (MUI `sx` and `styled()` only)
- [x] Process patterns documented (error handling, loading states)

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High -- simple, well-understood architecture with mature technologies and minimal integration points.

**Key Strengths:**
- Minimal complexity -- only 8 components with no inter-component state
- Mature, stable technology stack with extensive community support
- Clear separation of concerns -- each section is an independent component
- Single external dependency (form service) with a defined fallback

**Areas for Future Enhancement (Post-MVP):**
- Multilingual support (i18n framework selection)
- SEO optimization (meta tags, structured data)
- Testing framework formalization
- CMS integration for content management

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Use MUI `sx` prop for all styling -- no exceptions
- Refer to this document for all architectural questions

**First Implementation Priority:**
```bash
npm create vite@latest my-bmad-project -- --template react-ts
```
Followed by MUI installation: `npm install @mui/material @emotion/react @emotion/styled`
