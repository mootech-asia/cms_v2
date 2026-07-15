<script setup lang="ts">
// 底部導覽「Browse」開啟的會員選單左抽屜(對齊靜態版 js/mobile.js openMemberMenu)
const open = useState<boolean>('ui:memberMenuOpen', () => false);
const route = useRoute();

const links = [
  { label: 'Account Overview', to: '/account', icon: 'grid' },
  { label: 'Deposit', to: '/deposit', icon: 'download' },
  { label: 'Withdrawal', to: '/withdrawal', icon: 'upload' },
  { label: 'Betting Record', to: '/betting-record', icon: 'history' },
  { label: 'Deposit Record', to: '/deposit-record', icon: 'file' },
  { label: 'Profit And Loss', to: '/profit-loss', icon: 'trend' },
  { label: 'Withdrawal Record', to: '/withdrawal-record', icon: 'file' },
  { label: 'Account Record', to: '/account-record', icon: 'file' },
  { label: 'Personal Info', to: '/personal-info', icon: 'user' },
  { label: 'Security Center', to: '/security', icon: 'shield' },
  { label: 'Customer Service', to: '/support', icon: 'chat' },
] as const;

const isActive = (to: string) => route.path === to;
</script>

<template>
  <Teleport to="body">
    <Transition name="mmd">
      <div v-if="open" class="mmd-overlay" @click.self="open = false">
        <div class="mmd-panel">
          <div class="mmd-head">
            <span>Menu</span>
            <button type="button" aria-label="Close menu" @click="open = false">
              <AppIcon name="x" class="w-6 h-6" />
            </button>
          </div>
          <nav class="mmd-links" :style="{ gridTemplateRows: `repeat(${links.length}, minmax(0, 1fr))` }">
            <NuxtLink
              v-for="l in links" :key="l.to" :to="l.to"
              class="mmd-row" :class="{ active: isActive(l.to) }"
              @click="open = false"
            >
              <AppIcon :name="l.icon" class="mmd-icon" />
              <span>{{ l.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mmd-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.6);transition:background .2s}
.mmd-panel{position:absolute;top:0;left:0;bottom:0;width:86%;max-width:340px;border-right:1px solid #1f2937;background:#1a2128;overflow-y:hidden;overscroll-behavior:contain;box-shadow:0 0 24px rgba(0,0,0,.6);transition:transform .25s ease;display:flex;flex-direction:column;padding:clamp(10px,1.8dvh,16px) 14px}
.mmd-head{display:flex;align-items:center;justify-content:space-between;height:clamp(42px,6dvh,54px);flex-shrink:0}
.mmd-head span{color:#fff;font-weight:800;font-size:20px}
.mmd-head button{background:none;border:0;color:#d1d5db;cursor:pointer;padding:0;line-height:0}
.mmd-links{display:grid;flex:1;min-height:0}
.mmd-row{display:flex;align-items:center;gap:clamp(10px,2dvh,16px);min-height:0;padding:0 18px;border-radius:11px;text-decoration:none;font-size:clamp(15px,2.1dvh,18px);line-height:1.15;font-weight:700;cursor:pointer;margin:1px 0;color:#d1d5db}
.mmd-row.active{background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622}
.mmd-icon{width:22px;height:22px;flex:0 0 auto}
.mmd-enter-active,.mmd-leave-active{transition:background .2s}
.mmd-enter-active .mmd-panel,.mmd-leave-active .mmd-panel{transition:transform .25s ease}
.mmd-enter-from,.mmd-leave-to{background:rgba(0,0,0,0)}
.mmd-enter-from .mmd-panel,.mmd-leave-to .mmd-panel{transform:translateX(-100%)}
</style>
