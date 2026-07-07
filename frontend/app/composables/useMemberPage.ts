import { onMounted, onBeforeUnmount, type Ref } from 'vue';

/**
 * Replicates the original Figma site's account/member-page vanilla-JS
 * behaviour (forms.js + records.js + account.js) scoped to a page root:
 *  - password show/hide toggle (eye button)
 *  - transaction-record status filter dropdown (All/Pending/Approved/Rejected)
 *  - deposit amount quick-select + promotion radio select
 */
export function useMemberPage(rootRef: Ref<HTMLElement | null>) {
  const AMT_RE = /^\d{1,3}(,\d{3})+$/;
  const STATUSES = ['All', 'Pending', 'Approved', 'Rejected'];

  const root = () => rootRef.value;

  function closeStatusMenus() {
    root()?.querySelectorAll('.rb-status-menu').forEach((m) => m.remove());
  }

  function rowStatus(row: Element) {
    const s = [...row.querySelectorAll('span')]
      .map((x) => x.textContent!.trim())
      .find((t) => /^(Approved|Pending|Rejected|Completed)$/.test(t));
    return s || '';
  }

  function filterRows(status: string) {
    root()?.querySelectorAll('table tr').forEach((tr) => {
      if (tr.querySelector('th')) return;
      const st = rowStatus(tr);
      if (!st) return;
      (tr as HTMLElement).style.display = status === 'All' || st === status ? '' : 'none';
    });
  }

  function onClick(e: MouseEvent) {
    const r = root();
    if (!r) return;
    const target = e.target as HTMLElement;

    // --- password eye toggle ---
    const eye = target.closest<HTMLButtonElement>('button[type="button"]');
    if (eye && eye.querySelector('svg') && /absolute/.test(eye.className)) {
      const inp = eye.parentElement?.querySelector('input');
      if (inp && (inp.type === 'password' || inp.dataset.pw === '1')) {
        e.preventDefault();
        inp.dataset.pw = '1';
        inp.type = inp.type === 'password' ? 'text' : 'password';
        return;
      }
    }

    // --- records status filter: option click ---
    const opt = target.closest<HTMLElement>('.rb-status-opt');
    if (opt) {
      const status = opt.dataset.status!;
      const trig = r.querySelector('.rb-status-trigger');
      if (trig) trig.textContent = 'Status: ' + status;
      filterRows(status);
      closeStatusMenus();
      return;
    }

    // --- records status filter: trigger button ---
    const trig = target.closest<HTMLButtonElement>('button');
    if (trig && /^Status:/.test((trig.textContent || '').trim())) {
      e.preventDefault();
      if (r.querySelector('.rb-status-menu')) {
        closeStatusMenus();
        return;
      }
      trig.classList.add('rb-status-trigger');
      const menu = document.createElement('div');
      menu.className = 'rb-status-menu';
      menu.style.cssText =
        'position:absolute;z-index:50;margin-top:4px;left:0;background:#1a2128;border:1px solid #374151;border-radius:8px;overflow:hidden;min-width:150px;box-shadow:0 8px 24px rgba(0,0,0,.4)';
      STATUSES.forEach((s) => {
        const o = document.createElement('div');
        o.className = 'rb-status-opt';
        o.dataset.status = s;
        o.textContent = s;
        o.style.cssText = 'padding:9px 14px;color:#d1d5db;font-size:14px;cursor:pointer';
        o.addEventListener('mouseenter', () => (o.style.background = '#0f1419'));
        o.addEventListener('mouseleave', () => (o.style.background = ''));
        menu.appendChild(o);
      });
      trig.parentElement!.style.position = 'relative';
      trig.parentElement!.appendChild(menu);
      return;
    }

    // --- deposit amount quick-select ---
    if (trig && AMT_RE.test((trig.textContent || '').trim())) {
      const grid = trig.parentElement!;
      [...grid.querySelectorAll('button')].forEach((x) => {
        if (AMT_RE.test((x.textContent || '').trim())) {
          x.style.background = '#0f1419';
          x.style.color = '#fff';
          x.style.border = '1px solid #374151';
        }
      });
      trig.style.background = '#313E40';
      trig.style.color = '#AAE5D3';
      trig.style.border = '1px solid transparent';
      const amt = (trig.textContent || '').trim();
      const input = [...r.querySelectorAll('input')].find(
        (i) => /₩/.test(i.getAttribute('placeholder') || '') || /₩/.test(i.value || ''),
      );
      if (input) input.value = '₩ ' + amt;
      return;
    }

    // --- promotion radio select ---
    const card = target.closest<HTMLElement>('.items-start');
    if (card) {
      const radio = card.querySelector<HTMLElement>('div.w-5.rounded-full.border-2');
      if (radio && card.querySelector('h3')) {
        r.querySelectorAll<HTMLElement>('div.w-5.rounded-full.border-2').forEach((rr) => {
          rr.style.borderColor = '#4b5563';
          rr.innerHTML = '';
        });
        radio.style.borderColor = '#98E7D2';
        radio.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:#98E7D2"></div>';
      }
    }

    // click elsewhere closes any open status menu
    if (!target.closest('.rb-status-menu')) closeStatusMenus();
  }

  onMounted(() => root()?.addEventListener('click', onClick));
  onBeforeUnmount(() => root()?.removeEventListener('click', onClick));
}
