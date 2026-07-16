<template>
  <div class="min-h-screen overflow-x-hidden bg-surface-deep">
    <MemberHeader />
    <div class="min-h-[calc(100vh-4rem)]">
      <MemberSidebar />
      <main class="min-w-0 p-4 pb-24 md:ml-64 md:p-8 md:pb-24">
        <slot />
      </main>
    </div>
    <MobileBottomNav />
  </div>
</template>
