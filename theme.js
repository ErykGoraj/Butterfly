(() => {
  let preference = 'system', palette = 'blue';
  const palettes = ['blue','violet','teal','green','amber','orange','rose','pink','slate'];
  try { preference = localStorage.getItem('butterfly-theme') || 'system'; palette = localStorage.getItem('butterfly-palette') || 'blue'; } catch {}
  if (!['system','dark','light'].includes(preference)) preference = 'system';
  if (!palettes.includes(palette)) palette = 'blue';
  const media = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => { document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference; document.documentElement.dataset.palette = palette; };
  window.butterflyTheme = {
    get: () => preference,
    set: value => { if (!['system','dark','light'].includes(value)) return; preference = value; try { localStorage.setItem('butterfly-theme', value); } catch {} apply(); },
    getPalette: () => palette,
    setPalette: value => { if (!palettes.includes(value)) return; palette = value; try { localStorage.setItem('butterfly-palette', value); } catch {} apply(); }
  };
  media.addEventListener('change', apply);
  apply();
})();
