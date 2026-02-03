---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-02-03'
inputDocuments: ['prd.md', 'architecture.md']
---

# my-bmad-project - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for my-bmad-project, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Visitors can see a fixed navigation bar at the top of the page at all times while scrolling
- FR2: Visitors can click navigation links to smooth-scroll to any section (About, Services, Testimonials, Contact)
- FR3: Visitors can see Ana's name prominently displayed upon landing
- FR4: Visitors can see Ana's professional photo in the hero section
- FR5: Visitors can read the tagline "Professional Translation Services -- German | Romanian | English"
- FR6: Visitors can click a call-to-action button that navigates to the Contact section
- FR7: Visitors can read Ana's professional story and background
- FR8: Visitors can learn about Ana's 20 years of translation experience
- FR9: Visitors can view four distinct translation service categories (Legal, Medical, Technical, Literary)
- FR10: Visitors can read a brief description of each translation service
- FR11: Visitors can visually distinguish between the four service categories
- FR12: Visitors can read three client testimonials
- FR13: Visitors can see the name of each testimonial author
- FR14: Visitors can submit a contact inquiry with their name, email, and message
- FR15: Visitors can see confirmation that their message was submitted successfully
- FR16: Visitors can see a validation error if required form fields are incomplete
- FR17: Ana receives contact form submissions via email
- FR18: Visitors can view and interact with all sections on mobile devices
- FR19: Visitors can view and interact with all sections on tablet devices
- FR20: Visitors can view and interact with all sections on desktop devices

### NonFunctional Requirements

- NFR1: The site achieves a Lighthouse performance score of 80 or above
- NFR2: Initial page load completes within 3 seconds on a standard broadband connection
- NFR3: Ana's professional photo is optimized for web delivery without visible quality loss
- NFR4: All images include descriptive alt text
- NFR5: The site is navigable using keyboard only
- NFR6: Color contrast ratios meet WCAG 2.1 AA minimum standards
- NFR7: Semantic HTML elements are used for proper screen reader interpretation
- NFR8: Contact form submissions are delivered reliably via third-party form service (Formspree or EmailJS)
- NFR9: If the form service is unavailable, Ana's email address is displayed as a fallback contact method
- NFR10: The site renders correctly on Chrome, Firefox, Safari, and Edge (latest versions)
- NFR11: The site is responsive at standard breakpoints: mobile (< 600px), tablet (600-960px), desktop (> 960px)

### Additional Requirements

- Starter template: `npm create vite@latest my-bmad-project -- --template react-ts` (Epic 1 Story 1)
- MUI installation: `@mui/material @emotion/react @emotion/styled`
- Custom theme file (`src/theme.ts`) with warm, approachable color palette
- Vitest as testing framework (nice-to-have)
- `.env` configuration for form service endpoint
- WebP image format for Ana's professional photo
- Flat component structure under `src/components/`
- MUI `sx` prop and `styled()` for all styling -- no CSS files

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 2 | Fixed navbar visible at all times |
| FR2 | Epic 2 | Smooth scroll navigation links |
| FR3 | Epic 2 | Ana's name prominently displayed |
| FR4 | Epic 2 | Professional photo in hero |
| FR5 | Epic 2 | Tagline displayed |
| FR6 | Epic 2 | CTA button navigates to Contact |
| FR7 | Epic 3 | Professional story and background |
| FR8 | Epic 3 | 20 years of experience |
| FR9 | Epic 3 | Four service categories |
| FR10 | Epic 3 | Service descriptions |
| FR11 | Epic 3 | Visual distinction between services |
| FR12 | Epic 4 | Three client testimonials |
| FR13 | Epic 4 | Testimonial author names |
| FR14 | Epic 4 | Contact form submission |
| FR15 | Epic 4 | Success confirmation message |
| FR16 | Epic 4 | Validation error display |
| FR17 | Epic 4 | Email delivery to Ana |
| FR18 | Epic 5 | Mobile responsiveness |
| FR19 | Epic 5 | Tablet responsiveness |
| FR20 | Epic 5 | Desktop responsiveness |

## Epic List

