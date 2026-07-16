<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

interface NavItem {
  label: string;
  to: string;
  icon: string;
  dropdown?: { label: string; tab: string }[];
}

const nav: NavItem[] = [
  { label: 'Home', to: '/', icon: 'house' },
  { label: 'Hot Games', to: '/hot-games', icon: 'flame' },
  { label: 'Sports', to: '/sport', icon: 'trophy', dropdown: [{ label: 'BTI', tab: 'BTI' }, { label: 'SABA', tab: 'SABA' }] },
  { label: 'Live', to: '/live', icon: 'video', dropdown: [{ label: 'Sexy', tab: 'Sexy' }, { label: 'Pragmatic Play', tab: 'Pragmatic Play' }, { label: 'Yeebet', tab: 'Yeebet' }] },
  { label: 'Slots', to: '/slot', icon: 'cherry' },
  { label: 'Fish', to: '/fish', icon: 'fish' },
  { label: 'Mini Games', to: '/mini-games', icon: 'gamepad2' },
  { label: 'Promotion', to: '/promotion', icon: 'gift' },
];

const mobileLinks = [
  { label: 'Home', to: '/', icon: 'house' },
  { label: 'Hot Games', to: '/hot-games', icon: 'flame' },
  { label: 'Sports', to: '/sport', icon: 'trophy' },
  { label: 'Live', to: '/live', icon: 'video' },
  { label: 'Slots', to: '/slot', icon: 'cherry' },
  { label: 'Fish', to: '/fish', icon: 'fish' },
  { label: 'Mini Games', to: '/mini-games', icon: 'gamepad2' },
  { label: 'Promotion', to: '/promotion', icon: 'gift' },
];

const route = useRoute();
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to));

const { loggedIn, open: openAuth, logout } = useAuth();

// language dropdown (EN / 한국어)
const langs = [
  { code: 'EN', label: 'English' },
  { code: '한국어', label: '한국어' },
];
const lang = useState<string>('ui:lang', () => 'EN');
const langOpen = ref(false);

const base = 'px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap';
const activeCls = 'text-on-primary bg-g-primary shadow-md font-semibold';
const inactiveCls = 'text-ink-2 hover:text-on-primary hover:bg-g-primary';

// hover dropdowns
const openDd = ref<string | null>(null);
let ddTimer: ReturnType<typeof setTimeout> | null = null;
const showDd = (label: string) => { if (ddTimer) clearTimeout(ddTimer); openDd.value = label; };
const hideDd = () => { ddTimer = setTimeout(() => { openDd.value = null; }, 160); };

// mobile slide-in menu
const mobileOpen = useState<boolean>('ui:mobileMenuOpen', () => false);
</script>

