# Story 1.2: Install MUI and Configure Theme

Status: review

## Story

As a **visitor**,
I want the site to have a warm, professional visual identity,
So that the design conveys approachability and credibility.

## Acceptance Criteria

1. MUI packages are installed (`@mui/material @emotion/react @emotion/styled`) without errors
2. A custom theme is defined in `src/theme.ts` with a warm color palette
3. `App.tsx` wraps the application in `ThemeProvider` with the custom theme
4. The app renders with the custom theme applied
5. `html` has `scroll-behavior: smooth` set via MUI's `CssBaseline` or global styles
6. `npm run build` completes without errors

## Tasks / Subtasks

- [x] Task 1: Install MUI dependencies (AC: #1)
  - [x] Run `npm install @mui/material @emotion/react @emotion/styled`
  - [x] Verify no errors or critical vulnerabilities
- [x] Task 2: Create theme file (AC: #2)
  - [x] Create `src/theme.ts` with warm, approachable color palette
  - [x] Define primary, secondary, and background colors
  - [x] Configure typography settings
- [x] Task 3: Configure App with ThemeProvider (AC: #3, #4)
  - [x] Wrap App in `ThemeProvider` with custom theme
  - [x] Add `CssBaseline` for consistent baseline styles
- [x] Task 4: Add smooth scroll behavior (AC: #5)
  - [x] Set `scroll-behavior: smooth` on `html` element via CssBaseline override
- [x] Task 5: Fix project metadata from Story 1.1
  - [x] Fix package.json name from "my-bmad-project-temp" to "my-bmad-project"
  - [x] Fix index.html title to "Ana Trifan | Professional Translation Services"
  - [x] Remove stale vite.svg favicon reference
- [x] Task 6: Verify build (AC: #6)
  - [x] Run `npm run build`
  - [x] Confirm TypeScript compilation passes

## Dev Notes

### Architecture Compliance

- **MUI packages:** `@mui/material @emotion/react @emotion/styled` [Source: architecture.md#Starter Template Evaluation]
- **Theme file:** `src/theme.ts` with warm color palette [Source: architecture.md#Frontend Architecture]
- **Styling:** MUI `sx` prop and `styled()` only -- no CSS files [Source: architecture.md#Implementation Patterns]
- **Scroll behavior:** CSS `scroll-behavior: smooth` for anchor navigation [Source: architecture.md#Frontend Architecture]

### References

- [Source: architecture.md#Frontend Architecture] - MUI theming approach
- [Source: architecture.md#Implementation Patterns] - Styling rules
- [Source: epics.md#Story 1.2] - Story definition and acceptance criteria

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- MUI v7.3.7 installed with Emotion v11.14.x
- 54 packages added, 231 total, 0 vulnerabilities
- Build: 269 modules transformed, built in 1.80s

### Completion Notes List

- Installed @mui/material@7.3.7, @emotion/react@11.14.0, @emotion/styled@11.14.1
- Created src/theme.ts with warm brown/tan color palette (primary #5B4A3F, secondary #C4956A, background #FAF7F4)
- Typography configured with Roboto font family and weighted headings
- scroll-behavior: smooth applied via MuiCssBaseline component override
- App.tsx updated with ThemeProvider + CssBaseline
- Fixed package.json name from "my-bmad-project-temp" to "my-bmad-project"
- Fixed index.html title and removed stale vite.svg favicon reference
- Build verified: TypeScript compilation + Vite production build pass cleanly

### File List

- package.json (modified: name fix, MUI dependencies added)
- package-lock.json (modified: new dependencies)
- index.html (modified: title updated, favicon removed)
- src/theme.ts (new)
- src/App.tsx (modified: ThemeProvider + CssBaseline)
