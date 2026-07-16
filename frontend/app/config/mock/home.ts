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
}

export const banners: Banner[] = [
  { id: 1, badge: 'WEEKLY RELOAD', title: 'Bonus', highlight: '50%', sub: 'EVERY MONDAY & FRIDAY', cta: 'Claim Now' },
  { id: 2, badge: 'FIRST DEPOSIT', title: 'Fever', highlight: '100%', sub: 'BONUS UP TO RM 500', cta: 'Deposit Now' },
  { id: 3, badge: 'VIP EXCLUSIVE', title: 'Unlock', highlight: 'VIP', sub: 'CASHBACK · REBATE · PRIORITY SUPPORT', cta: 'Join VIP' },
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
    names: ['Mega Fortune', 'Starburst', 'Limbo', 'Mines', 'Plinko', 'Dice', 'Tower', 'Keno', 'Hilo', 'Wheel', 'Crash', 'Coin Flip', 'Rocket', 'Caves', 'Video Poker', 'Scratch Card'],
  },
  {
    key: 'slot',
    label: 'Slot Game',
    route: '/slot',
    names: ['Gates of Olympus', 'Sweet Bonanza', 'Book of Dead', 'Starburst', 'Wolf Gold', 'Mega Moolah', 'Gonzo Quest', 'Dead or Alive', 'Sugar Rush', 'Big Bass', 'Money Train', 'Wild West Gold'],
  },
  {
    key: 'live',
    label: 'Live Game',
    route: '/live',
    names: ['Lightning Roulette', 'Crazy Time', 'Mega Wheel', 'Baccarat', 'Dragon Tiger', 'Monopoly Live', 'Blackjack VIP', 'Sic Bo', 'Dream Catcher', 'Speed Roulette', 'Football Studio', 'Andar Bahar'],
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
}

export const promoCards: PromoCard[] = [
  { id: 'riobet-casino', name: 'RioBet Casino' },
  { id: 'bitstarz-casino', name: 'BitStarz Casino' },
  { id: 'icecasino', name: 'IceCasino' },
  { id: 'gamdom-casino', name: 'Gamdom Casino' },
];
