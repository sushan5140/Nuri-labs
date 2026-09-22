# NURI Labs / Atlas preview

NURI Labs is a student-led educational technology initiative connecting **Hallium**, **Haneul Video Lab**, **Haneul K-Drama Interactive**, and **KMate**. This repository hosts only their independent parent hub.

## Localhost only — no deployment

In your existing Windows PowerShell clone:

```powershell
# Stop the current npm server first with Ctrl+C and answer Y if prompted.
git pull origin main
npm install
npm run dev
```

Open http://localhost:3000. For a first-time clone: `git clone https://github.com/sushan5140/Nuri-labs.git`, `cd Nuri-labs`, then `.\start-local.cmd`.

**Do not deploy to Vercel until the owner explicitly requests it.**

## Atlas interface (local UI)

The live page is `components/atlas.tsx` with `app/atlas.css`. Earlier `flagship.tsx` and `hub.tsx` designs remain in Git history/source as visual references and are not rendered by the current page.

- **One Universe** is the single world-selection experience: the interactive orbital map chooses Hallium, Haneul Video Lab, K-Drama Interactive or KMate.
- **Enter this world** opens a focused, color-coded sample overlay within the universe journey: Hallium word reveals, Video Lab guess-before-reveal and word breakdown, K-Drama dialogue choices, or KMate's sample exploration checklist.
- The former separate Experience Room and repeated four-product bento grid are no longer rendered; the homepage is deliberately less repetitive.
- A simple journey route picker opens the selected world directly. Dramatic backstories/origin narratives are deliberately postponed until the UI is approved.
- A hub with searchable/filterable products, local saved-world bookmarks, and available product launch links (KMate's destination is still unverified). Configure the KMate URL in `.env.local` when its official destination is verified.
- Responsive mobile layout, keyboard-readable real buttons, visible focus states, and reduced-motion support.

The four on-site interactions are **original illustrative samples, not embedded or live data from the child products**. They do not mark tasks done on KMate, claim Video Lab video playback, or save Hallium learning history. Starred products are stored in the current browser's localStorage only.

No existing child-product repository, Supabase configuration, user account, production website or saved progress is modified. Shared sign-in and a Learning Passport remain future work.

## Verification

GitHub Actions runs TypeScript and Next.js build checks on pushes. It does **not** deploy to Vercel.
