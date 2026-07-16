import { HOME_OPERATION_MEDIA, PROMOTION_OPERATION_MEDIA } from '~/config/operational-media';

/**
 * 首頁區塊 mock 內容 — R3 皮膚層獨立。
 * 內容與元件分離,讓 R4 的同一區塊多種版面(variants)可共用同一份資料。
 * 純資料,不含樣式/邏輯。
 */

// ---- AppBanner ----------------------------------------------------------

export interface Banner {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  sub: string;
  cta: string;
  /** 選配:客戶上傳的底圖(未設時顯示 token 藝術面 .banner-art) */
  img?: string;
  /** object-position；營運素材可保護人物與產品焦點 */
  focalPoint?: string;
}

export const banners: Banner[] = [
  {
    id: 1,
    badge: 'E-SPORTS WEEK',
    title: 'Level Up',
    highlight: '30%',
    sub: 'WEEKLY GAMEPLAY CASHBACK · LIMITED TIME',
    cta: 'Enter Arena',
    img: HOME_OPERATION_MEDIA.esports.image,
    focalPoint: HOME_OPERATION_MEDIA.esports.focalPoint,
  },
  {
    id: 2,
    badge: 'ROYAL VIP',
    title: 'Prestige',
    highlight: 'VIP',
    sub: 'EXCLUSIVE REBATES · PRIVATE SUPPORT · FAST PAYOUT',
    cta: 'Unlock VIP',
    img: HOME_OPERATION_MEDIA.luxury.image,
    focalPoint: HOME_OPERATION_MEDIA.luxury.focalPoint,
  },
  {
    id: 3,
    badge: 'SMART WALLET',
    title: 'USDT',
    highlight: '+8%',
    sub: 'FAST DEPOSIT · SECURE SETTLEMENT · 24/7 ACCESS',
    cta: 'Deposit Now',
    img: HOME_OPERATION_MEDIA.finance.image,
    focalPoint: HOME_OPERATION_MEDIA.finance.focalPoint,
  },
];

// ---- MiniGamesGrid --------------------------------------------------------
// imgs 為 unsplash 圖片 id 池(依索引輪流指派給各分頁的遊戲名稱);
// mk()/pic() 組裝邏輯留在元件,這裡只放原始內容。

export const miniGamesImgs = [
  'photo-1534620780923-1ce0db377c3f__w-200',
  'photo-1604028297236-42130c7dcc3a__w-200',
  'photo-1604028296525-8304e1a4969f__w-200',
  'photo-1771775606196-70dccc0d9bde__w-200',
  'photo-1525018667593-176858caed6a__w-200',
  'photo-1590336225155-d7e19a3a954f__w-200',
];

export interface MiniGamesTab {
  key: string;
  label: string;
  route: string;
  names: string[];
}

