/**
 * WIN100 factory static site — behaviour-layer seed data.
 *
 * Ported verbatim (values copied, not referenced) from the frontend/ Vue source
 * so the vanilla JS behaviour layer (site.js) can rebuild markup that only
 * exists in the live Nuxt app's reactive state and was never present in the
 * prerendered static HTML (e.g. non-active carousel slides, non-active tab
 * panels, closed dropdown/modal contents).
 *
 * Sources (read-only references, nothing in frontend/ was modified):
 *   - frontend/app/config/mock/home.ts        (banners, miniGamesTabs, miniGamesImgs)
 *   - frontend/app/config/operational-media.ts (HOME/LIVE_CASINO/CATEGORY_VENDOR media)
 *   - frontend/app/composables/useLocale.ts    (zh copy — the site's default/baked locale)
 *   - frontend/app/components/VendorBrowser.vue (SLOT_VENDORS / LIVE_VENDORS / LIVE_GAME_NAMES)
 *   - frontend/app/components/AppIcon.vue      (icon path data)
 *   - frontend/app/pages/sport.vue             (MATCHES)
 *   - frontend/app/stores/bank.ts              (demo bound accounts)
 *   - frontend/app/pages/banking-details.vue   (DEMO_BANKS)
 *
 * Plain global script (no ESM, no fetch) — exposes window.WIN100_DATA.
 */
