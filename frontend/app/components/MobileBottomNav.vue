<script setup lang="ts">
// Browse 開會員選單左抽屜(與靜態版一致);右上漢堡才是行銷主選單
const memberMenuOpen = useState<boolean>('ui:memberMenuOpen', () => false);
const route = useRoute();
const activeClass = (path: string) =>
  route.path === path ? 'text-primary' : 'text-ink-3';
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-surface-deep border-t border-line-soft z-50">
    <div class="grid grid-cols-5 h-16">
      <button class="flex flex-col items-center justify-center gap-1 text-ink-3 transition-all" @click="memberMenuOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        <span class="text-xs">Browse</span>
      </button>
      <NuxtLink class="flex flex-col items-center justify-center gap-1 transition-all" :class="activeClass('/')" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house w-6 h-6"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        <span class="text-xs">Home</span>
      </NuxtLink>
      <NuxtLink class="flex flex-col items-center justify-center gap-1 transition-all" :class="activeClass('/deposit')" to="/deposit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line w-6 h-6"><path d="M12 17V3"></path><path d="m6 11 6 6 6-6"></path><path d="M19 21H5"></path></svg>
        <span class="text-xs">Deposit</span>
      </NuxtLink>
      <NuxtLink class="flex flex-col items-center justify-center gap-1 transition-all" :class="activeClass('/promotion')" to="/promotion">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-6 h-6"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
        <span class="text-xs">Promotion</span>
      </NuxtLink>
      <NuxtLink class="flex flex-col items-center justify-center gap-1 transition-all" :class="activeClass('/account')" to="/account">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-6 h-6"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span class="text-xs">Member</span>
      </NuxtLink>
    </div>
  </nav>
  <MemberMenuDrawer />
</template>
