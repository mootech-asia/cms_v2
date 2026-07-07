<script setup lang="ts">
import { ref } from 'vue';
const root = ref<HTMLElement | null>(null);
const { modal } = useGamesPage(root);
</script>

<template>
  <div ref="root" class="min-h-screen bg-[#0f1419]" style="overflow-x: hidden;">
    <AppHeader />
    <div class="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 py-16 md:py-20">
    <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-7xl text-white mb-4">100% <span class="block md:inline">MINI GAMES</span>
    </h1>
    </div>
    </div>
    <section class="py-8 bg-[#0f1419] min-h-screen">
    <div class="container mx-auto px-4">
    <div class="flex flex-col gap-6">
    <div class="flex items-center gap-6 border-b border-gray-800">
    <button class="pb-4 px-2 transition-colors relative text-[#98E7D2]">Vendor<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">
    </div>
    </button>
    <button class="pb-4 px-2 transition-colors relative text-gray-400 hover:text-gray-300">Favorites</button>
    </div>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <h2 class="text-white text-xl">Search Result</h2>
    <div class="flex items-center gap-3">
    <div class="relative flex-1 md:w-64">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
    <circle cx="11" cy="11" r="8">
    </circle>
    <path d="m21 21-4.3-4.3">
    </path>
    </svg>
    <input type="text" placeholder="Search Game" class="w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]">
    </div>
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel w-4 h-4">
    <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z">
    </path>
    </svg>
    <span class="hidden md:inline">Filter</span>
    </button>
    </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
    <div class="aspect-[4/3] relative overflow-hidden">
    <img src="/_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-400" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
    <button class="absolute top-2 right-2 z-10 focus:outline-none bg-black/50 rounded-full p-1.5 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5" style="color: rgb(255, 255, 255);">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    </div>
    <div class="p-4">
    <h3 class="text-white mb-1 truncate">Game Name</h3>
    <p class="text-gray-400 text-sm mb-3 truncate">Game Provider</p>
    <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
    </div>
    </div>
    </div>
    <div class="flex justify-center mt-4">
    <button class="px-8 py-3 rounded-lg transition-colors" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: rgb(209, 213, 219); font-weight: 500; cursor: pointer;">Load more</button>
    </div>
    </div>
    </div>
    </section>
    <AppFooter />
    <MobileBottomNav />
    <GamesGameModal :data="modal" @close="modal = null" />
  </div>
</template>
