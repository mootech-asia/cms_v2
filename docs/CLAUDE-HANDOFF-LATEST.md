# Claude Latest Handoff

> Updated: 2026-07-17 (Asia/Taipei)  
> Repository: `mootech-asia/cms_system_v2`  
> Status: the user's latest requests are complete, verified, and deployed.

## Read this first

- Work directly on GitHub. The user explicitly does not want a local checkout used as the source of truth.
- Source branch: `main`.
- Build candidate branch: `pages-candidate`.
- Production branch: `gh-pages`.
- Do not edit generated files on `gh-pages` by hand.
- Do not delete any `backup/*` branches.
- Historical implementation detail remains in `docs/handoff-2026-07-16.md`.

## Current URLs

- Repository: https://github.com/mootech-asia/cms_system_v2
- Frontend: https://mootech-asia.github.io/cms_system_v2/
- Client admin: https://mootech-asia.github.io/cms_system_v2/admin/
- Design studio: https://mootech-asia.github.io/cms_system_v2/studio/
- Studio preview: https://mootech-asia.github.io/cms_system_v2/studio/preview/

The old `cms_v2` Pages URL is retired and must not be used.

## Verified branch state

| Purpose | Branch / source | SHA |
|---|---|---|
| Deployed frontend source | `main` | `be8c7f8898b10dfb1bd3b5acc1c9dae611c75ca9` |
| Candidate output | `pages-candidate` | `c440183f7751f0536c6c57119ec25f529e920e3b` |
| Production output | `gh-pages` | `c440183f7751f0536c6c57119ec25f529e920e3b` |
| Legacy production backup | `backup/gh-pages-legacy-2026-07-16` | `0b1a1d61a5bcc4bb72e490952a582d5da62a02bd` |

The commit that updates this handoff is documentation-only and may make `main` newer than the
deployed frontend source. Do not promote a docs-only candidate unless another frontend change is
also ready.

## Successful GitHub Actions

### Banner, carousel, and provider media release

- Source commit: `107622c6e115329c3393e2e224f1c2cdd9d2c2d0`.
- Frontend checks: run `29519579053`, success.
- Build Pages candidate: run `29519578876`, success.
- First Pages deployment: run `29520476799`, success.

### Fifth-skin release (current production)

- Source commit: `d3c74b96b1ab21cfa1c081e9f9a2b83a63516924`.
- Frontend checks: run `29522162544`, success.
- Build Pages candidate: run `29522164173`, success.
- GitHub Pages deployment: run `29522862886`, success.

### Vivid Emerald release (superseded)

- Source commit: `61f750ceaba4649b6861030b89614f9aa81cc1c0`.
- Frontend checks: run `29523809039`, success.
- Build Pages candidate: run `29523809019`, success.
- GitHub Pages deployment: run `29524179052`, success.

### Development login bypass release (current production)

- Source commit: `ffd99700ca76907c920399ffb84d3ff85a64c1bf`.
- Frontend checks: run `29548118308`, success.
- Build Pages candidate: run `29548118300`, success.
- GitHub Pages deployment: run `29548317021`, success.

### Original Emerald restoration (current production)

- Source commit: `be8c7f8898b10dfb1bd3b5acc1c9dae611c75ca9`.
- Frontend checks: run `29548574650`, success.
- Build Pages candidate: run `29548574696`, success.
- GitHub Pages deployment: run `29548758154`, success.

## Latest completed user requests

### 1. Homepage game-carousel tabs repaired

File:

- `frontend/app/components/home/MiniGamesGrid.vue`

Behavior:

- Mini Game, Slot Game, and Live Game tabs are generated from one data model.
- Active state, cards, and the `Show all` destination update together.
- Changing category recreates the panel and resets horizontal scroll to zero.
- Previous and Next controls scroll the active rail and wrap at either end.
- Tab semantics include `tablist`, `tab`, `tabpanel`, `aria-selected`, and `aria-controls`.
- Keyboard navigation supports Left, Right, Home, and End.

