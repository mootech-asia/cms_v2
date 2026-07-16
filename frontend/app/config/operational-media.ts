/**
 * 模擬營運視覺素材。
 *
 * 所有相片來自 Pexels 的免費素材頁，介面文字仍由 HTML 疊加，避免將營運文案
 * 烤進圖片。正式上線時可把 image 換成 CDN/後台上傳網址，元件不需修改。
 */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;

export interface OperationalMedia {
  image: string;
  focalPoint: string;
  eyebrow?: string;
  source: string;
}

export const HOME_OPERATION_MEDIA = {
  esports: {
    image: pexels(7862503),
    focalPoint: '68% 50%',
    source: 'https://www.pexels.com/photo/woman-using-a-computer-7862503/',
  },
  luxury: {
    image: pexels(32100316),
    focalPoint: '76% 28%',
    source: 'https://www.pexels.com/photo/elegant-woman-in-black-sequin-evening-gown-32100316/',
  },
  finance: {
    image: pexels(36755611),
    focalPoint: '70% 48%',
    source: 'https://www.pexels.com/photo/stock-trader-analyzing-market-data-on-screen-36755611/',
  },
  worldFootball: {
    image: pexels(30651230),
    focalPoint: '60% 52%',
    source: 'https://www.pexels.com/photo/illuminated-soccer-stadium-at-night-with-crowd-30651230/',
  },
} satisfies Record<string, OperationalMedia>;

export const LIVE_CASINO_OPERATION_MEDIA = {
  hero: {
    image: pexels(7594590),
    focalPoint: '50% 44%',
    eyebrow: 'LIVE DEALER STUDIO',
    source: 'https://www.pexels.com/photo/players-betting-on-a-roulette-table-7594590/',
  },
  tables: [
    {
      image: pexels(7594348),
      focalPoint: '42% 50%',
      source: 'https://www.pexels.com/photo/men-playing-roulette-in-casino-7594348/',
    },
    {
      image: pexels(6664128),
      focalPoint: '50% 48%',
      source: 'https://www.pexels.com/photo/man-displaying-cards-in-casino-6664128/',
    },
    {
      image: pexels(7594254),
      focalPoint: '68% 48%',
      source: 'https://www.pexels.com/photo/a-woman-dealer-holding-cards-7594254/',
    },
    {
      image: pexels(6664131),
      focalPoint: '50% 38%',
      source: 'https://www.pexels.com/photo/dealer-in-casino-6664131/',
    },
    {
      image: pexels(7594310),
      focalPoint: '55% 40%',
      source: 'https://www.pexels.com/photo/playing-cards-on-baccarat-table-7594310/',
    },
    {
      image: pexels(7594183),
      focalPoint: '50% 50%',
      source: 'https://www.pexels.com/photo/close-up-photo-of-casino-roulette-7594183/',
    },
  ],
} satisfies { hero: OperationalMedia; tables: OperationalMedia[] };