export const miniGamesTabs: MiniGamesTab[] = [
  {
    key: 'mini',
    label: 'Mini Game',
    route: '/mini-games',
    names: ['Mega Fortune', 'Starburst', 'Limbo', 'Mines', 'Plinko', 'Dice', 'Tower', 'Keno', 'Hilo', 'Wheel', 'Crash', 'Coin Flip', 'Rocket', 'Caves', 'Video Poker', 'Scratch Card', 'Aviator', 'Spaceman', 'JetX', 'Balloon', 'Penalty Shoot-out', 'Goal Rush', 'Cricket Crash', 'Zeppelin', 'Magic Keno', 'Turbo Mines', 'Royal Dice', 'Lucky Wheel', 'Neon Tower', 'Bomb Squad', 'Cave Dash', 'Gem Flip', 'Star Rocket', 'Hyper Plinko', 'Double Hilo', 'Quantum Crash', 'Aqua Dice', 'Vegas Coin', 'Sky Drop', 'Loot Box', 'Chicken Road', 'Fortune Rings', 'Blast Off', 'Mine Runner', 'Pixel Keno', 'Flip Master', 'Rocket Queen', 'Cosmic Caves', 'Turbo Tower', 'Golden Plinko'],
  },
  {
    key: 'slot',
    label: 'Slot Game',
    route: '/slot',
    names: ['Gates of Olympus', 'Sweet Bonanza', 'Book of Dead', 'Starburst', 'Wolf Gold', 'Mega Moolah', 'Gonzo Quest', 'Dead or Alive', 'Sugar Rush', 'Big Bass', 'Money Train', 'Wild West Gold', 'Gates of Valhalla', 'Big Bass Bonanza', 'Sugar Rush 1000', 'Fruit Party', 'The Dog House', 'Madame Destiny', 'Wild Wild Riches', 'Floating Dragon', 'Buffalo King', 'Great Rhino', 'John Hunter', 'Aztec Gems', 'Fire Strike', 'Chilli Heat', 'Mustang Gold', 'Wolf Legend', 'Book of Ra', 'Legacy of Dead', 'Rise of Olympus', 'Moon Princess', 'Reactoonz', 'Fire Joker', 'Golden Ticket', 'Honey Rush', 'Gemix', 'Jammin Jars', 'Razor Shark', 'Wild Flower', 'Money Cart', 'Stormforged', 'Book of Shadows', 'San Quentin', 'Mental', 'Tombstone', 'Fire in the Hole', 'Punk Rocker', 'Warrior Graveyard', 'Das xBoot'],
  },
  {
    key: 'live',
    label: 'Live Game',
    route: '/live',
    names: ['Lightning Roulette', 'Crazy Time', 'Mega Wheel', 'Baccarat', 'Dragon Tiger', 'Monopoly Live', 'Blackjack VIP', 'Sic Bo', 'Dream Catcher', 'Speed Roulette', 'Football Studio', 'Andar Bahar', 'Crazy Coin Flip', 'XXXtreme Lightning', 'Gold Bar Roulette', 'Red Door Roulette', 'Funky Time', 'Video Poker Live', 'Bac Bo', 'Super Sic Bo', 'Cash or Crash', 'Gonzo Treasure Hunt', 'Deal or No Deal', 'Monopoly Big Baller', 'Sweet Bonanza CandyLand', 'Adventures Beyond', 'Immersive Roulette', 'Auto Roulette', 'Speed Baccarat', 'No Commission Bac', 'Dragon Roulette', 'Emperor Baccarat', 'Golden Wealth', 'Lightning Baccarat', 'Lightning Dice', 'Lightning Storm', 'Peek Baccarat', 'Prosperity Tree', 'Fortune Baccarat', 'Super Andar Bahar', 'Teen Patti Live', 'Casino Hold\'em', 'Three Card Poker', 'Ultimate Texas', 'Caribbean Stud', 'Side Bet City', 'Football Studio Dice', 'Fan Tan Live', 'Extreme Texas', 'Power Blackjack'],
  },
];

// ---- HotGamesRail ----------------------------------------------------------

export interface HotGame {
  img: string;
  title: string;
  bonus: string;
  provider: string;
}

export const hotGames: HotGame[] = [
  { img: '/_external/images.unsplash.com/photo-1606167668584-78701c57f13d__w-300_h-400_fit-crop', title: 'Mega Fortune', bonus: 'BONUS 1.2', provider: 'Pocket Play' },
  { img: '/_external/images.unsplash.com/photo-1596838132731-3301c3fd4317__w-300_h-400_fit-crop', title: 'Starburst', bonus: 'BONUS 1.5', provider: 'NetEnt' },
  { img: '/_external/images.unsplash.com/photo-1511512578047-dfb367046420__w-300_h-400_fit-crop', title: 'Book of Dead', bonus: 'BONUS 2.0', provider: "Play'n GO" },
  { img: '/_external/images.unsplash.com/photo-1553481187-be93c21490a9__w-300_h-400_fit-crop', title: 'Gonzo Quest', bonus: 'BONUS 1.8', provider: 'NetEnt' },
  { img: '/_external/images.unsplash.com/photo-1478720568477-152d9b164e26__w-300_h-400_fit-crop', title: 'Gates of Olympus', bonus: 'BONUS 1.3', provider: 'Pragmatic' },
  { img: '/_external/images.unsplash.com/photo-1518895312237-a9e23508077d__w-300_h-400_fit-crop', title: 'Dead or Alive', bonus: 'BONUS 1.6', provider: 'NetEnt' },
  { img: '/_external/images.unsplash.com/photo-1534620780923-1ce0db377c3f__w-300_h-400_fit-crop', title: 'Limbo', bonus: 'BONUS 1.4', provider: 'Pocket Play' },
  { img: '/_external/images.unsplash.com/photo-1524985069026-dd778a71c7b4__w-300_h-400_fit-crop', title: 'Aladdin', bonus: 'BONUS 1.9', provider: 'Pocket Play' },
  { img: '/_external/images.unsplash.com/photo-1604028297236-42130c7dcc3a__w-300_h-400_fit-crop', title: 'Wolf Gold', bonus: 'BONUS 1.5', provider: 'Pragmatic' },
  { img: '/_external/images.unsplash.com/photo-1590336225155-d7e19a3a954f__w-300_h-400_fit-crop', title: 'Crazy Time', bonus: 'BONUS 1.7', provider: 'Evolution' },
];

// ---- Ticker ----------------------------------------------------------------
// 原 DOM 將同一組跑馬燈訊息重複兩次以達成無縫捲動,元件端 v-for 兩份維持相同結構。

export interface TickerWin {
  player: string;
  amount: string;
  game: string;
}

