# WIN100% — Nuxt 4 rebuild

A 1:1 replica of the Figma WIN100% casino site, rebuilt as a clean,
component-based Nuxt 4 app so it can be developed further.

## Stack

- **Nuxt 4** (`app/` directory structure) + Nitro
- **PrimeVue v4** (Aura preset) · **Tailwind CSS** · **Pinia** · **TypeScript** + `<script setup>`
- `public/figma.css` — the compiled Figma stylesheet, loaded as a static link

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # SSR / node-server build
npm run generate   # static-generate all routes -> .output/public
npm run preview    # preview a build
```

## Structure

```
app/
  components/        AppHeader, AppBanner, AppFooter, MobileBottomNav,
                     MemberHeader, AuthModal, AppIcon
    home/            Ticker, HotGamesRail, MiniGamesGrid, SportsPromo, Promotion
    games/           GameModal
  composables/       useGamesPage, useMemberPage, useAuth
  pages/             19 routes (home + 6 game + 11 member + promotion)
public/              figma.css, logo.png, _external/ images
```

The page bodies are extracted verbatim from the Figma export for 1:1
fidelity; cross-cutting dynamics (search filter, Load more, favourites,
game/auth modals, record filters, deposit amount select, header dropdowns,
mobile menu, login state) live in the composables and shared components.

## Routes

`/` · `/hot-games` · `/mini-games` · `/slot` · `/sport` · `/live` · `/fish` ·
`/promotion` · `/account` · `/deposit` · `/withdrawal` · `/personal-info` ·
`/profit-loss` · `/security` · `/support` · `/account-record` ·
`/betting-record` · `/deposit-record` · `/withdrawal-record`

## Deploy

`netlify.toml` (repo root) builds this app with `npm run generate` and
publishes `.output/public`. The same static output deploys to any static
host (GitHub Pages, Cloudflare Pages, etc.).
