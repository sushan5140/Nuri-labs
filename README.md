# NURI Labs — Flagship UI

An independent student-led educational technology initiative connecting four separate products: **Hallium**, **KMate**, **Haneul Video Lab**, and **Haneul K-Drama Interactive**.

## Localhost first — no Vercel deployment

On Windows PowerShell, inside your existing Nuri-labs directory:

```powershell
git pull origin main
npm install
npm run dev
```

Open **http://localhost:3000**. If the development server is already running, use `Ctrl+C` and restart after pulling. For a clean clone, use `git clone https://github.com/sushan5140/Nuri-labs.git`, enter the folder and run `.\start-local.cmd`.

**Do not deploy to Vercel until the owner reviews localhost and requests it explicitly.**

## Flagship redesign

The live localhost homepage uses `components/flagship.tsx` and `app/flagship.css`.

- A colorful editorial hero and interactive four-product showcase with prev/next and direct selection.
- Four distinct product visual identities: rose Hallium, lavender KMate, aqua Haneul Video Lab, and warm gold K-Drama Interactive.
- Rich illustrative UI scenes (not screenshots or live child-product data).
- Working three-question Korean meaning sample, with answer feedback and next question. It is not saved into a real learning account.
- Guided learner path selector that recommends existing NURI products.
- Hub search, filters and saved products (stars saved in **this browser's localStorage only**).
- Keyboard-accessible product detail dialogs, responsive mobile navigation and reduced-motion support.
- Previous home components and styles remain in the repository for reference but are not loaded by the flagship page.

## Product links and data boundaries

Set destination URLs in `.env.local` based on `.env.example`. The KMate production destination is intentionally unset until verified; its on-site preview works, but external launch is marked coming soon.

This **does not** merge Google sessions, Supabase data or child-app code. A unified Learning Passport and shared login require future design and explicit consent. Existing product apps and deployments remain unchanged.

## Stack

Next.js 15, React 19, TypeScript, CSS and Lucide. No added animation dependency, API keys or backend for the local UI. Github Actions performs TypeScript and Next.js build checks; it does not deploy.