### Epic 1: Project Foundation & Theme
Establish the project scaffold and visual identity so all subsequent sections share a consistent, warm, professional look and feel.
**FRs covered:** None directly (enables all FRs)
**Additional:** Vite init, MUI install, theme config, responsive foundation

### Epic 2: First Impression & Navigation
Visitors land on the site and immediately understand who Ana is, what she offers, and can navigate to any section.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6
**NFRs addressed:** NFR3, NFR4, NFR5, NFR7

### Epic 3: Professional Credibility
Visitors can learn about Ana's experience and see her four specialized translation services, building confidence in her qualifications.
**FRs covered:** FR7, FR8, FR9, FR10, FR11

### Epic 4: Social Proof & Contact
Visitors read testimonials that reinforce trust, then submit a contact inquiry -- completing the full user journey from discovery to action.
**FRs covered:** FR12, FR13, FR14, FR15, FR16, FR17
**NFRs addressed:** NFR8, NFR9

### Epic 5: Polish & Cross-Browser Readiness
The site is responsive, accessible, and performs well across all target devices and browsers -- ready for deployment.
**FRs covered:** FR18, FR19, FR20
**NFRs addressed:** NFR1, NFR2, NFR6, NFR10, NFR11

## Epic 1: Project Foundation & Theme

Establish the project scaffold and visual identity so all subsequent sections share a consistent, warm, professional look and feel.

### Story 1.1: Initialize Vite Project

As a **developer**,
I want to scaffold the project using Vite with the React TypeScript template,
So that I have a working development environment to build upon.

**Acceptance Criteria:**

**Given** no project exists
**When** the developer runs `npm create vite@latest my-bmad-project -- --template react-ts`
**Then** the project is created with the standard Vite React-TS structure
**And** `npm install` completes without errors
**And** `npm run dev` starts the dev server at localhost:5173

### Story 1.2: Install MUI and Configure Theme

As a **visitor**,
I want the site to have a warm, professional visual identity,
So that the design conveys approachability and credibility.

**Acceptance Criteria:**

**Given** the Vite project is initialized
**When** MUI packages are installed (`@mui/material @emotion/react @emotion/styled`)
**Then** the packages install without errors
**And** a custom theme is defined in `src/theme.ts` with a warm color palette
**And** `App.tsx` wraps the application in `ThemeProvider` with the custom theme
**And** the app renders with the custom theme applied
**And** `html` has `scroll-behavior: smooth` set

## Epic 2: First Impression & Navigation

Visitors land on the site and immediately understand who Ana is, what she offers, and can navigate to any section.

### Story 2.1: Hero Section

As a **visitor**,
I want to see Ana's name, professional photo, tagline, and a call-to-action button when I land on the site,
So that I immediately understand who she is and what she offers.

**Acceptance Criteria:**

**Given** I visit the site
**When** the page loads
**Then** I see Ana's name prominently displayed (FR3)
**And** I see Ana's professional photo in WebP format with descriptive alt text (FR4, NFR3, NFR4)
**And** I see the tagline "Professional Translation Services -- German | Romanian | English" (FR5)
**And** I see a call-to-action button (e.g., "Get in Touch")
**And** clicking the CTA button smooth-scrolls to the Contact section (FR6)
**And** the hero section uses semantic HTML elements (NFR7)

### Story 2.2: Sticky Navbar with Smooth Scroll

As a **visitor**,
I want a fixed navigation bar that lets me jump to any section,
So that I can quickly find what I'm looking for without scrolling manually.

**Acceptance Criteria:**

**Given** I am on the site
**When** I scroll down the page
**Then** the navigation bar remains fixed at the top of the viewport (FR1)
**And** the navbar contains links to About, Services, Testimonials, and Contact sections

**Given** I click a navigation link
**When** the browser scrolls to that section
**Then** the scroll is smooth, not instant (FR2)
**And** the correct section is visible in the viewport

**Given** I use keyboard navigation
**When** I tab through the navbar links and press Enter
**Then** the page smooth-scrolls to the corresponding section (NFR5)

## Epic 3: Professional Credibility

Visitors can learn about Ana's experience and see her four specialized translation services, building confidence in her qualifications.

### Story 3.1: About Section

As a **visitor**,
I want to read about Ana's professional background and experience,
So that I can trust her qualifications before making contact.

