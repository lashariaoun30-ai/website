# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Savante AI is an Italian-language marketing and demo website for an AI-powered virtual dental secretary service. The site targets Italian dental practices ("studi dentistici") and is hosted on Netlify.

## Commands

- **Dev server:** `npm run dev` (starts on port 3000)
- **Build:** `npm run build` (outputs to `dist/`)
- **Preview production build:** `npm run preview`

There are no tests or linting configured.

## Architecture

**Frontend:** React 18 SPA using Vite, with HashRouter (`#/path`) for client-side routing. Tailwind CSS is loaded via CDN in `index.html` (not as a PostCSS plugin), with the full theme config defined inline in `index.html`.

**Key entry points:**
- `index.html` — contains Tailwind config, CSS variables, importmap for ESM dependencies, and SEO/structured data
- `index.tsx` — React root mount
- `App.tsx` — Router with routes: `/`, `/soluzioni`, `/booking`, `/blog`, `/privacy-policy`

**Component structure:**
- `components/` — page-level components (Home, Booking, Blog, Layout, PrivacyPolicy)
- `components/sections/` — homepage sections (Hero, Problem, Solutions, LiveDemo, FAQ, SocialProof, etc.)
- `components/ui/` — reusable UI primitives (NavBar, Button, Card, Input, custom animation components)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Layout:** `components/Layout.tsx` wraps all routes with a shared NavBar and Footer. Navigation uses anchor links (`#hero`, `#solution`, etc.) for same-page scrolling on the homepage.

**Backend:** Single Netlify Function at `netlify/functions/trigger-call.js` — triggers a Vapi AI phone call demo. It calls the Vapi API with ElevenLabs voice, Deepgram transcription (Italian), and a GPT-4o system prompt. Requires `VAPI_PRIVATE_API_KEY` and `VAPI_PHONE_NUMBER_ID` environment variables set in Netlify.

**Path alias:** `@` maps to the project root (configured in `vite.config.ts`).

## Styling

- Brand color is deep forest green (`#006400`), used for primary/accent throughout
- Font: DM Sans (loaded from Google Fonts)
- CSS variables defined in `index.html` `<style>` block follow shadcn/ui conventions (HSL values)
- Dark mode variables are defined but the site primarily uses light mode

## Deployment

Deployed on Netlify. Config in `netlify.toml`: builds with `npm run build`, publishes `dist/`, serves functions from `netlify/functions/`, and uses a catch-all redirect to `index.html` for SPA routing.