Verified production values:

- First cards: `Mega Fortune`, `Gates of Olympus`, `Lightning Roulette`.
- Live Game `Show all`: `/cms_system_v2/live`.
- Next changed carousel `scrollLeft` from `0` to `1260` (candidate max `5740`).
- Changing category reset `scrollLeft` to `0`.

### 2. PC campaign banners rebuilt

Files:

- `frontend/app/components/AppBanner.vue`
- `frontend/app/config/operational-media.ts`
- `frontend/app/assets/css/main.css`

Behavior:

- Desktop campaign stage is 440px high and uses full-bleed operational photography.
- Four campaigns now cover World Football 2026, esports, luxury VIP, and finance/USDT.
- Real photography is combined with tokenized scrims and focal positions for readable copy.
- Includes autoplay, pause on hover/focus, swipe, Previous/Next, counter, and pagination.
- Mobile stage is 360px high; controls avoid the fixed quick menu.
- Text remains HTML rather than being baked into images.

Verified image dimensions:

- All four images loaded at 1920px natural width.
- Desktop campaign height: `440px`.
- Mobile campaign height: `360px`.
- Desktop and mobile document horizontal overflow: `0px`.

### 3. Provider selectors use category photography

Files:

- `frontend/app/components/VendorBrowser.vue`
- `frontend/app/config/operational-media.ts`
- `frontend/app/assets/css/main.css`

Behavior:

- Live, Slot, Fish, and Mini Games provider cards all have category-appropriate backgrounds.
- Live uses dealer/table imagery; Slot uses casino imagery; Fish uses underwater imagery; Mini
  Games uses gaming, VR, and esports imagery.
- Provider names remain readable through semantic scrims, shadows, and focus/hover treatment.
- Entering a provider preserves the existing second-level Back behavior.

Verified production values for each category:

- `30` provider cards.
- `30` image elements.
- First image loaded successfully.
- Horizontal overflow: `0px`.

### 4. Five selectable site skins

Existing skins:

1. `win100` - Emerald
2. `aurora` - Aurora
3. `noir` - Noir Gold
4. `fashion-blue` - Fashion Blue

New fifth skin:

5. `rose-graphite` - Rose Graphite

Files:

- `frontend/app/assets/css/themes/rose-graphite.css`
- `frontend/nuxt.config.ts`
- `frontend/app/utils/themes.ts`
- `frontend/app/config/template.ts`

Rose Graphite uses neutral graphite surfaces, a soft rose primary, a cool teal accent, pearl-white
text, mint success, red danger, and champagne-gold emphasis. It is available in the public header,
client Admin, Design Studio, Studio iframe preview, and exported theme source.

Contrast verification:

- Main text/background: `19.32:1`.
- Secondary text/surface: `13.42:1`.
- Tertiary text/surface: `7.64:1`.
- Weak text/background: `4.60:1`.
- Primary button text/background: `8.62:1`.
- Danger, success, and gold on surfaces: at least `6.27:1`.

Production verification:

- Five branded names are present in the public switcher.
- Rose Graphite sets `data-theme="rose-graphite"` and `--c-primary: 242 154 184`.
- Admin and Studio both expose Rose Graphite.
- `/themes/rose-graphite.css` returns HTTP 200.
- Desktop and 390px mobile horizontal overflow: `0px`.

### 5. Original Emerald palette restored

File:

- `frontend/app/assets/css/themes/win100.css`

Behavior:

- The brief high-saturation Emerald experiment was reverted at the user's request.
- `win100.css` was restored byte-for-byte from the known-good version before that experiment.
- The original soft mint primary, green-black surfaces, text hierarchy, PrimeVue ramps, hero
  gradient, and shadows are active again.
- The other four skins and the development login bypass were not changed.

Core production tokens:

- Primary: `152 231 210` (`#98E7D2`).
- Primary soft: `203 232 228` (`#CBE8E4`).
- Accent: `170 229 211` (`#AAE5D3`).
- Background: `15 20 25` (`#0F1419`).
- Surface: `26 33 40` (`#1A2128`).

Production verification:

- Desktop and 390px mobile both expose the restored primary token.
- Desktop and mobile horizontal overflow: `0px`.
- All five skin names remain available.
- Development login bypass remains functional.

### 6. Login credential validation disabled for development

File:

- `frontend/app/components/AuthModal.vue`

Behavior:

- Login mode intentionally bypasses username and password validation.
- Clicking Login with empty fields or arbitrary values immediately enters the mock logged-in state.
- Register and Forgot Password validation behavior remains unchanged.
- No member-route guard existed, so no routing or account page protection was removed.

Verification:

- Empty username/password: login succeeded and the modal closed.
- Arbitrary short credentials (`x` / `1`): login succeeded.
- Register with empty fields: modal remained open and displayed five validation messages.
- Desktop and mobile menu login both succeeded.
- Desktop and mobile horizontal overflow: `0px`.

This bypass is explicitly requested for the current development phase. Do not restore credential
validation until the user asks for production authentication or a backend authentication contract
is available.

## Earlier completed work still present

- Desktop member sidebar is fixed below the 64px member header; mobile uses bottom navigation.
- Live Game uses live-dealer photography and working carousel controls.
- Promotion artwork decorative dots were removed.
- Repository and Pages base path were migrated from `cms_v2` to `cms_system_v2`.
- The old production state remains backed up on `backup/gh-pages-legacy-2026-07-16`.

## Deployment procedure for future frontend changes

1. Edit source on `main` through GitHub.
2. Wait for both workflows:
   - `Frontend checks`
   - `Build Pages candidate`
3. Confirm the `pages-candidate` commit message identifies the expected `main` source SHA.
4. Test candidate output at desktop and mobile widths.
5. Only after verification, force-update `gh-pages` to the exact `pages-candidate` SHA.
6. Wait for GitHub's `pages build and deployment` run to succeed.
7. Verify the public frontend, admin, studio, and any newly added assets.

Do not bypass the candidate branch.

## Rollback

- For the current Nuxt release, move `gh-pages` to the previous known-good generated output SHA.
- For the pre-Nuxt legacy site, move `gh-pages` to
  `backup/gh-pages-legacy-2026-07-16` or SHA
  `0b1a1d61a5bcc4bb72e490952a582d5da62a02bd`.
- Never delete the backup branch without explicit owner approval.

## Known implementation limitations

These are product limitations, not regressions from the latest work:

- Content and account operations remain UI/mock implementations until backend contracts exist.
- Content store saves are in-memory placeholders.
- Nickname state is in-memory and resets after refresh.
- Deposit provider outcomes are simulated.
- Login accepts empty or arbitrary credentials by design during development.
- External campaign and category photography currently depends on Pexels URLs.
- Continue to follow component reuse and semantic token rules in `CLAUDE.md`.

## Claude startup checklist

1. Read this file.
2. Read `CLAUDE.md`.
3. Read `docs/handoff-2026-07-16.md` only when historical detail is needed.
4. Confirm the repository is `mootech-asia/cms_system_v2`, not `cms_v2`.
5. Confirm the requested target branch before editing.
6. Keep source edits on `main` unless the user explicitly requests another branch.
7. Preserve the candidate-to-production deployment gate.
8. Re-test all five skins when adding new semantic tokens.
9. Report the GitHub source commit, checks, deployed output SHA, and public verification.

## Current handoff conclusion

There are no known unfinished items from the user's latest requests. The game-carousel tabs,
desktop operational banners, category provider photography, and five-skin system are complete.
The original Emerald palette has been restored, and the development login bypass remains deployed
and verified on desktop and mobile.