**Acceptance Criteria:**

**Given** I am on the site
**When** I scroll to or navigate to the About section
**Then** I can read Ana's professional story and background (FR7)
**And** the content highlights her 20 years of translation experience (FR8)
**And** the section has an `id="about"` attribute for navbar anchor linking
**And** the section uses semantic HTML elements

### Story 3.2: Services Section with Service Cards

As a **visitor**,
I want to see Ana's four translation specializations presented as distinct cards,
So that I can quickly identify whether she handles my specific translation need.

**Acceptance Criteria:**

**Given** I am on the site
**When** I scroll to or navigate to the Services section
**Then** I see four distinct service categories: Legal, Medical, Technical, and Literary (FR9)
**And** each service card includes a brief description of that translation domain (FR10)
**And** the four cards are visually distinct from each other (FR11)
**And** the section has an `id="services"` attribute for navbar anchor linking
**And** the ServiceCard component is reusable and accepts props for title and description

## Epic 4: Social Proof & Contact

Visitors read testimonials that reinforce trust, then submit a contact inquiry -- completing the full user journey from discovery to action.

### Story 4.1: Testimonials Section

As a **visitor**,
I want to read testimonials from Ana's previous clients,
So that I feel confident about her quality of work before reaching out.

**Acceptance Criteria:**

**Given** I am on the site
**When** I scroll to or navigate to the Testimonials section
**Then** I can read three client testimonials (FR12)
**And** each testimonial displays the author's name (FR13)
**And** the section has an `id="testimonials"` attribute for navbar anchor linking
**And** the TestimonialCard component is reusable and accepts props for quote and author name

### Story 4.2: Contact Form with Validation

As a **visitor**,
I want to submit my name, email, and message through a contact form,
So that I can inquire about Ana's translation services.

**Acceptance Criteria:**

**Given** I am on the Contact section
**When** I fill in my name, email, and message and click Submit
**Then** the form submits to the configured form service (Formspree or EmailJS) (FR14, NFR8)
**And** I see a success confirmation message (FR15)
**And** Ana receives the submission via email (FR17)

**Given** I click Submit with empty or invalid required fields
**When** the form validates the input
**Then** I see validation error messages indicating which fields need attention (FR16)
**And** the form is not submitted

**Given** the form service is unavailable
**When** the form cannot be submitted
**Then** Ana's email address is displayed as a fallback contact method (NFR9)

**And** the submit button is disabled with a spinner during submission
**And** the section has an `id="contact"` attribute for navbar anchor linking
**And** form service endpoint is configured via `.env`

## Epic 5: Polish & Cross-Browser Readiness

The site is responsive, accessible, and performs well across all target devices and browsers -- ready for deployment.

### Story 5.1: Responsive Design Across Breakpoints

As a **visitor**,
I want the site to look and function well on my device regardless of screen size,
So that I have a good experience whether I'm on my phone, tablet, or desktop.

**Acceptance Criteria:**

**Given** I visit the site on a mobile device (< 600px)
**When** the page renders
**Then** all sections are readable, usable, and properly laid out (FR18)
**And** the navbar is accessible and functional

**Given** I visit the site on a tablet (600-960px)
**When** the page renders
**Then** all sections adapt to the tablet layout appropriately (FR19)

**Given** I visit the site on a desktop (> 960px)
**When** the page renders
**Then** all sections use the full desktop layout (FR20)

**And** responsive behavior uses MUI breakpoints (NFR11)

### Story 5.2: Accessibility & Performance Audit

As a **visitor**,
I want the site to be accessible and fast-loading,
So that I can use it regardless of ability or connection speed.

**Acceptance Criteria:**

**Given** the site is loaded in Lighthouse
**When** a performance audit is run
**Then** the score is 80 or above (NFR1)
**And** the initial page load completes within 3 seconds on broadband (NFR2)

**Given** the site uses colors for text and backgrounds
**When** contrast ratios are measured
**Then** all text meets WCAG 2.1 AA minimum contrast standards (NFR6)

**Given** the site is opened in Chrome, Firefox, Safari, or Edge (latest)
**When** all sections are rendered
**Then** the layout and functionality work correctly in each browser (NFR10)
