# 全站樣式規範(工程師版)

> 適用範圍:`frontend/`(Nuxt 4)。根目錄靜態站(`pages/*.html` + `js/` + `partials/`)
> 於 R3 起凍結退場,由 `nuxt generate` 產物取代,不再雙邊同步(見 `docs/rebuild-plan.md` §4)。
> 盤點歷史與階段紀錄見 `rebuild-plan.md`,本文件只講「現在怎麼寫」。

---

## 1. 樣式放在哪裡(分層)

- `frontend/app/assets/css/themes/*.css` — **皮膚層,唯一 token 來源**。人類可讀 CSS 變數
  (`:root { --c-primary: ... }`);`win100.css` 是預設皮,`aurora.css` 是示範皮(同一組變數名、
  不同值,套用方式見該檔開頭註解)。新增皮膚 = 複製一份、改值、在 `nuxt.config.ts` 的
  `css: [...]` 陣列註冊。**改顏色只改這裡,不要去改 tailwind.config.ts 或元件。**
- `frontend/tailwind.config.ts` — 語意 token 名稱層(`primary`/`surface`/`ink`/`line`/...),
  值全部是 `rgb(var(--c-x) / <alpha-value>)`,讀上面皮膚層的變數。markup 用這裡的名稱
  (`bg-primary`、`text-ink-2`),不要用 Tailwind 內建色階(`gray-300`、`text-white` 等)——
  內建色階不會跟著換皮膚。
- `frontend/nuxt.config.ts` 的 `Win100` preset — PrimeVue styled 元件(Select/Dialog/
  Accordion/DatePicker/Tabs 等)的顏色來源,同樣讀皮膚層變數,不寫死 hex。
- `frontend/app/assets/css/main.css` 的 `@layer components` — 共用視覺一份定義多處套用
  (`.btn-primary`、`.input-ui`、`.card-ui`、`.record-table`... 等),值一律用 tailwind token
  (`@apply` 或 `theme()`),不得手寫 hex。少數「查無對應 token,保留原色」的裝飾性色碼已在
  各處註明是刻意例外。
- `frontend/app/**/*.vue` — 不用 `<style scoped>`(R2 已全站歸零);樣式一律用上述三層的
  token utility class。

## 2. 色彩代幣(唯一允許的顏色來源)

寫法慣例:皮膚層變數存 **「R G B」三個十進位數字**(不是 hex),因為 `tailwind.config.ts`
用 `rgb(var(--c-x) / <alpha-value>)` 包起來,這樣 `bg-primary/10`、`border-primary/25`
這類透明度寫法才能在建置期正確套用——直接存 hex 或 `var()` 字串會讓 Tailwind 無法對它做
透明度運算。新增色值一律用這個格式,禁止發明清單以外的新色值。

