(() => {
  let preference = 'system', palette = 'blue';
  const palettes = ['blue','violet','teal','green','amber','orange','rose','pink','slate'];
  try { preference = localStorage.getItem('butterfly-theme') || 'system'; palette = localStorage.getItem('butterfly-palette') || 'blue'; } catch {}
  if (!['system','dark','light'].includes(preference)) preference = 'system';
  if (!palettes.includes(palette)) palette = 'blue';
  const reading = {readingSize:'18',readingWidth:'comfortable'};
  const allowedReading = {readingSize:['16','18','20','22'],readingWidth:['narrow','comfortable','wide']};
  try { for(const key of Object.keys(reading)){const stored=localStorage.getItem('butterfly-'+key);if(allowedReading[key].includes(stored))reading[key]=stored;} } catch {}
  const applyReading = () => {document.documentElement.style.setProperty('--reading-size',reading.readingSize+'px');document.documentElement.style.setProperty('--reading-width',{narrow:'540px',comfortable:'680px',wide:'100%'}[reading.readingWidth]);};
  applyReading();
  const media = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => { document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference; document.documentElement.dataset.palette = palette; };
  window.butterflyTheme = {
    getReading: () => ({...reading}),
    setReading: (key,value) => {if(!allowedReading[key]?.includes(value))return;reading[key]=value;try{localStorage.setItem('butterfly-'+key,value);}catch{}applyReading();},
    get: () => preference,
    set: value => { if (!['system','dark','light'].includes(value)) return; preference = value; try { localStorage.setItem('butterfly-theme', value); } catch {} apply(); },
    getPalette: () => palette,
    setPalette: value => { if (!palettes.includes(value)) return; palette = value; try { localStorage.setItem('butterfly-palette', value); } catch {} apply(); }
  };
  media.addEventListener('change', apply);
  apply();
  // This classic script still runs under file://, unlike ES modules.
  if (location.protocol === 'file:') document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('status').textContent = 'Ten plik otwarto bez serwera.';
    const message = document.createElement('p');
    message.textContent = 'Uruchom node scripts/serve.mjs w folderze strony i otwórz http://127.0.0.1:4173 albo użyj opublikowanego adresu GitHub Pages. Dwuklik index.html nie uruchamia biblioteki ani kursów.';
    document.getElementById('view').replaceChildren(message);
  });
})();
