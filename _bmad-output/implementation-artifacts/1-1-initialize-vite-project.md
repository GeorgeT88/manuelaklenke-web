# Story 1.1: Initialize Vite Project

Status: ready-for-dev

## Story

As a **developer**,
I want to scaffold the project using Vite with the React TypeScript template,
so that I have a working development environment to build upon.

## Acceptance Criteria

1. Project is created using `npm create vite@latest my-bmad-project -- --template react-ts`
2. `npm install` completes without errors
3. `npm run dev` starts the dev server at localhost:5173
4. Default Vite React-TS app renders in the browser
5. TypeScript compilation has no errors

## Tasks / Subtasks

- [ ] Task 1: Scaffold project (AC: #1)
  - [ ] Run `npm create vite@latest my-bmad-project -- --template react-ts`
  - [ ] Note: Since we are already in the project directory, initialize Vite in a temp location and move files, OR initialize directly if directory is empty
- [ ] Task 2: Install dependencies (AC: #2)
  - [ ] Run `npm install`
  - [ ] Verify no errors or critical vulnerabilities
- [ ] Task 3: Verify dev server (AC: #3, #4)
  - [ ] Run `npm run dev`
  - [ ] Confirm app renders at localhost:5173
- [ ] Task 4: Clean up starter boilerplate (AC: #5)
  - [ ] Remove default Vite demo content from `App.tsx` (replace with minimal placeholder)
  - [ ] Remove `App.css` and `index.css` (styling will be handled by MUI in Story 1.2)
  - [ ] Remove any Vite/React logos from `src/assets/` if present
  - [ ] Keep `src/vite-env.d.ts` (TypeScript declarations)
  - [ ] Verify `npm run build` completes without errors
- [ ] Task 5: Initialize Git repository
  - [ ] Run `git init`
  - [ ] Verify `.gitignore` includes `node_modules/`, `dist/`, `.env`
  - [ ] Create initial commit

## Dev Notes

### Architecture Compliance

- **Starter template:** `npm create vite@latest my-bmad-project -- --template react-ts` [Source: architecture.md#Starter Template Evaluation]
- **Node.js requirement:** 20.19+ or 22.12+ [Source: architecture.md#Language & Runtime]
- **Build tool:** Vite 8.x [Source: architecture.md#Build Tooling]

### Technical Requirements

- **Language:** TypeScript with React (react-ts template)
- **Build:** Vite 8.x with esbuild for dependency pre-bundling, Rollup for production
- **Dev server:** localhost:5173 with HMR

### Project Structure Notes

After this story, the project structure should match:

```
my-bmad-project/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx
    └── vite-env.d.ts
```

- Remove default CSS files (`App.css`, `index.css`) -- MUI will handle all styling (Story 1.2)
- Remove default logo assets -- not needed
- Keep `App.tsx` with a minimal placeholder (e.g., empty fragment or simple div)

### File Structure Requirements

- `src/` directory for application code [Source: architecture.md#Code Organization]
- `public/` directory for static assets [Source: architecture.md#Code Organization]
- `index.html` as entry point [Source: architecture.md#Code Organization]
- `vite.config.ts` for build configuration [Source: architecture.md#Code Organization]

### What NOT to Do

- Do NOT install MUI yet -- that is Story 1.2
- Do NOT create any components yet -- those come in Epics 2-4
- Do NOT add `.env` files yet -- that is Story 4.2
- Do NOT add any styling -- MUI theming comes in Story 1.2

### References

- [Source: architecture.md#Starter Template Evaluation] - Vite + React + TypeScript selection rationale
- [Source: architecture.md#Code Organization] - Directory structure
- [Source: epics.md#Story 1.1] - Story definition and acceptance criteria

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