### 主色
- `--c-primary`(win100: `#98E7D2`)— 品牌 mint(強調、active、連結)
- `--c-primary-soft`(`#CBE8E4`)— 漸層起點
- `--g-primary` — **所有 CTA/選中態漸層固定 90deg soft→primary**,由上兩個變數組成
- `--c-primary-faint`(`#313E40`)— 選中底色(次要選中、hover 背景)
- `--c-on-primary`(`#0F1622`)— 漸層/主色上的文字(**不要用 gray-900/#111827/#0F172A,已淘汰**)
- `--c-accent`(`#AAE5D3`)— 區塊標題/註標綠(pm-title 等既有慣例)

### 面板(綠黑系)
- `--c-bg`(`#0F1419`)— 頁面底(`bg-surface-deep`)
- `--c-surface`(`#1A2128`)— 卡片/面板
- `--c-surface-2`(`#2A3138`)— 第二層面板
- `--c-border`(`#374151`)— 標準邊框(`border-line`;等值於 Tailwind 內建 `gray-700`,但**要用
  `border-line` 不要用 `border-gray-700`**,理由同上)
- `--c-border-soft`(`#1F2937`)— 卡片細邊框(`border-line-soft`;等值於 `gray-800`)
- `--c-disabled`(`#4B5563`)— 停用態底色(等值於 `gray-600`;目前只是原始變數,未接 Tailwind
  color 名稱,停用態實務上用 `surface-2`/`ink-4` 組合)

### 文字灰階(只有四階,不要新增)
- `--c-text`(`#FFFFFF`)— 主文字(`text-ink`;**不要用 `text-white`**)
- `--c-text-2`(`#D1D5DB`)— 次要文字(`text-ink-2`;等值 `gray-300`)
- `--c-text-3`(`#9CA3AF`)— 輔助文字(`text-ink-3`;等值 `gray-400`)
- `--c-text-4`(`#6B7280`)— placeholder/最弱(`text-ink-4`;等值 `gray-500`)

### 狀態/強調
- `--c-danger`(`#F87171`)— 錯誤/警示/LIVE 標籤(唯一的紅;**不要用 `red-400`/`red-600` 等
  Tailwind 內建紅**,已知等值:`red-400` = `--c-danger`)
- `--c-success`(`#4ADE80`)— 成功
- `--c-gold`(`#F0B24A`)— 金色強調(VIP、bind holder)

### 類別頁 hero 橫幅
- `--g-hero` — 全站唯一一條(`bg-g-hero` 工具類,取代舊 `.hero-band`),**不要再造新漸層**。

### 刻意保留的例外(不要「順手修正」,兩套皮膚共用同一組值)
- 銀行卡擬物卡面:`--c-card-face-1/2/3`、`--c-card-border` — 全站唯一保留的藍黑系,
  在皮膚層 `:root` 定義一次,`aurora.css` 不覆寫(跨皮膚固定)。
- 廠商卡純色底:`#161E2C` + 邊框 `#212B3D` — 使用者核可設計。
- 首頁各區塊交替底色、`AppBanner.vue` 各張輪播卡自己的 `accent`/`bg` 漸層 — 逐張設計值。
- 白底銀行下拉的內部淺灰(`#EEF0F2/#F1F3F5/#F5F7F9`)— 淺色元件內部值。
- 彈窗容器 `#1A2330` + 邊框 `#2A3441` — auth modal 既有慣例。
- `bg-black/NN` 系列 — 圖片遮罩/彈窗背景遮幕,中性色,不隨皮膚變動。

## 3. 字級階梯(7 階)

- `--fs-display: 30px` — 頁面大標(= `text-3xl`)
- `--fs-h1: 24px` — 區塊主標/彈窗標題/金額(= `text-2xl`)
- `--fs-h2: 18px` — 卡片標題(= `text-lg`)
- `--fs-body-lg: 16px` — 強調內文(= `text-base`)
- `--fs-body: 14px` — 內文(= `text-sm`)
- `--fs-caption: 12px` — 說明/標籤(= `text-xs`)
- `--fs-micro: 10px` — 徽章/角標(**9px 已淘汰,最小 10px**)

## 4. 字重(只有四階)

- `400` 內文 / `600` 次強調 / `700` 標題 / `800` 數值與 CTA
- **禁止** 500、900、1000、`font-medium`、`font-black`、`font-light`
- 800 用 Tailwind 內建 `font-extrabold`(舊 `.fw-800` 工具類已隨 `tokens.css` 移除)

## 5. 字距 / 行高(各三階)

- 字距:`0`(內文)/ `.06em`(小型標籤,`tracking-wide2`)/ `.12em`(卡號、金額等等寬感數字,`tracking-numeric`)
- 行高:`1`(按鈕/徽章/數值)/ `1.2`(標題)/ `1.5`(內文)

## 6. 共用元件規格(改規格 = 改所有副本)

### Back 按鈕(單一來源:`main.css` 的 `.btn-back`)
- 40px 高 pill、`border:1px solid` primary/25、底 `surface`、文字 `ink` 15px/800
- hover/focus:`--g-primary` 漸層底、文字 `surface-deep`、`translateY(-1px)` + mint 陰影
- 元件直接寫 `class="btn-back"`(或 `<UiButton variant="back">`),禁止自寫 idle/hover
- 出現規則:**只在第二層視圖**(廠商遊戲列表、promotion 詳情);頂層分類頁與會員頁**不放**頂部 Back

### Load More 按鈕(規格源頭:`main.css` 的 `.cms-load-more-button`)
- 外層 `.cms-load-more-wrap flex justify-center mt-8`;按鈕 `.cms-load-more-button px-8 py-3 rounded-lg`
- 底 `rgba(255,255,255,.05)`、邊 `rgba(255,255,255,.2)`、文字 `ink-2` 600
- hover:文字 `accent`(底色為既有慣例保留值,查無對應 token)
- 行為:每次 +12(遊戲卡)/ +8(賽事卡),最多 3 次後移除;只出現在 hot-games/slot/live/fish/mini-games/sport 的內容格,promotion 不放

### 會員彈窗(規格源頭:`MemberModal.vue`)
- 340px、圓角 22、底 `surface`、mint 漸層描邊(mask 技法)+ 漸層圓 icon
- 三種:success(勾)/ warning(驚嘆)/ confirm(問號,Yes/No)
- 按鈕:pill、`--g-primary`、文字 `on-primary` 800

### 廠商徽章(規格源頭:`VendorBrowser.vue` 的 `.vnd-provider-badge`)
- pill、primary/10 底、primary/30 邊、文字 `primary` 14px/800
- 標題列:`標題 26px/800 + 徽章`,**不用漸層大標/底線**

### 紀錄表格(規格源頭:`main.css` 的 `.record-table` + `RecordPage.vue`)
- 適用:betting/deposit/withdrawal/account record、profit-loss(五頁共用同一個元件)
- 對齊規則:文字靠左、數字靠右(tabular-nums)、狀態置中 — th 與 td 同對齊(`columnPt()`)
- 表頭:`thead tr` 一條 `--g-primary` 漸層,th 12px/800 大寫、字距 `tracking-wide2`
- 儲存格類別:`rec-mono`(編號)/`rec-strong`(主要文字)/`rec-dim`(時間等次要)/`text-success`/`text-danger`(±金額)
- 狀態膠囊 `.pill-ok`/`.pill-warn`/`.pill-bad`;膠囊內文字保留 Approved/Pending/Rejected 原字
- 篩選列 Confirm 呼叫 `useRecordsStore().refresh(recordKey)` 佔位 action(自動更新倒數歸零時也會呼叫同一個 action)

### 表單欄位錯誤(auth modal)
- 欄位紅框 `danger` + 下方 13px `danger` 訊息,聚焦第一個錯誤欄位
- 文案與會員區一致:密碼「Length must be 5-16 characters.」、「The two passwords do not match.」

## 7. 新增/修改樣式的規則

1. 顏色只能從 §2 清單選;需要新色 → 先更新 `themes/win100.css`(以及對應的 `aurora.css`)+ 本文件,再使用。
2. 字級/字重/字距/行高只能落在階梯上。
3. 一律用 tailwind.config 的語意 token class(`bg-primary`、`text-ink-2`...),**禁止** Tailwind
   內建色階(`gray-*`/`red-*`/`text-white` 等)與任意值色碼(`bg-[#...]`)——兩者都不會隨皮膚切換。
4. 共用元件(§6)改規格時,grep 所有副本一起改,不要只改一處。
5. 新頁面:會員區用 `layouts/member.vue` chrome,行銷區用 `layouts/default.vue`;不要在頁面裡重複貼 header/footer。
6. 主要區塊一律透過 `app/config/blocks.ts` 登錄、`BlockRenderer` 渲染,頁面本身只放 `SectionConfig` 陣列。

## 8. 上線前流程

1. `cd frontend && npm run build` 必須通過。
2. `npm run generate` 必須通過(46+ 條路由 prerender)。
3. 視覺改動:雙視口(mobile 390 / desktop 1280)截圖比對,兩套皮膚(win100 預設 + 至少一個示範皮)都要看過一次。
4. 换皮驗證:`/ui-kit` 右上角皮膚切換鈕,或 `document.documentElement.dataset.theme = 'aurora'`。
