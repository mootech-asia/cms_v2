# Template Starter(骨架範本)

依《模板開發規範》(`docs/template-guide.md`)起新模板的起點:
去內容、留骨架 — 皮膚層、Ui 元件層、config-driven 渲染、範例區塊與變體、
雙後台(/studio 設計師、/admin 客戶)全部可直接運行。

```bash
npm install
npm run dev      # http://localhost:3000
```

| 路由 | 用途 |
|---|---|
| `/` | config-driven 首頁(site store 的 sections 驅動) |
| `/ui-kit` | 元件視驗 + 區塊變體型錄 + 皮膚切換 |
| `/studio` | 設計後台:換膚/變體/排序/開關/即時預覽/匯出模板包 |
| `/admin` | 客戶後台:文案/卡片管理/開關排序/換膚(範圍由 `app/config/template.ts` 授權) |

## 起新模板的步驟(細節見規範 §9)

1. `app/assets/css/themes/base.css` 複製改名 → 調成品牌皮膚(只改值,不增刪變數)。
2. 依設計稿做區塊元件 + 3–5 變體(參考 `components/blocks/ExampleHero*` 的做法),
   登錄進 `app/config/blocks.ts`。
3. 內容種子放 `app/config/mock/`,接進 `stores/content.ts`;
   頁面 sections 組進 `stores/site.ts`。
4. `app/config/template.ts` 決定客戶可控範圍(皮膚白名單/鎖定區塊/可編輯內容)。
5. 出貨前跑規範 §8 驗收清單(build/generate/token 檢查/雙後台 e2e)。

**不要改壞的共用層**(全模板一致,升級走上游):
`components/ui/*`、`components/BlockRenderer.vue`、`utils/*`、
`pages/studio/*`、`pages/admin.vue` 的骨架邏輯。
