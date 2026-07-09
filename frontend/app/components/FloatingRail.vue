<script setup lang="ts">
// 右側浮動快捷列 (Promo Channel / Live Chat / FAQ) — 對應靜態站 js/widgets.js
const items = [
  { label: 'Promo Channel', icon: 'logo', to: '/promotion' },
  { label: 'Live Chat', icon: 'send', to: '/support' },
  { label: 'FAQ', icon: 'help', to: '/support' },
];
</script>

<template>
  <div id="qr-rail">
    <NuxtLink v-for="it in items" :key="it.label" class="qr-btn" :to="it.to" :aria-label="it.label">
      <img v-if="it.icon === 'logo'" src="/logo.png" alt="">
      <svg v-else-if="it.icon === 'send'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      <span class="qr-label">{{ it.label }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
#qr-rail{position:fixed;right:14px;top:50%;transform:translateY(-58%);z-index:9000;display:flex;flex-direction:column;align-items:center;gap:14px;padding:12px 8px;border-radius:44px;background:rgba(20,28,36,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08);box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:.5;transition:opacity .2s ease}
#qr-rail:hover,#qr-rail:focus-within{opacity:1}
.qr-btn{position:relative;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#12233a;color:#cbe8e4;box-shadow:0 6px 18px rgba(0,0,0,.35);transition:transform .15s ease,background .15s ease;text-decoration:none}
.qr-btn:hover{transform:scale(1.06);background:#17304d}
.qr-btn img{width:40px;height:40px;object-fit:contain}
.qr-btn svg{width:26px;height:26px}
.qr-label{position:absolute;right:calc(100% + 14px);top:50%;transform:translateY(-50%) translateX(10px);white-space:nowrap;background:#0f141a;color:#fff;font-weight:700;font-size:16px;padding:12px 22px;border-radius:14px;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;box-shadow:0 10px 28px rgba(0,0,0,.45)}
.qr-btn:hover .qr-label,.qr-btn:focus-visible .qr-label{opacity:1;transform:translateY(-50%) translateX(0)}
@media(max-width:768px){#qr-rail{right:10px;gap:12px;padding:9px 6px}.qr-btn{width:48px;height:48px}.qr-btn img{width:34px;height:34px}.qr-btn svg{width:22px;height:22px}.qr-label{font-size:14px;padding:10px 16px}}
</style>
