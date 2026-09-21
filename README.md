# NURI Labs

An independent student-led educational technology initiative connecting Hallium, KMate, Haneul Video Lab and K-Drama Interactive.

## Development
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000. On Windows PowerShell, use `Copy-Item .env.example .env.local`.

The public hub does not use Supabase or share user sessions. Set the four `NEXT_PUBLIC_*_URL` variables to connect verified product deployments. An unset URL renders "Link coming soon". Existing product applications and databases remain untouched.

## Deploy
Import this repository as a new Vercel project. Framework: Next.js; root directory: `./`. Add verified product URLs in Vercel environment variables. Shared sign-in and Learning Passport are planned, not released.