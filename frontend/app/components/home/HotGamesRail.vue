<script setup lang="ts">
import { ref } from 'vue'
const track = ref<HTMLElement | null>(null)
</script>

<template>
  <section class="py-6 bg-[#0f1419]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame w-5 h-5 text-orange-400">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z">
            </path>
          </svg>
          <span class="text-base md:text-lg">Hot Games</span>
        </h2>
        <div class="flex items-center gap-2">
          <a class="text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors" href="/hot-games">Show all</a>
          <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors" @click="track?.scrollBy({ left: -300, behavior: 'smooth' })">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-4 h-4">
              <path d="m15 18-6-6 6-6">
              </path>
            </svg>
          </button>
          <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors" @click="track?.scrollBy({ left: 300, behavior: 'smooth' })">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-4 h-4">
              <path d="m9 18 6-6-6-6">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div ref="track" class="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1606167668584-78701c57f13d__w-300_h-400_fit-crop" alt="Mega Fortune" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.2</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Mega Fortune</p>
            <p class="text-gray-500 text-[10px] truncate">Pocket Play</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1596838132731-3301c3fd4317__w-300_h-400_fit-crop" alt="Starburst" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.5</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Starburst</p>
            <p class="text-gray-500 text-[10px] truncate">NetEnt</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1511512578047-dfb367046420__w-300_h-400_fit-crop" alt="Book of Dead" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 2.0</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Book of Dead</p>
            <p class="text-gray-500 text-[10px] truncate">Play'n GO</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1553481187-be93c21490a9__w-300_h-400_fit-crop" alt="Gonzo Quest" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.8</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Gonzo Quest</p>
            <p class="text-gray-500 text-[10px] truncate">NetEnt</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1478720568477-152d9b164e26__w-300_h-400_fit-crop" alt="Gates of Olympus" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.3</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Gates of Olympus</p>
            <p class="text-gray-500 text-[10px] truncate">Pragmatic</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1518895312237-a9e23508077d__w-300_h-400_fit-crop" alt="Dead or Alive" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.6</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Dead or Alive</p>
            <p class="text-gray-500 text-[10px] truncate">NetEnt</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-300_h-400_fit-crop" alt="Limbo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.4</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Limbo</p>
            <p class="text-gray-500 text-[10px] truncate">Pocket Play</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1524985069026-dd778a71c7b4__w-300_h-400_fit-crop" alt="Aladdin" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.9</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Aladdin</p>
            <p class="text-gray-500 text-[10px] truncate">Pocket Play</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-300_h-400_fit-crop" alt="Wolf Gold" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.5</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Wolf Gold</p>
            <p class="text-gray-500 text-[10px] truncate">Pragmatic</p>
          </div>
        </div>
        <div class="flex-shrink-0 w-[130px] md:w-[150px] snap-start cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-[#1a2128]" style="height: 170px;">
            <img src="/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-300_h-400_fit-crop" alt="Crazy Time" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">BONUS 1.7</div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-white text-xs truncate">Crazy Time</p>
            <p class="text-gray-500 text-[10px] truncate">Evolution</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
