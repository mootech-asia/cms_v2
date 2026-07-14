(function () {
  const MEMBER_SLUGS = new Set([
    'account',
    'account-record',
    'betting-record',
    'banking-details',
    'change-password',
    'deposit',
    'deposit-record',
    'personal-info',
    'profit-loss',
    'security',
    'withdrawal',
    'withdrawal-record'
  ]);

  function activeSlug(detail) {
    if (detail && detail.slug) return detail.slug;
    const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
    return hash || 'home';
  }

  function removeMemberBack() {
    document.querySelectorAll('#container #member-back').forEach((node) => node.remove());
  }

  function scheduleRemove(detail) {
    if (!MEMBER_SLUGS.has(activeSlug(detail))) return;
    removeMemberBack();
    requestAnimationFrame(removeMemberBack);
    setTimeout(removeMemberBack, 60);
  }

  document.addEventListener('page:rendered', (event) => scheduleRemove(event.detail));
  window.addEventListener('hashchange', () => requestAnimationFrame(() => scheduleRemove()));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scheduleRemove());
  } else {
    scheduleRemove();
  }
})();
