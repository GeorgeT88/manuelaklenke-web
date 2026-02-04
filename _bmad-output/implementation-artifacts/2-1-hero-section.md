# Story 2.1: Hero Section

Status: done

## Story

As a **visitor**,
I want to see Ana's name, professional photo, tagline, and a call-to-action button when I land on the site,
So that I immediately understand who she is and what she offers.

## Acceptance Criteria

1. Ana's name is prominently displayed (FR3)
2. Ana's professional photo is shown in WebP format with descriptive alt text (FR4, NFR3, NFR4)
3. The tagline "Professional Translation Services -- German | Romanian | English" is displayed (FR5)
4. A call-to-action button (e.g., "Get in Touch") is visible (FR6)
5. Clicking the CTA button smooth-scrolls to the Contact section (FR6)
6. The hero section uses semantic HTML elements (NFR7)
7. The section is styled using MUI `sx` prop only -- no CSS files

## Tasks / Subtasks

- [x] Task 1: Create Hero component (AC: #1, #2, #3, #6, #7)
  - [x] Create `src/components/Hero.tsx`
  - [x] Display Ana's name prominently using MUI Typography h1
  - [x] Display tagline text using Typography h3
  - [x] Add professional photo with `<img>` referencing `/ana-photo.webp` with descriptive alt text
  - [x] Use semantic HTML (`<section>` via Box component="section")
  - [x] Style with MUI `sx` prop exclusively
- [x] Task 2: Add CTA button (AC: #4, #5)
  - [x] Add "Get in Touch" button using MUI Button (variant="contained", color="secondary")
  - [x] Link button to `#contact` anchor via href for smooth scroll
- [x] Task 3: Integrate Hero in App.tsx (AC: all)
  - [x] Import and render Hero component in App.tsx
- [x] Task 4: Verify build
  - [x] Run `npm run build`
  - [x] Confirm no TypeScript errors (373 modules, built in 2.14s)

## Dev Notes

### Architecture Compliance

- **Component:** `Hero.tsx` in `src/components/` [Source: architecture.md#Project Structure]
- **Styling:** MUI `sx` prop only [Source: architecture.md#Implementation Patterns]
- **Photo:** WebP format in `public/` directory [Source: architecture.md#Frontend Architecture]
- **Navigation:** Anchor link `#contact` with CSS smooth scroll [Source: architecture.md#Frontend Architecture]

### References

- [Source: architecture.md#Project Structure] - Component location
- [Source: architecture.md#Implementation Patterns] - Naming and styling rules
- [Source: epics.md#Story 2.1] - Story definition and acceptance criteria

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created Hero component with full-viewport-height layout
- Responsive two-column layout: text left, photo right on desktop; stacked on mobile
- Ana's name in h1 Typography, tagline in h3 Typography
- CTA "Get in Touch" button links to #contact via href (smooth scroll enabled by CssBaseline)
- Photo rendered as circular crop with box-shadow, references /ana-photo.webp (user must provide asset)
- Semantic HTML: section element wraps entire hero
- All styling via MUI sx prop -- no CSS files
- Build verified: 373 modules, 2.14s

### File List

- src/components/Hero.tsx (new)
- src/App.tsx (modified: added Hero import and render)
