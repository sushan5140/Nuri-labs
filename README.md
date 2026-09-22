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

- An **interactive universe map** with four distinct clickable destinations and a central NURI landmark.
- A **four-room Experience Studio**. Its Hallium flip-card, Video Lab guess-before-reveal and word breakdown, K-Drama dialogue choices, and KMate sample exploration checklist all respond to interaction.
- Product-specific editorial bento cards with differentiated rose / mint / gold / lavender colors.
- A journey route picker that leads to the corresponding sample experience.
- A hub with searchable/filterable products, local saved-world bookmarks, and verified product launch links. Configure the KMate URL in `.env.local` when its official destination is verified.
- Responsive mobile layout, keyboard-readable real buttons, visible focus states, and reduced-motion support.

The four on-site interactions are **original illustrative samples, not embedded or live data from the child products**. They do not mark tasks done on KMate, claim Video Lab video playback, or save Hallium learning history. Starred products are stored in the current browser's localStorage only.

No existing child-product repository, Supabase configuration, user account, production website or saved progress is modified. Shared sign-in and a Learning Passport remain future work.

## Verification

GitHub Actions runs TypeScript and Next.js build checks on pushes. It does **not** deploy to Vercel.
