<script setup lang="ts">
definePageMeta({ layout: false });
/**
 * UI Kit 視驗頁:基礎元件層(components/ui/*)展示 + 區塊變體型錄。
 * 工程師以此頁確認元件外觀與 API;所有樣式來自 theme token,
 * 本頁不含任何自訂色碼。皮膚清單自動掃 themes/*.css。
 */
import { BLOCKS, type BlockKey } from '~/config/blocks';
import { THEME_KEYS } from '~/utils/themes';

const inputText = ref('');
const invalidText = ref('內容有誤的狀態');
const selectValue = ref<string | undefined>(undefined);
const selectOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];
const dialogOpen = ref(false);
const tab = ref('one');

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
  { title: 'Accordion item one', content: 'Placeholder answer — implementation skipped by spec.' },
  { title: 'Accordion item two', content: 'Placeholder answer — implementation skipped by spec.' },
];

/** 皮膚驗證:即時切換,證明「改一支 theme 檔 = 整站換皮」 */
const siteStore = useSiteStore();

/** 變體型錄:每區塊目前選中的 variant key(缺省 v1) */
const variantPick = reactive<Record<string, string>>({});
/** 需要 props 的區塊在型錄中的示範值(starter 範例區塊皆吃 content store,無需 props) */
const VARIANT_DEMO_PROPS: Partial<Record<BlockKey, Record<string, unknown>>> = {};
</script>

<template>
  <div class="min-h-screen bg-surface-deep">
  <div class="container mx-auto max-w-5xl space-y-6 px-4 py-8">
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-display font-bold text-ink">UI Kit</h1>
        <p class="mt-1 text-body text-ink-3">
          基礎元件層視驗頁 — 元件位於 <code class="text-primary">app/components/ui/</code>,
          樣式規則位於 <code class="text-primary">assets/css/main.css</code> 與皮膚 preset。
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-2 rounded-ui border border-line-soft bg-surface p-1">
        <button
          v-for="k in THEME_KEYS" :key="k" type="button"
          class="rounded-ui px-3 py-1.5 text-note font-semibold transition-colors"
          :class="siteStore.skin === k ? 'bg-g-primary text-on-primary' : 'text-ink-3 hover:text-ink'"
          @click="siteStore.setSkin(k)"
        >{{ k }}</button>
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
      </div>
    </UiCard>

    <!-- UiInput / UiSelect -->
    <UiCard title="UiInput / UiSelect">
      <div class="grid gap-3 md:grid-cols-3">
        <UiInput v-model="inputText" placeholder="Placeholder" />
        <UiInput v-model="invalidText" invalid />
        <UiSelect v-model="selectValue" :options="selectOptions" option-label="label" option-value="value" placeholder="Select…" />
      </div>
    </UiCard>

    <!-- UiDialog / UiTag / UiTabs / UiAccordion -->
    <UiCard title="UiDialog / UiTag / UiTabs / UiAccordion">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <UiButton label="Open dialog" variant="ghost" @click="dialogOpen = true" />
        <UiTag label="Success" status="ok" />
        <UiTag label="Processing" status="warn" />
        <UiTag label="Failed" status="bad" />
        <UiTag label="Neutral" />
      </div>
      <UiDialog v-model:visible="dialogOpen" header="Confirm action">
        <p class="text-body text-ink-2">彈窗內容示意。底色/圓角/遮罩皆由皮膚 preset 控制。</p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UiButton label="Cancel" variant="ghost" size="sm" @click="dialogOpen = false" />
            <UiButton label="Confirm" size="sm" @click="dialogOpen = false" />
          </div>
        </template>
      </UiDialog>
      <UiTabs
        v-model="tab"
        :tabs="[
          { label: 'Tab one', value: 'one' },
          { label: 'Tab two', value: 'two' },
        ]"
      >
        <template #one><p class="text-body text-ink-2">Panel one。</p></template>
        <template #two><p class="text-body text-ink-2">Panel two。</p></template>
      </UiTabs>
      <div class="mt-4">
        <UiAccordion :items="faqItems" />
      </div>
    </UiCard>

    <!-- ======== 區塊變體型錄 ======== -->
    <header class="pt-8">
      <h2 class="text-h1 font-bold text-ink">區塊變體型錄</h2>
      <p class="mt-1 text-body text-ink-3">
        登錄表 <code class="text-primary">app/config/blocks.ts</code> — 每個區塊的變體吃同一份內容
        (content store / props)與同一套皮膚,只換版面。選擇變體即時渲染於下方。
      </p>
    </header>

    <UiCard v-for="(def, key) in BLOCKS" :key="key" :title="`${def.label}(${key})`">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <button
          v-for="(comp, vk) in def.variants" :key="vk" type="button"
          class="rounded-ui border px-3 py-1.5 text-note font-semibold transition-colors"
          :class="(variantPick[key] ?? 'v1') === vk
            ? 'border-transparent bg-g-primary text-on-primary'
            : 'border-line-soft bg-surface-deep text-ink-3 hover:text-ink'"
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
