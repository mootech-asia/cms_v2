# Claude Latest Handoff

> Updated: 2026-07-19 (Asia/Taipei)
> Repository: `mootech-asia/cms_system_v2`
> Status: `main` switched and **promoted to production**. Live and verified: pure-HTML
> front-end + `/studio`. `/admin` intentionally 404s (see below).

## ⚠️ 2026-07-19 restructuring — READ THIS FIRST

業主指令:把工廠(v2)與 v3 抽出成純 HTML+CSS+JS,原本呈現的 layout 改存分支,新的純
HTML 版本設為 main。第一版執行時把 `/admin`(客戶後台)、`/studio`(設計後台)一起
封存進分支、一起從 main 移除——**業主隨後糾正:設計後台是工廠工具,要繼續跟主站綁在
一起、不能封存;只有真正面向網站經營者的客戶後台才封存進分支。** 最終定案與現況:

- `factory/win100/`:WIN100 前台 24 頁,純 HTML+CSS+vanilla JS,免建置、可直接開
  `index.html`。結構驗證 9/9、行為驗證 31/31(`scripts/verify-factory-win100*.js`)。
- `frontend/`(Nuxt)**仍在 main**,但角色改變:只用來 build `/studio`(設計後台),
  不再提供前台頁面(前台由 `factory/win100/` 取代)。
- 分支 `工程師框架版本`:完整保存切換前的 Nuxt 4 前台快照(供需要完整舊版前台原始碼
  時取用)。
- 分支 `客戶後台`:完整保存 `/admin`(客戶後台),隨完整 Nuxt 專案一併保存以確保可
  建置執行。**`/admin` 不會出現在新的 candidate 或正式站——這是業主已確認接受的
  過渡期取捨**,之後要恢復需另外安排部署。
- `build-pages-candidate.yml` 現在同時處理兩件事:驗證+組裝 `factory/win100/`(前台)、
  跑一次 `nuxt generate` 只取其中 `studio/`、`studio/preview/`、`_nuxt/` 併入
  candidate(不取 `admin/`)。本地驗證方式:先組裝 candidate,再起一個把
  `cms_system_v2/` 當子目錄的靜態伺服器測 `/cms_system_v2/studio/`(直接用
  `localhost:PORT/studio/` 測會因為 base path 不符而資源 404,不是真的壞掉)。
- **已 promote 到正式站**(candidate SHA `4a290a7f4e2893bbf2fc8fedcad631932c1e78ee`,
  來源 main commit `1a1ead55`)。正式站實測結果:前台 `/` 200(標題
  `CMS_前台_v2`,無 `data-v-*` 殘留)、`/studio/` 200(標題 `CMS_設計後台_v2`)、
  `/studio/preview/` 200、`/admin/` 404(符合預期,GitHub 原生 Pages 部署有約 3
  分鐘傳播延遲,期間 `/admin/` 會短暫仍是舊內容,不是失敗)。

規劃與執行細節、驗證方法、已知限制,見
`docs/factory-html-pipeline-plan.md`(Phase 0/2 狀態已更新)。

## Read this first (deployment mechanics — still accurate post-switch)

- Work directly on GitHub. The user explicitly does not want a local checkout used as the source of truth.
- Source branch: `main` — as of 2026-07-19 this is the new pure-HTML front-end
  (`factory/win100/`) plus `frontend/` (Nuxt, now scoped to building `/studio` only).
- Build candidate branch: `pages-candidate`.
- Production branch: `gh-pages`.
- Do not edit generated files on `gh-pages` by hand.
- Do not delete any `backup/*` branches — and do not delete `工程師框架版本` or
  `客戶後台` either; `工程師框架版本` is the only place the pre-switch Nuxt front-end
  lives, and `客戶後台` is the only place `/admin` (client admin) lives now that it's
  excluded from main's deployment.
- Historical implementation detail remains in `docs/handoff-2026-07-16.md`.

## Current URLs

