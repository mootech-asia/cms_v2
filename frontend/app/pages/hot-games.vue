<template>
  <div class="min-h-screen bg-[#0f1419]" style="overflow-x: hidden;">
    <AppHeader />
    <div class="bg-gradient-to-r from-orange-600 via-pink-500 to-purple-600 py-16 md:py-20">
    <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-7xl text-white mb-4">HOT GAMES</h1>
    </div>
    </div>
    <VendorBrowser title="Hot Games" kind="hot-games" direct />
    <AppFooter />
    <MobileBottomNav />
  </div>
</template>
