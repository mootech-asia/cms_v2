<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

const tabs = useContentStore().miniCategories;
const active = ref(tabs[0]?.key ?? 'mini');
const rail = ref<HTMLElement | null>(null);
const tabButtons = ref<HTMLButtonElement[]>([]);

const tabIcons: Record<string, string> = {
  mini: 'gamepad2',
  slot: 'cherry',
  live: 'video',
};

const currentTab = computed(() => tabs.find((tab) => tab.key === active.value) ?? tabs[0]);
const games = computed(() => currentTab.value?.games ?? []);
const mediaSrc = (src: string) => (/^(https?:)?\/\//.test(src) ? src : withBase(src));

const tabClass = (key: string) =>
  key === active.value
    ? 'text-ink bg-primary/10 border-primary/30'
    : 'text-ink-4 border-transparent hover:border-line hover:bg-surface hover:text-ink-2';

async function selectTab(key: string, focus = false) {
  if (tabs.some((tab) => tab.key === key)) active.value = key;
  await nextTick();
  rail.value?.scrollTo({ left: 0, behavior: 'auto' });

  if (focus) {
    const index = tabs.findIndex((tab) => tab.key === key);
    tabButtons.value[index]?.focus();
  }
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  let nextIndex = index;
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = tabs.length - 1;
  else return;

  event.preventDefault();
  const nextTab = tabs[nextIndex];
  if (nextTab) selectTab(nextTab.key, true);
}

function moveRail(direction: -1 | 1) {
  const el = rail.value;
  if (!el) return;

  const card = el.querySelector<HTMLElement>('[data-game-card]');
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 12;
  const cardWidth = card?.offsetWidth || 128;
  const visibleCards = Math.max(1, Math.floor((el.clientWidth + gap) / (cardWidth + gap)));
  const jump = (cardWidth + gap) * visibleCards;
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  if (maxScroll <= 1) return;

  const target = direction > 0
    ? (el.scrollLeft >= maxScroll - 2 ? 0 : Math.min(maxScroll, el.scrollLeft + jump))
    : (el.scrollLeft <= 2 ? maxScroll : Math.max(0, el.scrollLeft - jump));

  el.scrollTo({ left: target, behavior: 'smooth' });
}
</script>

<template>
  <section class="bg-surface-deep py-12">
    <div class="container mx-auto px-4">
      <div class="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          class="grid grid-cols-3 gap-2 md:flex md:items-center"
          role="tablist"
          aria-label="Game categories"
        >
          <button
            v-for="(tab, index) in tabs"
            :id="`games-tab-${tab.key}`"
            :key="tab.key"
            :ref="(el) => { if (el) tabButtons[index] = el as HTMLButtonElement; }"
            type="button"
            role="tab"
            class="relative flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 font-semibold transition-colors md:min-w-32"
            :class="tabClass(tab.key)"
            :aria-selected="active === tab.key"
            :aria-controls="`games-panel-${tab.key}`"
            :tabindex="active === tab.key ? 0 : -1"
            @click="selectTab(tab.key)"
            @keydown="onTabKeydown($event, index)"
          >
            <AppIcon :name="tabIcons[tab.key] || 'gamepad2'" class="h-4 w-4 shrink-0" />
            <span class="text-xs md:text-sm">{{ tab.label }}</span>
            <span
              v-if="active === tab.key"
              aria-hidden="true"
              class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
            />
          </button>
        </div>

        <div class="flex items-center justify-end gap-2">
          <NuxtLink
            v-if="currentTab"
            class="rounded border border-line px-3 py-1.5 text-xs text-ink-3 transition-colors hover:border-primary hover:text-ink"
            :to="currentTab.route"
          >
            Show all
          </NuxtLink>
          <button type="button" aria-label="Previous games" class="rounded border border-line p-1.5 text-ink-3 transition-colors hover:border-primary hover:text-ink" @click="moveRail(-1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next games" class="rounded border border-line p-1.5 text-ink-3 transition-colors hover:border-primary hover:text-ink" @click="moveRail(1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div class="overflow-hidden">
        <div
          v-if="currentTab"
          :id="`games-panel-${currentTab.key}`"
          :key="currentTab.key"
          ref="rail"
          role="tabpanel"
          :aria-labelledby="`games-tab-${currentTab.key}`"
          class="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 animate-slideIn"
        >
          <div v-for="g in games" :key="g.title" data-game-card class="group w-28 flex-shrink-0 snap-start cursor-pointer md:w-32">
            <div class="h-28 w-28 overflow-hidden rounded-lg border-2 border-line transition-colors group-hover:border-primary md:h-32 md:w-32">
              <img :src="mediaSrc(g.img)" :alt="g.title" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" :style="{ objectPosition: g.focalPoint || 'center' }" loading="lazy">
            </div>
            <h3 class="mt-2 truncate text-center text-xs text-ink md:text-sm">{{ g.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