/** 各分類廠商選擇與遊戲卡片共用的營運底圖。 */
export const CATEGORY_VENDOR_OPERATION_MEDIA = {
  live: LIVE_CASINO_OPERATION_MEDIA.tables,
  slot: [
    { image: pexels(29825627), focalPoint: '58% 50%', source: 'https://www.pexels.com/photo/vibrant-slot-machines-in-casino-night-scene-29825627/' },
    { image: pexels(7594128), focalPoint: '50% 52%', source: 'https://www.pexels.com/photo/a-roulette-table-inside-a-casino-7594128/' },
    { image: pexels(7594183), focalPoint: '50% 50%', source: 'https://www.pexels.com/photo/close-up-photo-of-casino-roulette-7594183/' },
    { image: pexels(7594310), focalPoint: '55% 40%', source: 'https://www.pexels.com/photo/playing-cards-on-baccarat-table-7594310/' },
    { image: pexels(6664128), focalPoint: '50% 48%', source: 'https://www.pexels.com/photo/man-displaying-cards-in-casino-6664128/' },
    { image: pexels(27568815), focalPoint: '62% 50%', source: 'https://www.pexels.com/photo/gaming-27568815/' },
  ],
  fish: [
    { image: pexels(5955036), focalPoint: '58% 48%', source: 'https://www.pexels.com/photo/blue-fish-in-the-ocean-5955036/' },
    { image: pexels(32824677), focalPoint: '50% 52%', source: 'https://www.pexels.com/photo/vibrant-tropical-fish-in-underwater-aquarium-32824677/' },
    { image: pexels(13070714), focalPoint: '54% 50%', source: 'https://www.pexels.com/photo/underwater-photo-of-a-school-of-tropical-fish-13070714/' },
    { image: pexels(18528202), focalPoint: '46% 52%', source: 'https://www.pexels.com/photo/a-large-aquarium-with-many-different-fish-18528202/' },
  ],
  miniGames: [
    { image: pexels(27568815), focalPoint: '62% 50%', source: 'https://www.pexels.com/photo/gaming-27568815/' },
    { image: pexels(7561836), focalPoint: '60% 46%', source: 'https://www.pexels.com/photo/woman-playing-a-virtual-reality-game-with-a-vr-headset-7561836/' },
    { image: pexels(7862503), focalPoint: '68% 50%', source: 'https://www.pexels.com/photo/woman-using-a-computer-7862503/' },
    { image: pexels(36755611), focalPoint: '70% 48%', source: 'https://www.pexels.com/photo/stock-trader-analyzing-market-data-on-screen-36755611/' },
  ],
} satisfies Record<string, OperationalMedia[]>;

export const CATEGORY_HERO_MEDIA = {
  hotGames: {
    image: pexels(7862503),
    focalPoint: '68% 50%',
    eyebrow: 'TRENDING NOW',
    source: 'https://www.pexels.com/photo/woman-using-a-computer-7862503/',
  },
  sport: {
    image: pexels(30651230),
    focalPoint: '50% 54%',
    eyebrow: 'LIVE ODDS',
    source: 'https://www.pexels.com/photo/illuminated-soccer-stadium-at-night-with-crowd-30651230/',
  },
  live: {
    ...LIVE_CASINO_OPERATION_MEDIA.hero,
  },
  slot: {
    image: pexels(29825627),
    focalPoint: '58% 50%',
    eyebrow: 'JACKPOT FLOOR',
    source: 'https://www.pexels.com/photo/vibrant-slot-machines-in-casino-night-scene-29825627/',
  },
  fish: {
    image: pexels(5955036),
    focalPoint: '58% 48%',
    eyebrow: 'OCEAN ARCADE',
    source: 'https://www.pexels.com/photo/blue-fish-in-the-ocean-5955036/',
  },
  miniGames: {
    image: pexels(27568815),
    focalPoint: '65% 50%',
    eyebrow: 'QUICK PLAY',
    source: 'https://www.pexels.com/photo/gaming-27568815/',
  },
  promotion: {
    image: pexels(32100316),
    focalPoint: '74% 30%',
    eyebrow: 'MEMBER REWARDS',
    source: 'https://www.pexels.com/photo/elegant-woman-in-black-sequin-evening-gown-32100316/',
  },
} satisfies Record<string, OperationalMedia>;

export const PROMOTION_OPERATION_MEDIA = {
  'riobet-casino': {
    image: pexels(7594128),
    focalPoint: '50% 52%',
    source: 'https://www.pexels.com/photo/a-roulette-table-inside-a-casino-7594128/',
  },
  'bitstarz-casino': {
    image: pexels(29825627),
    focalPoint: '54% 50%',
    source: 'https://www.pexels.com/photo/vibrant-slot-machines-in-casino-night-scene-29825627/',
  },
  icecasino: {
    image: pexels(32100316),
    focalPoint: '72% 28%',
    source: 'https://www.pexels.com/photo/elegant-woman-in-black-sequin-evening-gown-32100316/',
  },
  'gamdom-casino': {
    image: pexels(27568815),
    focalPoint: '62% 50%',
    source: 'https://www.pexels.com/photo/gaming-27568815/',
  },
} satisfies Record<string, OperationalMedia>;
