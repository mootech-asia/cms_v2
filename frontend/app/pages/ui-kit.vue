<script setup lang="ts">
definePageMeta({ layout: false });
/**
 * UI Kit 視驗頁:基礎元件層(components/ui/*)全數展示。
 * 工程師以此頁確認元件外觀與 API;所有樣式來自 theme token,
 * 本頁不含任何自訂色碼。
 */
const inputText = ref('')
const invalidText = ref('內容有誤的狀態')
const selectValue = ref<string | undefined>(undefined)
const selectOptions = [
  { label: 'Deposit', value: 'deposit' },
  { label: 'Withdrawal', value: 'withdrawal' },
  { label: 'Transfer', value: 'transfer' },
]
const dateValue = ref<Date | null>(null)
const rangeValue = ref<Date[] | null>(null)
const dialogOpen = ref(false)
const tab = ref('all')

const colorTokens = [
  { name: 'primary', cls: 'bg-primary' },
  { name: 'primary-soft', cls: 'bg-primary-soft' },
  { name: 'accent', cls: 'bg-accent' },
  { name: 'surface-deep', cls: 'bg-surface-deep' },
  { name: 'surface', cls: 'bg-surface' },
  { name: 'surface-2', cls: 'bg-surface-2' },
  { name: 'line', cls: 'bg-line' },
  { name: 'gold', cls: 'bg-gold' },
  { name: 'success', cls: 'bg-success' },
  { name: 'danger', cls: 'bg-danger' },
]

const faqItems = [
  { title: 'How do I deposit?', content: 'Placeholder answer — implementation skipped by spec (1-B.3).' },
  { title: 'How long does withdrawal take?', content: 'Placeholder answer — implementation skipped by spec (1-B.3).' },
]

/** R3 皮膚驗證:即時切換 app/assets/css/themes/*.css,證明「改一支 theme 檔 = 整站換皮」 */
const siteStore = useSiteStore()
/** 清單自動掃 themes/*.css;顯示業主命名(utils/themes.ts THEME_LABELS) */
import { THEME_KEYS, themeLabel } from '~/utils/themes'
const skins = THEME_KEYS.map((key) => ({ key, label: themeLabel(key) }))