<template>
  <header class="bg-surface border-b border-line-soft sticky top-0 z-50">
    <!-- desktop -->
    <div class="hidden md:flex items-stretch container mx-auto px-4">
      <NuxtLink class="flex items-center pr-6 flex-shrink-0" to="/">
        <img :src="withBase('/logo.png')" alt="Casino Logo" class="h-10 mix-blend-lighten">
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <div class="flex items-center justify-end gap-3 py-2 text-sm min-h-[44px]">
          <template v-if="loggedIn">
            <NuxtLink to="/account" class="flex text-ink-2 hover:text-ink transition-colors" aria-label="Account">
              <AppIcon name="user" class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink
              to="/account"
              class="flex items-center gap-3 text-ink-2 hover:text-ink transition-colors whitespace-nowrap"
            >
              <span class="text-ink-2 font-semibold">ID:</span>
              <span class="text-ink font-semibold">meqomcao</span>
              <span class="bg-g-primary text-on-primary text-sm font-bold px-3 py-1 rounded-full leading-none">VIP1</span>
            </NuxtLink>
            <span class="h-5 w-px bg-line"></span>
            <NuxtLink to="/account" class="flex items-center gap-2 whitespace-nowrap hover:opacity-90 transition-opacity">
              <span class="text-ink-3 font-semibold">Balance:</span>
              <span class="text-ink font-bold">₩1,000,000,000</span>
              <span class="text-ink-3 font-semibold ml-2">Points:</span>
              <span class="text-ink font-bold">0.00</span>
            </NuxtLink>
            <button class="flex text-ink-2 hover:text-ink transition-colors" aria-label="Logout" title="Logout" @click="logout">
              <AppIcon name="log-out" class="w-5 h-5" />
            </button>
          </template>
          <template v-else>
            <button class="bg-surface-2 text-ink px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity" @click="openAuth('login')">Login</button>
            <button class="bg-g-primary text-on-primary px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-semibold" @click="openAuth('register')">Register</button>
          </template>
          <SkinSwitcher />
          <div class="relative">
            <button class="text-ink-2 hover:text-ink flex items-center gap-1" @click="langOpen = !langOpen">
              <AppIcon name="globe" class="w-4 h-4" /><span>{{ lang }}</span><AppIcon name="chevron-down" class="w-3 h-3" />
            </button>
            <div v-if="langOpen" class="fixed inset-0 z-[999]" @click="langOpen = false"></div>
            <div
              v-if="langOpen"
              class="dd-panel right-0"
            >
              <div
                v-for="l in langs" :key="l.code"
                class="rounded-md cursor-pointer px-3.5 py-2.5 text-sm whitespace-nowrap hover:bg-surface-deep"
                :class="lang === l.code ? 'text-primary font-bold' : 'text-ink-2 font-normal'"
                @click="lang = l.code; langOpen = false"
              >{{ l.label }}</div>
            </div>
          </div>
        </div>
        <nav class="flex items-center justify-end gap-1.5 py-1.5 border-t border-line-soft text-sm relative">
          <template v-for="item in nav" :key="item.to">
            <div v-if="item.dropdown" class="relative" @mouseenter="showDd(item.label)" @mouseleave="hideDd">
              <NuxtLink :to="item.to" :class="[base, isActive(item.to) ? activeCls : inactiveCls]">
                <AppIcon :name="item.icon" class="w-3.5 h-3.5" />
                <span>{{ item.label }}</span>
                <AppIcon name="chevron-down" class="w-3 h-3" />
              </NuxtLink>
              <div
                v-show="openDd === item.label"
                class="dd-panel left-0 min-w-[160px]"
                @mouseenter="showDd(item.label)" @mouseleave="hideDd"
              >
                <NuxtLink
                  v-for="d in item.dropdown" :key="d.tab"
                  :to="{ path: item.to, query: { tab: d.tab } }"
                  class="rounded-md cursor-pointer block px-3.5 py-2.5 text-sm text-ink-2 hover:bg-surface-deep"
                  style="text-decoration:none"
                >{{ d.label }}</NuxtLink>
              </div>
            </div>
            <NuxtLink v-else :to="item.to" :class="[base, isActive(item.to) ? activeCls : inactiveCls]">
              <AppIcon :name="item.icon" class="w-3.5 h-3.5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </nav>
      </div>
    </div>

    <!-- mobile -->
    <div class="flex md:hidden items-center justify-between h-16 px-4">
      <NuxtLink class="whitespace-nowrap flex-shrink-0" to="/">
        <img :src="withBase('/logo.png')" alt="Casino Logo" class="h-10 mix-blend-lighten">
      </NuxtLink>
      <div class="flex items-center gap-3">
        <SkinSwitcher />
        <div class="relative">
          <button class="text-ink-2 hover:text-ink flex items-center gap-1" @click="langOpen = !langOpen">
            <AppIcon name="globe" class="w-5 h-5" /><span>{{ lang }}</span><AppIcon name="chevron-down" class="w-3 h-3" />
          </button>
          <div v-if="langOpen" class="fixed inset-0 z-[999]" @click="langOpen = false"></div>
          <div
            v-if="langOpen"
            class="dd-panel right-0"
          >
            <div
              v-for="l in langs" :key="l.code"
              class="rounded-md cursor-pointer px-3.5 py-2.5 text-sm whitespace-nowrap hover:bg-surface-deep"
              :class="lang === l.code ? 'text-primary font-bold' : 'text-ink-2 font-normal'"
              @click="lang = l.code; langOpen = false"
            >{{ l.label }}</div>
          </div>
        </div>
        <button class="text-ink-2 hover:text-ink" aria-label="Menu" @click="mobileOpen = true">
          <AppIcon name="menu" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- mobile slide-in menu -->
    <Teleport to="body">
      <div v-if="mobileOpen" class="fixed inset-0 z-[10001]" style="background:rgba(0,0,0,.6)" @click.self="mobileOpen = false">
        <div class="absolute inset-0 flex flex-col overflow-hidden bg-surface pb-16">
          <div class="flex justify-between items-center h-[76px] min-[400px]:h-[92px] px-6 border-b border-line-soft flex-shrink-0">
            <img :src="withBase('/logo.png')" alt="Casino Logo" class="h-12 mix-blend-lighten">
            <button class="text-ink-2 hover:text-ink" aria-label="Close menu" @click="mobileOpen = false">
              <AppIcon name="x" class="w-7 h-7" />
            </button>
          </div>
          <nav class="grid flex-1 min-h-0 py-2" :style="{ gridTemplateRows: `repeat(${mobileLinks.length}, minmax(0, 1fr))` }">
            <NuxtLink
              v-for="m in mobileLinks" :key="m.to" :to="m.to"
              class="mx-6 min-h-0 flex items-center gap-4 rounded-xl px-6 text-[17px] min-[400px]:text-[20px] font-semibold transition-colors"
              :class="isActive(m.to) ? 'bg-g-primary text-on-primary' : 'text-ink-2 hover:text-ink'"
              style="text-decoration:none"
              @click="mobileOpen = false"
            >
              <AppIcon :name="m.icon" class="w-6 h-6 flex-shrink-0" />
              <span>{{ m.label }}</span>
            </NuxtLink>
          </nav>
          <div class="mx-6 py-3 border-t border-line flex-shrink-0">
            <template v-if="loggedIn">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-full bg-g-primary text-on-primary flex items-center justify-center flex-shrink-0">
                  <AppIcon name="user" class="w-7 h-7" />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-3">
                    <span class="text-ink text-lg min-[400px]:text-xl font-bold truncate">meqomcao</span>
                    <span class="bg-g-primary text-on-primary text-xs min-[400px]:text-sm font-bold px-2.5 py-1 rounded-full leading-none">VIP1</span>
                  </div>
                  <div class="mt-1 text-sm min-[400px]:text-base font-semibold whitespace-nowrap">
                    <span class="text-ink-3">Balance: </span>
                    <span class="text-primary">₩1,000,000,000</span>
                  </div>
                  <div class="text-sm min-[400px]:text-base font-semibold">
                    <span class="text-ink-3">Points: </span>
                    <span class="text-primary">0.00</span>
                  </div>
                </div>
              </div>
              <NuxtLink
                to="/account"
                class="mt-3 block text-center rounded-lg bg-g-primary text-on-primary text-sm font-bold"
                style="padding:10px 18px;text-decoration:none"
                @click="mobileOpen = false"
              >View Account</NuxtLink>
            </template>
            <div v-else>
              <button style="display:block;width:100%;text-align:left;padding:12px 14px;background:none;border:0;color:#fff;cursor:pointer;font-weight:600;font-size:15px" @click="mobileOpen = false; openAuth('login')">Login</button>
              <button class="btn-primary w-full" style="padding:12px 14px;font-size:15px;margin-top:4px" @click="mobileOpen = false; openAuth('register')">Register</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <AuthModal />
  </header>
</template>
