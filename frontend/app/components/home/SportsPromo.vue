<template>
  <section class="py-6 bg-[#0f1419]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-5 h-5 text-[#98E7D2]">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6">
            </path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18">
            </path>
            <path d="M4 22h16">
            </path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22">
            </path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22">
            </path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z">
            </path>
          </svg>
          <span class="text-base md:text-lg">Live Sport</span>
        </h2>
        <div class="flex items-center gap-2">
          <a class="text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors flex items-center gap-1.5" href="/sport">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-3 h-3 text-[#98E7D2]">
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
              </path>
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
              </path>
              <circle cx="12" cy="12" r="2">
              </circle>
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
              </path>
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
              </path>
            </svg>View All Live</a>
          <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-4 h-4">
              <path d="m15 18-6-6 6-6">
              </path>
            </svg>
          </button>
          <button class="text-gray-400 hover:text-white p-1.5 border border-gray-700 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-4 h-4">
              <path d="m9 18 6-6-6-6">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div class="relative rounded-xl overflow-hidden mb-4" style="background: linear-gradient(135deg, rgb(10, 32, 16) 0%, rgb(20, 53, 32) 30%, rgb(26, 74, 40) 60%, rgb(15, 42, 24) 100%); min-height: 160px;">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, rgba(185, 222, 90, 0.4) 1px, transparent 1px); background-size: 20px 20px;">
        </div>
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-4 h-4 text-gray-900">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6">
              </path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18">
              </path>
              <path d="M4 22h16">
              </path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22">
              </path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22">
              </path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z">
              </path>
            </svg>
          </div>
          <div>
            <p class="text-[#98E7D2] text-xs font-semibold">UEFA</p>
            <p class="text-gray-400 text-[10px]">World Cup</p>
          </div>
        </div>
        <div class="relative flex flex-col md:flex-row items-center justify-center md:justify-between px-6 py-10 gap-4">
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-xs tracking-widest uppercase mb-1">The World's Biggest Event</p>
            <h3 class="text-white text-2xl md:text-4xl mb-1" style="font-weight: 900;">FIFA WORLD CUP</h3>
            <p class="text-[#98E7D2] text-xl md:text-2xl mb-3" style="font-weight: 700;">2026</p>
            <div class="inline-block bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-1.5 rounded">
              <span class="text-xs font-semibold">Prize Pool:&nbsp;</span>
              <span class="text-sm font-bold">RM 4,700,000</span>
            </div>
          </div>
          <div class="hidden md:block opacity-40">
            <svg width="100" height="120" viewBox="0 0 120 140" fill="none">
              <path d="M30 10 h60 v50 a30 30 0 0 1 -60 0 Z" fill="none" stroke="#B9DE5A" stroke-width="3">
              </path>
              <rect x="45" y="90" width="30" height="25" fill="#B9DE5A" opacity="0.6">
              </rect>
              <rect x="30" y="115" width="60" height="8" rx="4" fill="#B9DE5A" opacity="0.8">
              </rect>
              <path d="M10 10 h20 v30 a20 20 0 0 1 -20 0 Z" fill="none" stroke="#B9DE5A" stroke-width="2">
              </path>
              <path d="M90 10 h20 v30 a20 20 0 0 1 -20 0 Z" fill="none" stroke="#B9DE5A" stroke-width="2">
              </path>
            </svg>
          </div>
        </div>
      </div>
      <div class="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">Premier League</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">MU</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Manchester United</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">2 - 1</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 67'</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">LIV</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Liverpool</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">NBA</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">LAL</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Lakers</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">98 - 105</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live Q3</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">GSW</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Warriors</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">La Liga</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">RMA</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Real Madrid</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">1 - 1</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 82'</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">FCB</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Barcelona</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">MLB</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">NYY</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Yankees</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">4 - 3</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 7th</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">BOS</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Red Sox</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">Champions League</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">PSG</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">PSG</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">3 - 2</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 55'</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">FCB</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Bayern Munich</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">NBA</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">BOS</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Celtics</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">102 - 99</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live Q4</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">MIA</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Heat</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">Premier League</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">ARS</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Arsenal</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">1 - 0</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 78'</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">CHE</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Chelsea</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
        <div class="flex-shrink-0 snap-start cursor-pointer bg-[#1a2128] border border-gray-800 rounded-xl hover:border-[#98E7D2] transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-gray-500 text-[10px] truncate max-w-[120px]">Serie A</span>
              <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">JUV</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Juventus</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-[#98E7D2] text-xl font-bold leading-none">0 - 0</div>
                <div class="text-gray-500 text-[10px] mt-0.5">Live 23'</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-[#0f1419] border border-gray-700 flex items-center justify-center">
                  <span class="text-[9px] text-gray-300 font-semibold">INT</span>
                </div>
                <span class="text-white text-[10px] text-center leading-tight">Inter Milan</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Place Bet</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