- Repository: https://github.com/mootech-asia/cms_system_v2
- Frontend: https://mootech-asia.github.io/cms_system_v2/
- Design studio: https://mootech-asia.github.io/cms_system_v2/studio/
- Studio preview: https://mootech-asia.github.io/cms_system_v2/studio/preview/
- ~~Client admin~~: `/admin/` returns 404 as of the 2026-07-19 promotion (confirmed
  live, verified after GitHub's native Pages deploy propagated). See restructuring
  note above. To bring `/admin` back, deploy it separately from branch `客戶後台`
  (not yet done).

The old `cms_v2` Pages URL is retired and must not be used.

## Verified branch state

| Purpose | Branch / source | SHA |
|---|---|---|
| Deployed frontend + studio source (current, live) | `main` | `c507d87` |
| Candidate output (current) | `pages-candidate` | `4a290a7f4e2893bbf2fc8fedcad631932c1e78ee` |
| Production output (current, live, verified) | `gh-pages` | `4a290a7f4e2893bbf2fc8fedcad631932c1e78ee` |
| Legacy production backup | `backup/gh-pages-legacy-2026-07-16` | `0b1a1d61a5bcc4bb72e490952a582d5da62a02bd` |
| **Nuxt engineer-form snapshot (pre-switch full front-end)** | `工程師框架版本` | `1f82ee3`(branched from old `main`) |
| **Client admin snapshot** | `客戶後台` | `7c7113a`(branched from old `main`; also contains the pre-switch studio, unused now that studio builds from main) |

Note on local `git fetch`: `gh-pages` is force-pushed with unrelated history on every
promotion. A plain `git fetch origin gh-pages` can silently keep a stale local
tracking ref in that situation — use `git fetch origin gh-pages --force` (or just
trust `git ls-remote`) when checking its true state.

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

### High-contrast banner release (current production)

- Source commit: `0bdb83bd9ca2208298bd7d955bd0674e1c455835`.
- Frontend checks: run `29550284470`, success.
- Build Pages candidate: run `29550284475`, success.
- GitHub Pages deployment: run `29550538980`, success.

## 2026-07-20 owner batch (factory/win100 static front)

All changes live in `factory/win100/` (vanilla JS/CSS) unless noted:

- **Sticky header**: ancestor `overflow-x-hidden` killed `position:sticky`; new
  `assets/css/global.css` (owner rule: Tailwind first, remainder in global.css)
  overrides to `overflow-x: clip`. Header now pins on scroll on every page.
- **Banking Details removed entirely**: `banking-details.html` deleted (23 pages now),
  security row + `initBankingDetailsPage()` removed, account page "Add New Bank
  Account" repointed to `withdrawal.html?tab=management` (deep link supported).
- **Bank account sync**: withdrawal carousel + Account Management list render from the
  same `D.BANK_ACCOUNTS`; management submit pushes and refreshes both
  (`renderMgmtList()` + `withdrawalCarouselApi.refresh()`).
- **Back button placement**: `[data-member-back]` left-aligned above the title with a
  top gap (global.css `align-self: flex-start`).
- **Customer Service = popup**: sidebar CS button opens `openCsModal()`
  (Live Chat / Telegram / Email rows, v3-style), no navigation.
- **Strict locale**: `initLocaleObserver()` wired at boot (MutationObserver localizes
  all dynamically added nodes); `currentLocale()` normalizes stray ko/th → zh;
  I18N entries take precedence over inverted SWEEP_PAIRS so nav shows canonical
  labels; category-banner baked art strings (HOT GAMES / SLOT MACHINES /
  TRENDING NOW…) snapshot to `data-i18n-orig` and restore exactly in EN
  (uppercase visual kept by `.category-hero-title { text-transform: uppercase }`).
- **Nuxt side**: `AuthModal.vue` fully on `t()` + `useLocale.ts` auth.* keys ×4 locales
  (compiled into studio bundle, verified zh/en values present).
- **Suites (all green)**: `verify-factory-win100.js` 9/9, behavior 30/30 (1280×900
  viewport; hero-arrow clicks JS-dispatched because the original fixed `.qr-rail`
  overlays them at short viewports; auth title asserts zh 登入), owner-batch 10/10
  (CS check now expects popup), batch3 8/8 (sticky/banking/back/CS/bank-sync/strict
  locale incl. dynamic CS modal + withdrawal zh).

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
- `frontend/app/components/CategoryHero.vue`
- `frontend/app/components/CategoryHeroV2.vue`
- `frontend/app/components/CategoryHeroV3.vue`
- `frontend/app/config/mock/home.ts`
- `frontend/app/config/operational-media.ts`
- `frontend/app/assets/css/main.css`
- `frontend/app/pages/admin.vue`

Behavior:

- Desktop campaign stage is 520px high and uses full-bleed operational photography.
- The first campaign is `First Deposit / Deposit Fever / 100%`, with gold emphasis and the
  reference-standard left copy/right subject composition.
- The remaining campaigns cover World Football 2026, esports, and finance/USDT.
- Photography saturation, contrast, brightness, light bloom, text glow, and CTA separation were
  increased without changing the restored Emerald skin palette.
- Category content banners use a 300px desktop stage with category photography, vivid color,
  tokenized scrims, outlined eyebrow text, and a bright title treatment.
- Includes autoplay, pause on hover/focus, swipe, Previous/Next, counter, and pagination.
- Mobile campaign stage is 390px high and category banners are 220px high; focal positions and
  scrims preserve copy readability without horizontal overflow.
- Text remains HTML rather than being baked into images.
- Admin upload guidance now recommends `1920 x 640 px (3:1)` and reserves the left 45% as a copy
  safe area when the subject is placed on the right.

Verified image dimensions:

- All four images loaded at 1920px natural width.
- Desktop campaign height: `520px`.
- Mobile campaign height: `390px`.
- Desktop category banner height: `300px`.
- Mobile category banner height: `220px`.
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

**This procedure describes the OLD Nuxt pipeline, still in effect while `main` is unswitched.**
Once `claude/factory-web-refactor-ewrpuv` merges into `main`, step 2's `Frontend checks`
workflow no longer exists (removed; superseded by `Factory checks`) and step 2's
`Build Pages candidate` runs `node scripts/verify-factory-win100.js` against
`factory/win100/` instead of `nuxt generate` — the rest of the flow (candidate → manual
promote → verify) is unchanged.

1. Edit source on `main` through GitHub.
2. Wait for both workflows:
   - `Frontend checks` (OLD; becomes `Factory checks` after the main switch)
   - `Build Pages candidate`
3. Confirm the `pages-candidate` commit message identifies the expected `main` source SHA.
4. Test candidate output at desktop and mobile widths.
5. Only after verification, promote via the `Promote Pages candidate` workflow
   (`promote-pages.yml`, workflow_dispatch with the exact candidate SHA — it refuses
   on mismatch). Direct force-push of `gh-pages` also works for humans with push access.
6. Wait for GitHub's `pages build and deployment` run to succeed.
7. Verify the public frontend, admin, studio, and any newly added assets.
   **After the main switch, the candidate/production build has no admin or studio at
   all** — see the 2026-07-19 restructuring note above before promoting.

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

1. Read this file — check first whether `main` has been switched to
   `factory/win100/` yet (look for `frontend/` at the repo root: present = old Nuxt
   `main` still active; absent = already switched).
2. Read `CLAUDE.md`.
3. Read `docs/handoff-2026-07-16.md` only when historical detail is needed.
4. Confirm the repository is `mootech-asia/cms_system_v2`, not `cms_v2`.
5. Confirm the requested target branch before editing.
6. Keep source edits on `main` unless the user explicitly requests another branch.
7. Preserve the candidate-to-production deployment gate.
8. Re-test all six skins when adding new semantic tokens (win100/aurora/noir/
   fashion-blue/rose-graphite/cyber-green).
9. Report the GitHub source commit, checks, deployed output SHA, and public verification.
10. If working on the pure-HTML factory (`factory/win100/`): never hand-edit a page's
    generated structure and behavior layer in the same pass without re-running both
    `scripts/verify-factory-win100.js` and `scripts/verify-factory-win100-behavior.js`
    afterward — see "2026-07-19 restructuring" above for what exists and where.

## 2026-07-17 session additions (summary)

- Skin/locale switchers on the public site are studio-gated (`publicSkins`/`publicLocales`, default all public).
- Studio settings persist to the front via `win100-public-config` (localStorage, cross-tab).
- New skin `cyber-green` (電競綠黑); hero typography locked across devices; sport card has a stadium banner.
- Deposit non-bank methods route through a black-and-white QR + address step ("下一步").
- /studio sidebar is collapsible with a five-column variant grid; /admin media replacement pane is still TODO.
- Promotion to production now normally runs through `promote-pages.yml` (see procedure above).
- Delivery repo `cms_v2_1.0.0` exists (engineer-form snapshot, tag v1.0.0 pending owner UI action).

## Current handoff conclusion

All items below "2026-07-17 session additions" are historical and still accurate for the
pre-restructuring Nuxt build. As of 2026-07-19, the biggest open item is the one described at
the top of this file: **merge `claude/factory-web-refactor-ewrpuv` into `main` (or open a PR for
it) once the admin/studio production question is resolved.** Nothing else from prior sessions is
known to be unfinished — the game-carousel tabs, high-contrast operational banners, category
provider photography, and six-skin system are all complete on the Nuxt build, and the same
behaviors (skins, banner carousel, tab switching, login bypass, nav) are independently
re-implemented and verified on the new `factory/win100/` static build.