export const tickerWins: TickerWin[] = [
  { player: 'Player***123', amount: 'RM 8,888', game: 'Gates of Olympus' },
  { player: 'Lucky***456', amount: 'RM 15,000', game: 'Sweet Bonanza' },
  { player: 'Win***789', amount: 'RM 3,200', game: 'Crazy Time' },
  { player: 'Pro***321', amount: 'RM 22,500', game: 'Lightning Roulette' },
  { player: 'Star***654', amount: 'RM 5,600', game: 'Mega Moolah' },
  { player: 'Ace***987', amount: 'RM 11,100', game: 'Book of Dead' },
  { player: 'King***147', amount: 'RM 7,777', game: 'Starburst' },
  { player: 'Rich***258', amount: 'RM 19,900', game: 'Wolf Gold' },
];

// ---- SportsPromo -------------------------------------------------------
// Hero「FIFA WORLD CUP」區塊為一次性內容,不在此清單中。

export interface SportsTeam {
  code: string;
  name: string;
}

export interface SportsMatch {
  league: string;
  teamA: SportsTeam;
  teamB: SportsTeam;
  score: string;
  minute: string;
}

export const sportsMatches: SportsMatch[] = [
  { league: 'Premier League', teamA: { code: 'MU', name: 'Manchester United' }, teamB: { code: 'LIV', name: 'Liverpool' }, score: '2 - 1', minute: "Live 67'" },
  { league: 'NBA', teamA: { code: 'LAL', name: 'Lakers' }, teamB: { code: 'GSW', name: 'Warriors' }, score: '98 - 105', minute: 'Live Q3' },
  { league: 'La Liga', teamA: { code: 'RMA', name: 'Real Madrid' }, teamB: { code: 'FCB', name: 'Barcelona' }, score: '1 - 1', minute: "Live 82'" },
  { league: 'MLB', teamA: { code: 'NYY', name: 'Yankees' }, teamB: { code: 'BOS', name: 'Red Sox' }, score: '4 - 3', minute: 'Live 7th' },
  { league: 'Champions League', teamA: { code: 'PSG', name: 'PSG' }, teamB: { code: 'FCB', name: 'Bayern Munich' }, score: '3 - 2', minute: "Live 55'" },
  { league: 'NBA', teamA: { code: 'BOS', name: 'Celtics' }, teamB: { code: 'MIA', name: 'Heat' }, score: '102 - 99', minute: 'Live Q4' },
  { league: 'Premier League', teamA: { code: 'ARS', name: 'Arsenal' }, teamB: { code: 'CHE', name: 'Chelsea' }, score: '1 - 0', minute: "Live 78'" },
  { league: 'Serie A', teamA: { code: 'JUV', name: 'Juventus' }, teamB: { code: 'INT', name: 'Inter Milan' }, score: '0 - 0', minute: "Live 23'" },
];

// ---- Promotion ---------------------------------------------------------
// 原檔案有 4 個不重複的 promo 卡片(RioBet/BitStarz/IceCasino/Gamdom),
// 各自在桌面 grid 與行動版橫向捲動各出現一次(共 8 個 DOM 區塊,均為結構重複而非內容重複)。
// 卡片本身的視覺(PROMO! 浮水印、PROMOTION 漸層字、SPECIAL OFFER 文案、裝飾圓點)在 4 者之間
// 完全相同、零文字差異 —— 唯一變化的欄位是 name / id(用於 goDetail 導頁)。

export interface PromoCard {
  id: string;
  name: string;
  /** 選配:促銷卡圖(客戶後台可換;未設時顯示 token 藝術面) */
  img?: string;
  focalPoint?: string;
}

export const promoCards: PromoCard[] = [
  {
    id: 'riobet-casino',
    name: 'RioBet Casino',
    img: PROMOTION_OPERATION_MEDIA['riobet-casino'].image,
    focalPoint: PROMOTION_OPERATION_MEDIA['riobet-casino'].focalPoint,
  },
  {
    id: 'bitstarz-casino',
    name: 'BitStarz Casino',
    img: PROMOTION_OPERATION_MEDIA['bitstarz-casino'].image,
    focalPoint: PROMOTION_OPERATION_MEDIA['bitstarz-casino'].focalPoint,
  },
  {
    id: 'icecasino',
    name: 'IceCasino',
    img: PROMOTION_OPERATION_MEDIA.icecasino.image,
    focalPoint: PROMOTION_OPERATION_MEDIA.icecasino.focalPoint,
  },
  {
    id: 'gamdom-casino',
    name: 'Gamdom Casino',
    img: PROMOTION_OPERATION_MEDIA['gamdom-casino'].image,
    focalPoint: PROMOTION_OPERATION_MEDIA['gamdom-casino'].focalPoint,
  },
];
