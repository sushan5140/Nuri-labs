# NURI Labs

NURI Labs is a student-led educational technology initiative connecting **Hallium**, **Haneul Video Lab**, **Haneul K-Drama Interactive**, and **KMate**. This repository hosts their independent parent hub.

## Live website

https://nuri-labs.vercel.app/

The Vercel project is `nuri-labs`, connected to the repository's `main` branch for automatic production deployments.

## Local development

```powershell
git pull origin main
npm install
npm run dev
```

Open http://localhost:3000. For a first-time clone: `git clone https://github.com/sushan5140/Nuri-labs.git`, `cd Nuri-labs`, then `.\start-local.cmd`.

## Atlas experience

The live page is `components/atlas.tsx` with `app/atlas.css`. The single official NURI story is `components/storyflow.tsx` with `app/storyflow.css`; the previous story comparison switch and earlier story design have been retired.

- **One Universe** is the interactive orbital map for Hallium, Haneul Video Lab, K-Drama Interactive and KMate.
- **Enter this world** opens an original illustrative sample in each world; it does not access child-app data.
- **Find your path** offers a simple journey picker to choose a starting point.
- **Our story** starts directly with the four-moment interactive journey (a first word, real listening, a drama scene, and a future in Korea); the redundant full-height purple prologue was retired.
- The hub includes searchable/filterable experiences, browser-local saved worlds, and product launch links where configured.
- Mobile-friendly UI, keyboard-readable controls, visible focus states and reduced-motion support.

No child-product repository, Supabase configuration, user account, production website or saved progress is modified. Shared sign-in and a Learning Passport remain future work.

## Verification

GitHub Actions runs TypeScript and Next.js build checks on pushes. Vercel separately deploys the production branch.
