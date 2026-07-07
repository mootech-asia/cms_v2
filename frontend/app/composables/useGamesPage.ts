import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

export interface GameModalData {
  name: string;
  provider: string;
  src: string;
}

/**
 * Replicates the original Figma site's vanilla-JS game-page behaviour
 * (filters.js + games.js + modal.js) scoped to a single page root element:
 *  - live search filtering of game cards
 *  - "Load more" cloning of cards (+ hover styling)
 *  - favourite-star toggle on each card
 *  - game modal on card click (exposed as reactive state for <GameModal>)
 */
export function useGamesPage(rootRef: Ref<HTMLElement | null>) {
  const modal = ref<GameModalData | null>(null);

  const gameCards = (root: HTMLElement) =>
    [...root.querySelectorAll<HTMLElement>('div.group')].filter((c) => c.querySelector('img[alt]'));

  // --- live search filter ---
  function onInput(e: Event) {
    const root = rootRef.value;
    const input = e.target as HTMLInputElement | null;
    if (!root || !input || input.tagName !== 'INPUT') return;
    const ph = (input.getAttribute('placeholder') || '').toLowerCase();
    if (!/search/.test(ph)) return;
    const q = input.value.trim().toLowerCase();
    gameCards(root).forEach((c) => {
      const txt = (c.textContent || '').toLowerCase();
      c.style.display = !q || txt.includes(q) ? '' : 'none';
    });
  }

  // --- favourite toggle + game modal ---
  function onClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const card = target.closest<HTMLElement>('div.group');
    if (!card) return;
    const img = card.querySelector<HTMLImageElement>('img[alt]');
    if (!img) return;

    const fav = target.closest<HTMLElement>('button');
    if (fav && fav.querySelector('svg') && /absolute/.test(fav.className)) {
      e.preventDefault();
      e.stopPropagation();
      const on = fav.dataset.fav !== '1';
      fav.dataset.fav = on ? '1' : '';
      const svg = fav.querySelector('svg')!;
      svg.setAttribute('fill', on ? '#98E7D2' : 'none');
      svg.style.stroke = on ? '#98E7D2' : 'currentColor';
      return;
    }

    const ps = card.querySelectorAll('p');
    const name = (card.querySelector('h3')?.textContent || img.getAttribute('alt') || 'Game').trim();
    const provider = (ps[ps.length - 1]?.textContent || '').trim();
    modal.value = { name, provider, src: img.src };
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') modal.value = null;
  }

  // --- Load more (ports games.js: create button if missing, clone up to 12) ---
  function findGrids(root: HTMLElement) {
    const set = new Set<HTMLElement>();
    root.querySelectorAll<HTMLElement>('[class*="grid-cols"]').forEach((g) => {
      if (g.children.length >= 4) set.add(g);
    });
    const cards = [...root.querySelectorAll<HTMLElement>('.group')].filter((c) => c.querySelector('img[alt]'));
    const m = new Map<HTMLElement, number>();
    cards.forEach((c) => {
      const p = c.parentElement as HTMLElement;
      m.set(p, (m.get(p) || 0) + 1);
    });
    [...m.entries()].filter(([, n]) => n >= 4).forEach(([p]) => set.add(p));
    return [...set];
  }

  function lmAppend(grid: HTMLElement) {
    const cards = [...grid.children].filter((c) => !(c as HTMLElement).dataset.clone);
    cards.slice(0, Math.min(cards.length, 12)).forEach((c) => {
      const n = c.cloneNode(true) as HTMLElement;
      n.dataset.clone = '1';
      grid.appendChild(n);
    });
  }

  function setupLoadMore(root: HTMLElement) {
    findGrids(root).forEach((grid) => {
      // locate the existing "Load more" button after this grid
      let btn: HTMLButtonElement | null = null;
      let probe = grid.nextElementSibling;
      for (let i = 0; i < 3 && probe; i++, probe = probe.nextElementSibling) {
        const b = (probe.matches?.('button') ? probe : probe.querySelector?.('button')) as HTMLButtonElement | null;
        if (b && /load more/i.test(b.textContent || '')) {
          btn = b;
          break;
        }
      }
      // create one if the page has no static Load more (slot/sport/fish/…)
      if (!btn) {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:flex;justify-content:center;margin-top:24px;margin-bottom:8px';
        btn = document.createElement('button');
        btn.textContent = 'Load more';
        wrap.appendChild(btn);
        grid.parentElement!.insertBefore(wrap, grid.nextSibling);
      }
      const button = btn;
      // lmStyle
      button.style.cssText =
        'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:12px 60px;color:#D1D5DB;font-weight:500;cursor:pointer;transition:all .2s';
      button.addEventListener('mouseenter', () => {
        button.style.background = '#313E40';
        button.style.color = '#AAE5D3';
        button.style.borderColor = '#AAE5D3';
      });
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(255,255,255,0.05)';
        button.style.color = '#D1D5DB';
        button.style.borderColor = 'rgba(255,255,255,0.2)';
      });
      button.addEventListener('click', () => lmAppend(grid));
    });
  }

  onMounted(() => {
    const root = rootRef.value;
    if (!root) return;
    root.addEventListener('input', onInput);
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    setupLoadMore(root);
  });

  onBeforeUnmount(() => {
    const root = rootRef.value;
    root?.removeEventListener('input', onInput);
    root?.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKey);
  });

  return { modal };
}
