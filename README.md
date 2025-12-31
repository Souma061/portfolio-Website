# 🌐 Soumabrata Ghosh — Portfolio Website

A modern, performance-focused developer portfolio built with **React + Vite**, designed to showcase projects, skills, and engineering practices with an emphasis on clean UI, internationalization (i18n), and maintainable architecture.

Live: https://soumabrata.me

## ✨ Features

### 🌍 Multilingual UI (i18n)

- Supported languages: English, Bengali, Hindi, French, Spanish, German
- Dynamic language switching (no page reload)
- Translation pipeline powered by **Lingo** via a same-origin API route (keeps the API key server-side)
- Cached localized UI/projects/skills in `localStorage` per locale for faster repeat visits

### 🎨 Theme System (Catppuccin)

- Mocha / Latte flavors
- Theme is applied via CSS variables + `data-catppuccin` on the root element

### ⚡ Modern Frontend Stack

- React + Vite (fast builds and HMR)
- Component-based structure
- Tailwind CSS utilities

### 📱 Responsive + Accessibility-aware

- Works across desktop and mobile
- Layouts resilient to long translated strings
- Keyboard-friendly navigation (ongoing improvements)

## 🛠️ Tech Stack

- Frontend: React, JavaScript
- Build: Vite
- Styling: Tailwind CSS + CSS variables
- i18n: Custom lightweight i18n system in `src/i18n/`
- Icons: lucide-react
- Hosting: Vercel (recommended)

## 📦 Getting Started

### 1) Install

```bash
npm install
```

### 2) Environment variables

Create a local `.env` (ignored by git). Do **not** commit secrets.

Server-side only (required for translation):

- `LINGO_API_KEY` — used by the API route `POST /api/lingo/localizeObject`

Client-side (public-by-design; values end up in the browser bundle when prefixed with `VITE_`):

- `VITE_FORMSPREE_ENDPOINT`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### 3) Run (frontend)

```bash
npm run dev
```

### 4) Run (local API proxy for development)

The project includes a lightweight Node proxy server for local use:

```bash
npm run dev:api
```

If you run both, keep Vite running in one terminal and the API server in another.

## 🚀 Deployment (Vercel)

This repo supports Vercel serverless functions under `api/`.

1. Import the repo into Vercel.
2. Add environment variables in Vercel Project → Settings → Environment Variables:
   - `LINGO_API_KEY` (server-side)
   - Any `VITE_*` values used by the client
3. Deploy.

To redeploy after changing env vars: Vercel → Deployments → Redeploy (optionally clear build cache once).

## 🌍 Internationalization (i18n) Design

The multilingual system is designed to be scalable and maintainable:

- Single source dictionary: `src/i18n/messages.en.js`
- Locale metadata + storage keys: `src/i18n/locales.js`
- Provider + translation orchestration: `src/i18n/I18nProvider.jsx`
- Transport layer to same-origin API route: `src/i18n/lingo.js`

Notes:

- UI translations are keyed (e.g. `nav.home`, `hero.title`).
- Projects/skills are translated as data payloads and merged back into the base arrays.
- Localized results are cached per locale in `localStorage`.

## 📂 Project Structure (Simplified)

```
src/
	components/
	data/
	hooks/
	i18n/
	pages/
	theme/
api/
	health.js
	lingo/
		localizeObject.js
server/
	index.js
```

## 👤 Author

Soumabrata Ghosh

- GitHub: https://github.com/Souma061
- LinkedIn: https://www.linkedin.com/in/soumabrata-ghosh-85862530b/
- Website: https://soumabrata.me

## 📄 License

MIT