(function (window) {
  'use strict';

  function pexels(id) {
    return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=1920';
  }

  // ---- Skins (frontend/app/utils/themes.ts THEME_KEYS / THEME_LABELS) --------
  var THEME_KEYS = ['win100', 'aurora', 'noir', 'fashion-blue', 'rose-graphite', 'cyber-green'];
  var THEME_LABELS = {
    win100: 'Emerald',
    aurora: 'Aurora',
    noir: 'Noir Gold',
    'fashion-blue': 'Fashion Blue',
    'rose-graphite': 'Rose Graphite',
    'cyber-green': '電競綠黑',
  };

  // ---- Icons (frontend/app/components/AppIcon.vue) ---------------------------
  var ICONS = {
    globe: '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>',
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>',
    gamepad2: '<line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>',
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect>',
    fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"></path><path d="M18 12v.5"></path><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"></path><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"></path><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"></path><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"></path>',
    cherry: '<path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"></path><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"></path>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
    'chevron-down': '<path d="m6 9 6 6 6-6"></path>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>',
    grid: '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
    download: '<path d="M12 17V3"></path><path d="m6 11 6 6 6-6"></path><path d="M19 21H5"></path>',
    upload: '<path d="M12 21V7"></path><path d="m6 11 6-6 6 6"></path><path d="M5 3h14"></path>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>',
    trend: '<path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h4"></path>',
    bitcoin: '<circle cx="12" cy="12" r="9"></circle><path d="M9.5 8h3.8a2.2 2.2 0 0 1 0 4.4H9.5z"></path><path d="M9.5 12.4h4.2a2.3 2.3 0 0 1 0 4.6H9.5z"></path><path d="M9.5 6v12M11 4.5V6M14 4.5V6M11 18v1.5M14 18v1.5"></path>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle>',
    search: '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>',
    plus: '<path d="M12 5v14M5 12h14"></path>',
    check: '<path d="M20 6 9 17l-5-5"></path>',
    pencil: '<path d="M21.17 6.81a2.83 2.83 0 0 0-4-4L4 16l-1 5 5-1Z"></path><path d="m15 5 4 4"></path>',
    bank: '<rect x="2" y="7" width="16" height="11" rx="2"></rect><path d="M2 11h16"></path><circle cx="8" cy="14.5" r="1.4"></circle><path d="M18 9.5l3.6 1.5a1 1 0 0 1 .4 1.4l-2 3.4"></path>',
    'log-out': '<path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>',
    back: '<path d="m15 18-6-6 6-6"></path>',
  };

  // ---- zh copy actually baked into the static pages (frontend/app/composables/useLocale.ts) --
  var T = {
    back: '返回',
    playNow: '立即遊玩',
    loadMore: '載入更多',
    liveDealer: '真人荷官',
    liveStudio: '真人館',
    gamePlaceholder: '遊戲名稱',
    searchVendor: '廠商名稱',
    searchGame: '搜尋遊戲',
    home: '首頁',
    hotGames: '熱門遊戲',
    sports: '體育',
    live: '真人娛樂',
    slots: '老虎機',
    fish: '捕魚',
    miniGames: '迷你遊戲',
    promotion: '優惠活動',
    browse: '瀏覽',
    deposit: '儲值',
    member: '會員',
    login: '登入',
    register: '註冊',
    logout: '登出',
    accountView: '查看會員中心',
    accountBalance: '餘額',
    accountPoints: '點數',
    notAvailable: '此靜態預覽尚未包含此內容',
  };

  // ---- AppBanner (frontend/app/config/mock/home.ts + useLocale.ts bannerCopy.zh) ----
  // Order matches the source `banners` array (id 2, 4, 1, 3) — index 0 is what
  // the SSR snapshot shows by default (data-campaign="2").
  var BANNERS = [
    {
      id: 2, badge: '首存禮遇', title: '儲值狂熱', highlight: '100%',
      sub: '迎新加碼 · 快速出款 · 限時開放', cta: '立即儲值',
      img: pexels(32100316), focalPoint: '76% 28%',
    },
    {
      id: 4, badge: '2026 世界足球', title: '榮耀之路', highlight: '2026',
      sub: '即時賠率 · 賽事中心 · 每球必爭', cta: '查看賽事',
      img: pexels(30651230), focalPoint: '60% 52%',
    },
    {
      id: 1, badge: '電競週', title: '戰力升級', highlight: '30%',
      sub: '每週遊戲返水 · 限時開放', cta: '進入競技場',
      img: pexels(7862503), focalPoint: '68% 50%',
    },
    {
      id: 3, badge: '智慧錢包', title: 'USDT', highlight: '+8%',
      sub: '快速入金 · 安全結算 · 24/7 存取', cta: '立即儲值',
      img: pexels(36755611), focalPoint: '70% 48%',
    },
  ];

  // ---- MiniGamesGrid (homepage rail tabs) — frontend/app/stores/content.ts catalogSeed --
  // mini/slot share the same 6-file local image pool cycling by index;
  // live cycles the 6 Pexels "tables" media (identical pool VendorBrowser uses for kind=live).
  var MINI_IMG_POOL = [
    '_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-200',
    '_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-200',
    '_external/images.unsplash.com/photo-1604028296525-8304e1a4969f__w-200',
    '_external/images.unsplash.com/photo-1771775606196-70dccc0d9bde__w-200',
    '_external/images.unsplash.com/photo-1525018667593-176858caed6a__w-200',
    '_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-200',
  ];
  var LIVE_TABLES = [
    { image: pexels(7594348), focalPoint: '42% 50%' },
    { image: pexels(6664128), focalPoint: '50% 48%' },
    { image: pexels(7594254), focalPoint: '68% 48%' },
    { image: pexels(6664131), focalPoint: '50% 38%' },
    { image: pexels(7594310), focalPoint: '55% 40%' },
    { image: pexels(7594183), focalPoint: '50% 50%' },
  ];
  var MINI_NAMES = {
    mini: ['Mega Fortune', 'Starburst', 'Limbo', 'Mines', 'Plinko', 'Dice', 'Tower', 'Keno', 'Hilo', 'Wheel', 'Crash', 'Coin Flip', 'Rocket', 'Caves', 'Video Poker', 'Scratch Card', 'Aviator', 'Spaceman', 'JetX', 'Balloon', 'Penalty Shoot-out', 'Goal Rush', 'Cricket Crash', 'Zeppelin', 'Magic Keno', 'Turbo Mines', 'Royal Dice', 'Lucky Wheel', 'Neon Tower', 'Bomb Squad', 'Cave Dash', 'Gem Flip', 'Star Rocket', 'Hyper Plinko', 'Double Hilo', 'Quantum Crash', 'Aqua Dice', 'Vegas Coin', 'Sky Drop', 'Loot Box', 'Chicken Road', 'Fortune Rings', 'Blast Off', 'Mine Runner', 'Pixel Keno', 'Flip Master', 'Rocket Queen', 'Cosmic Caves', 'Turbo Tower', 'Golden Plinko'],
    slot: ['Gates of Olympus', 'Sweet Bonanza', 'Book of Dead', 'Starburst', 'Wolf Gold', 'Mega Moolah', 'Gonzo Quest', 'Dead or Alive', 'Sugar Rush', 'Big Bass', 'Money Train', 'Wild West Gold', 'Gates of Valhalla', 'Big Bass Bonanza', 'Sugar Rush 1000', 'Fruit Party', 'The Dog House', 'Madame Destiny', 'Wild Wild Riches', 'Floating Dragon', 'Buffalo King', 'Great Rhino', 'John Hunter', 'Aztec Gems', 'Fire Strike', 'Chilli Heat', 'Mustang Gold', 'Wolf Legend', 'Book of Ra', 'Legacy of Dead', 'Rise of Olympus', 'Moon Princess', 'Reactoonz', 'Fire Joker', 'Golden Ticket', 'Honey Rush', 'Gemix', 'Jammin Jars', 'Razor Shark', 'Wild Flower', 'Money Cart', 'Stormforged', 'Book of Shadows', 'San Quentin', 'Mental', 'Tombstone', 'Fire in the Hole', 'Punk Rocker', 'Warrior Graveyard', 'Das xBoot'],
    live: ['Lightning Roulette', 'Crazy Time', 'Mega Wheel', 'Baccarat', 'Dragon Tiger', 'Monopoly Live', 'Blackjack VIP', 'Sic Bo', 'Dream Catcher', 'Speed Roulette', 'Football Studio', 'Andar Bahar', 'Crazy Coin Flip', 'XXXtreme Lightning', 'Gold Bar Roulette', 'Red Door Roulette', 'Funky Time', 'Video Poker Live', 'Bac Bo', 'Super Sic Bo', 'Cash or Crash', 'Gonzo Treasure Hunt', 'Deal or No Deal', 'Monopoly Big Baller', 'Sweet Bonanza CandyLand', 'Adventures Beyond', 'Immersive Roulette', 'Auto Roulette', 'Speed Baccarat', 'No Commission Bac', 'Dragon Roulette', 'Emperor Baccarat', 'Golden Wealth', 'Lightning Baccarat', 'Lightning Dice', 'Lightning Storm', 'Peek Baccarat', 'Prosperity Tree', 'Fortune Baccarat', 'Super Andar Bahar', 'Teen Patti Live', "Casino Hold'em", 'Three Card Poker', 'Ultimate Texas', 'Caribbean Stud', 'Side Bet City', 'Football Studio Dice', 'Fan Tan Live', 'Extreme Texas', 'Power Blackjack'],
  };
  var MINI_ROUTES = { mini: 'mini-games.html', slot: 'slot.html', live: 'live.html' };

  // ---- VendorBrowser (frontend/app/components/VendorBrowser.vue) -------------
  var SLOT_VENDORS = ['Pragmatic Play', 'PG Soft', 'CQ9 Gaming', 'Hacksaw Gaming', 'NetEnt', 'Nolimit City', 'Big Time Gaming', 'Booongo', 'JILI', 'PlayStar', 'Yggdrasil', 'Evoplay', 'Skywind', 'Spadegaming', "Play'n GO", 'Microgaming', 'Habanero', 'Playtech', 'Red Tiger', 'Relax Gaming', 'Push Gaming', 'Wazdan', 'Blueprint', 'Quickspin', 'Thunderkick', 'ELK Studios', 'Playson', 'Kalamba', 'Fantasma', 'Dragoon Soft'];
  var LIVE_VENDORS = ['Evolution Gaming', 'Pragmatic Play Live', 'Sexy Gaming', 'Yeebet Live', 'WM Casino', 'Dream Gaming', 'SA Gaming', 'Ezugi', 'Playtech Live', 'BG Big Gaming', 'Allbet', 'Asia Gaming', 'eBET', 'VIVO Gaming', 'Microgaming Live', 'AE Sexy', 'OG Casino', 'Green Dragon', 'N2 Live', 'Ho Gaming', 'Bet Games', 'Skywind Live', 'CQ9 Live', 'PP Live Deluxe', 'Royal Gaming', 'Lucky Streak', 'Betradar Live', 'Xpro Gaming', 'Winfinity', 'Atmosfera'];
  var LIVE_GAME_NAMES = ['Lightning Roulette', 'VIP Baccarat', 'Speed Blackjack', 'Dragon Tiger', 'Casino Hold’em', 'Immersive Roulette', 'No Commission Baccarat', 'Sic Bo Live', 'Power Blackjack', 'Golden Roulette', 'Baccarat Control Squeeze', 'Three Card Poker'];
  var VENDOR_MEDIA = {
    live: LIVE_TABLES,
    slot: [
      { image: pexels(29825627), focalPoint: '58% 50%' },
      { image: pexels(7594128), focalPoint: '50% 52%' },
      { image: pexels(7594183), focalPoint: '50% 50%' },
      { image: pexels(7594310), focalPoint: '55% 40%' },
      { image: pexels(6664128), focalPoint: '50% 48%' },
      { image: pexels(27568815), focalPoint: '62% 50%' },
    ],
    fish: [
      { image: pexels(5955036), focalPoint: '58% 48%' },
      { image: pexels(32824677), focalPoint: '50% 52%' },
      { image: pexels(13070714), focalPoint: '54% 50%' },
      { image: pexels(18528202), focalPoint: '46% 52%' },
    ],
    'mini-games': [
      { image: pexels(27568815), focalPoint: '62% 50%' },
      { image: pexels(7561836), focalPoint: '60% 46%' },
      { image: pexels(7862503), focalPoint: '68% 50%' },
      { image: pexels(36755611), focalPoint: '70% 48%' },
    ],
  };

  // ---- sport.vue MATCHES (Load more cycles the same 8, up to 3 extra loads) --
  var SPORT_MATCHES = [
    { league: 'Premier League', home: { abbr: 'MU', name: 'Manchester United' }, away: { abbr: 'LIV', name: 'Liverpool' }, score: '2 - 1', time: "Live 67'" },
    { league: 'NBA', home: { abbr: 'LAL', name: 'Lakers' }, away: { abbr: 'GSW', name: 'Warriors' }, score: '98 - 105', time: 'Live Q3' },
    { league: 'La Liga', home: { abbr: 'RMA', name: 'Real Madrid' }, away: { abbr: 'FCB', name: 'Barcelona' }, score: '1 - 1', time: "Live 82'" },
    { league: 'MLB', home: { abbr: 'NYY', name: 'Yankees' }, away: { abbr: 'BOS', name: 'Red Sox' }, score: '4 - 3', time: 'Live 7th' },
    { league: 'Champions League', home: { abbr: 'PSG', name: 'PSG' }, away: { abbr: 'FCB', name: 'Bayern Munich' }, score: '3 - 2', time: "Live 55'" },
    { league: 'NBA', home: { abbr: 'BOS', name: 'Celtics' }, away: { abbr: 'MIA', name: 'Heat' }, score: '102 - 99', time: 'Live Q4' },
    { league: 'Premier League', home: { abbr: 'ARS', name: 'Arsenal' }, away: { abbr: 'CHE', name: 'Chelsea' }, score: '1 - 0', time: "Live 78'" },
    { league: 'Serie A', home: { abbr: 'JUV', name: 'Juventus' }, away: { abbr: 'INT', name: 'Inter Milan' }, score: '0 - 0', time: "Live 23'" },
  ];

  // ---- banking-details.vue DEMO_BANKS -----------------------------------------
  var DEMO_BANKS = ['Bank of America', 'Shinhan Bank', 'KB Kookmin Bank', 'Woori Bank', 'NH Nonghyup Bank', 'Hana Bank', '산림조합중앙회 Bank'];

  // ---- stores/bank.ts default seeded accounts (account.html / withdrawal.html carousel) --
  var BANK_ACCOUNTS = [
    { bank: 'KB Bank', num: '**** **** **** 1234', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-08-14' },
    { bank: 'Shinhan Bank', num: '**** **** **** 5678', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-09-05' },
    { bank: 'Woori Bank', num: '**** **** **** 9012', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-10-02' },
  ];

  // ---- AppHeader.vue nav[] (label already zh via t(), href → flattened static filenames) --
  var NAV_LINKS = [
    { label: T.home, href: 'index.html', icon: 'house' },
    { label: T.hotGames, href: 'hot-games.html', icon: 'flame' },
    { label: T.sports, href: 'sport.html', icon: 'trophy' },
    { label: T.live, href: 'live.html', icon: 'video' },
    { label: T.slots, href: 'slot.html', icon: 'cherry' },
    { label: T.fish, href: 'fish.html', icon: 'fish' },
    { label: T.miniGames, href: 'mini-games.html', icon: 'gamepad2' },
    { label: T.promotion, href: 'promotion.html', icon: 'gift' },
  ];

  // ---- MemberMenuDrawer.vue links[] (Browse button on the mobile bottom nav) --
  var MEMBER_MENU_LINKS = [
    { label: 'Account Overview', href: 'account.html', icon: 'grid' },
    { label: 'Deposit', href: 'deposit.html', icon: 'download' },
    { label: 'Withdrawal', href: 'withdrawal.html', icon: 'upload' },
    { label: 'Betting Record', href: 'betting-record.html', icon: 'history' },
    { label: 'Deposit Record', href: 'deposit-record.html', icon: 'file' },
    { label: 'Profit And Loss', href: 'profit-loss.html', icon: 'trend' },
    { label: 'Withdrawal Record', href: 'withdrawal-record.html', icon: 'file' },
    { label: 'Account Record', href: 'account-record.html', icon: 'file' },
    { label: 'Personal Info', href: 'personal-info.html', icon: 'user' },
    { label: 'Security Center', href: 'security.html', icon: 'shield' },
    { label: 'Customer Service', href: 'support.html', icon: 'chat' },
  ];

  window.WIN100_DATA = {
    THEME_KEYS: THEME_KEYS,
    THEME_LABELS: THEME_LABELS,
    ICONS: ICONS,
    T: T,
    BANNERS: BANNERS,
    MINI_IMG_POOL: MINI_IMG_POOL,
    LIVE_TABLES: LIVE_TABLES,
    MINI_NAMES: MINI_NAMES,
    MINI_ROUTES: MINI_ROUTES,
    SLOT_VENDORS: SLOT_VENDORS,
    LIVE_VENDORS: LIVE_VENDORS,
    LIVE_GAME_NAMES: LIVE_GAME_NAMES,
    VENDOR_MEDIA: VENDOR_MEDIA,
    SPORT_MATCHES: SPORT_MATCHES,
    DEMO_BANKS: DEMO_BANKS,
    BANK_ACCOUNTS: BANK_ACCOUNTS,
    NAV_LINKS: NAV_LINKS,
    MEMBER_MENU_LINKS: MEMBER_MENU_LINKS,
  };
})(window);