/** R4 變體型錄:每區塊目前選中的 variant key(缺省 v1) */
import { BLOCKS, type BlockKey } from '~/config/blocks'
const variantPick = reactive<Record<string, string>>({})
/** 需要 props 的區塊在型錄中的示範值 */
const VARIANT_DEMO_PROPS: Partial<Record<BlockKey, Record<string, unknown>>> = {
  'category-hero': { title: 'HOT GAMES' },
  'member-card': { bank: 'KB Bank', accountTail: '＊＊＊＊1234', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-08-14' },
}
</script>

<template>
  <div class="min-h-screen bg-surface-deep">
  <div class="mx-auto max-w-5xl space-y-8 px-4 pb-16 pt-8">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-h1 font-bold text-ink">UI Kit</h1>
        <p class="mt-1 text-body text-ink-3">
          基礎元件層視驗頁 — 元件位於 <code class="text-primary">app/components/ui/</code>,
          樣式規則位於 <code class="text-primary">assets/css/main.css</code> 與 Win100 preset。
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-2 rounded-ui border border-line-soft bg-surface p-1">
        <button
          v-for="s in skins" :key="s.key" type="button"
          class="seg-btn border-0 bg-transparent"
          :class="{ active: siteStore.skin === s.key }"
          @click="siteStore.setSkin(s.key)"
        >{{ s.label }}</button>
      </div>
    </header>

    <!-- Theme tokens -->
    <UiCard title="Theme tokens(tailwind.config.ts)">
      <div class="grid grid-cols-5 gap-3">
        <div v-for="c in colorTokens" :key="c.name" class="text-center">
          <div class="h-12 w-full rounded-lg border border-line-soft" :class="c.cls" />
          <div class="mt-1 text-note text-ink-3">{{ c.name }}</div>
        </div>
      </div>
      <div class="mt-6 space-y-1">
        <p class="text-display text-ink">display 30px</p>
        <p class="text-h1 text-ink">h1 24px</p>
        <p class="text-h2 text-ink">h2 18px</p>
        <p class="text-body-lg text-ink-2">body-lg 16px</p>
        <p class="text-body text-ink-2">body 14px</p>
        <p class="text-note text-ink-3">note 12px</p>
        <p class="text-micro tracking-wide2 text-ink-4">MICRO 10PX + WIDE2</p>
      </div>
    </UiCard>

    <!-- UiButton -->
    <UiCard title="UiButton">
      <div class="flex flex-wrap items-center gap-3">
        <UiButton label="Primary md" />
        <UiButton label="Primary sm" size="sm" />
        <UiButton label="Primary lg" size="lg" />
        <UiButton label="Disabled" disabled />
        <UiButton label="Loading" loading />
        <UiButton label="Ghost" variant="ghost" />
        <UiButton variant="back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
          <span>Back</span>
        </UiButton>
      </div>
      <p class="mt-3 text-note text-ink-4">variant: primary / ghost / back;size: sm / md / lg(back 固定尺寸)</p>
    </UiCard>

    <!-- UiInput -->
    <UiCard title="UiInput">
      <div class="grid gap-3 md:grid-cols-3">
        <UiInput v-model="inputText" placeholder="Placeholder" />
        <UiInput v-model="invalidText" invalid />
        <UiInput model-value="Disabled" disabled />
      </div>
    </UiCard>

    <!-- UiSelect / UiDatePicker -->
    <UiCard title="UiSelect / UiDatePicker">
      <div class="grid gap-3 md:grid-cols-3">
        <UiSelect v-model="selectValue" :options="selectOptions" option-label="label" option-value="value" placeholder="Transaction type" />
        <UiDatePicker v-model="dateValue" placeholder="Single date" />
        <UiDatePicker v-model="rangeValue" selection-mode="range" placeholder="Date range" />
      </div>
    </UiCard>

    <!-- UiDialog -->
    <UiCard title="UiDialog">
      <UiButton label="Open dialog" variant="ghost" @click="dialogOpen = true" />
      <UiDialog v-model:visible="dialogOpen" header="Confirm action">
        <p class="text-body text-ink-2">彈窗內容示意。底色/圓角/遮罩皆由 Win100 preset 控制。</p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UiButton label="Cancel" variant="ghost" size="sm" @click="dialogOpen = false" />
            <UiButton label="Confirm" size="sm" @click="dialogOpen = false" />
          </div>
        </template>
      </UiDialog>
    </UiCard>

    <!-- UiTag -->
    <UiCard title="UiTag">
      <div class="flex flex-wrap gap-2">
        <UiTag label="Success" status="ok" />
        <UiTag label="Processing" status="warn" />
        <UiTag label="Failed" status="bad" />
        <UiTag label="Neutral" />
      </div>
    </UiCard>

    <!-- UiTabs -->
    <UiCard title="UiTabs">
      <UiTabs
        v-model="tab"
        :tabs="[
          { label: 'All', value: 'all' },
          { label: 'Deposit', value: 'deposit' },
          { label: 'Withdrawal', value: 'withdrawal' },
        ]"
      >
        <template #all><p class="text-body text-ink-2">All records panel。</p></template>
        <template #deposit><p class="text-body text-ink-2">Deposit panel。</p></template>
        <template #withdrawal><p class="text-body text-ink-2">Withdrawal panel。</p></template>
      </UiTabs>
    </UiCard>

    <!-- UiAccordion -->
    <UiCard title="UiAccordion">
      <UiAccordion :items="faqItems" />
    </UiCard>

    <!-- SectionTitle / UiCard -->
    <UiCard title="UiSectionTitle / UiCard">
      <UiSectionTitle text="區塊標題(.section-title)" />
      <p class="mt-3 text-body text-ink-3">本頁每個區塊即 UiCard(title + padded)。</p>
    </UiCard>

    <!-- ======== 區塊變體型錄(R4) ======== -->
    <header class="pt-8">
      <h2 class="text-h1 font-bold text-ink">區塊變體型錄</h2>
      <p class="mt-1 text-body text-ink-3">
        登錄表 <code class="text-primary">app/config/blocks.ts</code> — 每個區塊的變體吃同一份內容
        (<code class="text-primary">config/mock/home.ts</code> / props)與同一套皮膚,只換版面。
        選擇變體即時渲染於下方(內容同首頁)。
      </p>
    </header>

    <UiCard v-for="(def, key) in BLOCKS" :key="key" :title="`${def.label}(${key})`">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <button
          v-for="(comp, vk) in def.variants" :key="vk" type="button"
          class="seg-btn"
          :class="{ active: (variantPick[key] ?? 'v1') === vk }"
          @click="variantPick[key] = vk"
        >{{ vk }}</button>
      </div>
      <div class="overflow-hidden rounded-xl border border-line-soft bg-surface-deep">
        <component :is="def.variants[variantPick[key] ?? 'v1']" v-bind="VARIANT_DEMO_PROPS[key]" />
      </div>
    </UiCard>
  </div>
  </div>
</template>
