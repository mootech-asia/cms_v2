<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';


const tabs = useContentStore().miniCategories;

const active = ref('mini');
const games = computed(() => tabs.find((t) => t.key === active.value)!.games);
const rail = ref<HTMLElement | null>(null);
const routes: Record<string, string> = Object.fromEntries(tabs.map((t) => [t.key, t.route]));
const mediaSrc = (src: string) => (/^(https?:)?\/\//.test(src) ? src : withBase(src));

const tabClass = (key: string) =>
  key === active.value
    ? 'text-ink'
    : 'text-ink-4 hover:text-ink-2';

async function selectTab(key: string) {
  active.value = key;
  await nextTick();
  rail.value?.scrollTo({ left: 0, behavior: 'auto' });
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
  <section class="py-12 bg-surface-deep">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="grid grid-cols-3 md:flex md:items-center md:gap-8">
            <button
              type="button"
              class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2"
              :class="tabClass('mini')"
              @click="selectTab('mini')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad2 w-5 h-5 md:w-4 md:h-4"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg>
              <span class="text-xs md:text-base">Mini Game</span>
              <div v-show="active === 'mini'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-line">
                <div class="h-full bg-g-primary"></div>
              </div>
            </button>
            <button
              type="button"
              class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2"
              :class="tabClass('slot')"
              @click="selectTab('slot')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cherry w-5 h-5 md:w-4 md:h-4"><path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"></path><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"></path></svg>
              <span class="text-xs md:text-base">Slot Game</span>
              <div v-show="active === 'slot'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-line">
                <div class="h-full bg-g-primary"></div>
              </div>
            </button>
            <button
              type="button"
              class="pb-2 transition-colors relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2"
              :class="tabClass('live')"
              @click="selectTab('live')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video w-5 h-5 md:w-4 md:h-4"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
              <span class="text-xs md:text-base">Live Game</span>
              <div v-show="active === 'live'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-line">
                <div class="h-full bg-g-primary"></div>
              </div>
            </button>
          </div>
          <div class="flex items-center justify-end gap-2">
            <NuxtLink class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors" :to="routes[active]">Show all</NuxtLink>
            <button type="button" aria-label="Previous games" class="text-ink-3 hover:text-ink p-1.5 border border-line rounded transition-colors" @click="moveRail(-1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-4 h-4"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <button type="button" aria-label="Next games" class="text-ink-3 hover:text-ink p-1.5 border border-line rounded transition-colors" @click="moveRail(1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-4 h-4"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-hidden">
        <div ref="rail" class="flex scroll-smooth overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-4 animate-slideIn">
          <div v-for="g in games" :key="g.title" data-game-card class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">
            <div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-line group-hover:border-primary transition-colors">
              <img :src="mediaSrc(g.img)" :alt="g.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" :style="{ objectPosition: g.focalPoint || 'center' }" loading="lazy">
            </div>
            <h3 class="text-ink text-xs md:text-sm text-center mt-2 truncate">{{ g.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
