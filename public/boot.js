// Apply saved language, theme and palette before first paint (no flash). Kept external for a strict CSP.
(function () {
  try {
    var d = document.documentElement;
    var l = JSON.parse(localStorage.getItem('act:lang') || 'null');
    if (l === 'en') {
      d.lang = 'en';
      d.dir = 'ltr';
    }
    var t = JSON.parse(localStorage.getItem('act:theme') || 'null');
    if (t === 'dark' || t === 'light') d.setAttribute('data-theme', t);
    var p = JSON.parse(localStorage.getItem('act:palette') || 'null');
    d.setAttribute('data-palette', p === 'kashi' ? 'kashi' : 'candy');
  } catch (e) {}
})();
