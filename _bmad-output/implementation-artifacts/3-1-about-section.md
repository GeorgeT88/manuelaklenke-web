# Story 3.1: About Section

Status: in-progress

## Story

As a **visitor**,
I want to read about Ana's professional background and experience,
So that I can trust her qualifications before making contact.

## Acceptance Criteria

1. I can read Ana's professional story and background (FR7)
2. The content highlights her 20 years of translation experience (FR8)
3. The section has an `id="about"` attribute for navbar anchor linking
4. The section uses semantic HTML elements (NFR7)
5. Styled using MUI `sx` prop only -- no CSS files

## Tasks / Subtasks

- [ ] Task 1: Create About component (AC: #1-#5)
  - [ ] Create `src/components/About.tsx`
  - [ ] Write professional bio content highlighting 20 years experience
  - [ ] Add id="about" for anchor navigation
  - [ ] Use semantic HTML (section, heading hierarchy)
  - [ ] Style with MUI sx prop
- [ ] Task 2: Integrate in App.tsx
  - [ ] Import and render About after Hero
- [ ] Task 3: Verify build
  - [ ] Run `npm run build`
