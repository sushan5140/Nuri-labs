# NURI Labs

Independent student-led educational technology initiative connecting Hallium, KMate, Haneul Video Lab and K-Drama Interactive.

## Localhost first — no deployment

On Windows PowerShell in the already-cloned directory:

```powershell
git pull origin main
npm install
npm run dev
```

Open **http://localhost:3000**. If the development server is already running, use `Ctrl+C` and restart it after pulling.

For a fresh clone:

```powershell
git clone https://github.com/sushan5140/Nuri-labs.git
cd Nuri-labs
.\start-local.cmd
```

Do **not** run a production deployment until the owner reviews the localhost build.

## What the current UI does

- Interactive, click-to-switch product previews in the homepage hero.
- Product detail dialog with verified external launch links and Escape-to-close behavior.
- Interactive starting-point selector with recommended NURI products.
- Product search and category filters, including Saved.
- Save-for-later stars stored **only in this browser's localStorage**, not in Supabase.
- Responsive navigation, intentional micro-interactions and reduced-motion support.
- GitHub Actions verifies TypeScript and the Next.js build; it does **not** deploy the website.

## Product links and boundaries

Edit `.env.local` based on `.env.example` to configure product destinations. The KMate URL is intentionally unset until verified. Previewing KMate still works inside NURI Labs; its external launch is labeled `LINK SOON` until an official URL is added.

The product previews on NURI Labs are *illustrative UI*, not live data from the child applications. Existing applications, Supabase projects, user sessions and data remain independent. Shared sign-in and Learning Passport are roadmap items only, not released.

## Tech

Next.js / React / TypeScript / CSS / Lucide icons. No animation library or new service keys needed. Motion uses short transform/opacity transitions with `prefers-reduced-motion` support.
