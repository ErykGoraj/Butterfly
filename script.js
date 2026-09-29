import { marked } from './vendor/marked.esm.js';
import DOMPurify from './vendor/purify.es.mjs';

const $ = id => document.getElementById(id);
const base = new URL('./', location.href);
const notesBase = new URL('notes/', base);
let notes = [], byPath = new Map(), openFolders = new Set(), observer, loadVersion = 0;
const normalize = value => value.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l');
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (cls) node.className = cls; return node; };
const route = (path = '', heading = '', folder = '') => '#' + new URLSearchParams(path ? {note: path, ...(heading ? {heading} : {})} : folder ? {folder} : {}).toString();
const current = () => new URLSearchParams(location.hash.slice(1));
const link = (text, href, cls) => { const a = el('a', text, cls); a.href = href; return a; };
const category = note => note.path.split('/').slice(0, -1).join(' / ') || 'Notatki';
function closeMenu(focus = false) {
  document.body.classList.remove('menu-open'); $('menuButton').setAttribute('aria-expanded', 'false'); $('overlay').hidden = true;
  if (focus) $('menuButton').focus();
}
$('menuButton').onclick = () => {
  if (document.body.classList.contains('menu-open')) return closeMenu(true);
  document.body.classList.add('menu-open'); $('menuButton').setAttribute('aria-expanded', 'true'); $('overlay').hidden = false;
  $('sidebar').querySelector('a,button')?.focus();
};
$('overlay').onclick = () => closeMenu(true);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(event.target.tagName) && !event.target.isContentEditable) { event.preventDefault(); $('search').focus(); }
  if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
    const items = [$('menuButton'), ...Array.from($('sidebar').querySelectorAll('a,button,summary')).filter(n => n.getClientRects().length)];
    const index = items.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); items.at(-1).focus(); }
    if (!event.shiftKey && (index < 0 || index === items.length - 1)) { event.preventDefault(); items[0].focus(); }
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());
const paletteOptions = [
  ['blue','Błękit','Spokój i przejrzystość','#70b6ff'],
  ['violet','Lawenda','Wyobraźnia i refleksja','#b7a8ff'],
  ['teal','Turkus','Świeżość i równowaga','#65d7d0'],
  ['green','Szałwia','Natura i łagodność','#9bd59b'],
  ['amber','Miód','Ciepło i przytulność','#e9c06d'],
  ['orange','Mandarynka','Energia i ciekawość','#ffaf78'],
  ['rose','Koral','Odwaga i ekspresja','#ff9aa4'],
  ['pink','Róż','Delikatność i swoboda','#e8a4da'],
  ['slate','Grafit','Prostota i porządek','#b4c1d3']
];
function themeLabel() {
  const value=window.butterflyTheme.get();$('themeButton').textContent={system:'◐',dark:'☾',light:'☀'}[value];
  for(const input of document.querySelectorAll('input[name="mode"]'))input.checked=input.value===value;
  for(const input of document.querySelectorAll('input[name="palette"]'))input.checked=input.value===window.butterflyTheme.getPalette();
}
for(const [value,name,description,color] of paletteOptions){
  const label=el('label',undefined,'palette-option'),input=el('input');input.type='radio';input.name='palette';input.value=value;
  const swatch=el('span',undefined,'palette-swatch');swatch.style.background=color;swatch.ariaHidden='true';
  const text=el('span');text.append(el('strong',name),el('small',description));label.append(input,swatch,text);$('paletteChoices').append(label);
  input.onchange=()=>{window.butterflyTheme.setPalette(value);themeLabel();};
}
for(const input of document.querySelectorAll('input[name="mode"]'))input.onchange=()=>{window.butterflyTheme.set(input.value);themeLabel();};
$('themeButton').onclick=()=>{$('appearanceDialog').showModal();};
$('closeAppearance').onclick=()=>$('appearanceDialog').close();
$('appearanceDialog').addEventListener('click',event=>{if(event.target===$('appearanceDialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
$('appearanceDialog').addEventListener('close',()=>$('themeButton').focus());
themeLabel();
if (matchMedia('(max-width: 1150px)').matches) $('tocDetails').open = false;

function renderTree() {
  const root = {folders:new Map(), notes:[]};
  for (const note of notes) {
    let node = root;
    for (const part of note.path.split('/').slice(0,-1)) { if (!node.folders.has(part)) node.folders.set(part,{folders:new Map(),notes:[]}); node = node.folders.get(part); }
    node.notes.push(note);
  }
  const active = current().get('note');
  function branch(node, prefix = '') {
    const list = el('ul', undefined, 'tree-list');
    for (const [name, child] of node.folders) {
      const path = prefix + name, li = el('li'), details = el('details');
      details.open = openFolders.has(path) || !!active?.startsWith(path + '/');
      details.append(el('summary', name), branch(child,path+'/'));
      details.addEventListener('toggle', () => details.open ? openFolders.add(path) : openFolders.delete(path)); li.append(details); list.append(li);
    }
    for (const note of node.notes) { const li = el('li'), a = link(note.title,route(note.path),'nav-item'); if(note.path===active)a.setAttribute('aria-current','page'); li.append(a); list.append(li); }
    return list;
  }
  $('tree').replaceChildren(branch(root));
  document.querySelector('.home-link').toggleAttribute('data-active', !active);
  document.querySelector('.home-link').setAttribute('aria-current',!active && !current().get('folder') ? 'page' : 'false');
  $('noteCount').textContent = notes.length;
}
function crumbs(parts = [], noteTitle = '') {
  const container = $('breadcrumb'); container.replaceChildren(link('Biblioteka', '#'));
  parts.forEach((part,index) => container.append(el('span','/'),link(part,route('','',parts.slice(0,index+1).join('/')))));
  if(noteTitle) { const title=el('span',noteTitle);title.setAttribute('aria-current','page');container.append(el('span','/'),title); }
}
function card(note) {
  const a = link('',route(note.path),'card');
  a.append(el('span',category(note),'card-category'),el('h3',note.title),el('p',note.excerpt));
  const footer = el('span',undefined,'card-footer');footer.append(el('span',`${note.minutes} min czytania`),el('b','↗'));a.append(footer);return a;
}
function catalog(query = '', folder = '') {
  observer?.disconnect(); $('toc').replaceChildren(el('p','Wybierz notatkę, aby zobaczyć jej spis treści.','status'));
  crumbs(folder ? folder.split('/') : []);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const filtered = notes.filter(n => (!folder || n.path.startsWith(folder+'/')) && terms.every(t => normalize(n.title+' '+n.path+' '+n.text).includes(t)));
  const hero = el('div',undefined,'hero');
  hero.append(el('span',query ? 'WYSZUKIWANIE' : 'UCZ SIĘ. ODKRYWAJ. ROZWIJAJ.','eyebrow'));
  const heading = el('h1', query ? `Wyniki dla „${query}”` : folder ? folder.split('/').at(-1) : 'Wiedza zaczyna się');
  if(!query && !folder) heading.append(el('br'),el('span','od ciekawości.'));
  hero.append(heading,el('p',query ? 'Przeszukujemy tytuły, ścieżki i treść wszystkich notatek.' : 'Twoje notatki, uporządkowane. Wybierz temat i zrób kolejny krok w nauce.','description'));
  const bar=el('div',undefined,'collection-heading');bar.append(el('h2',query?'Znalezione notatki':folder?'W tej kategorii':'Odkrywaj bibliotekę'),el('span',`${filtered.length} / ${notes.length}`));
  const cards=el('div',undefined,'cards');filtered.forEach(n=>cards.append(card(n)));
  $('view').replaceChildren(hero,bar,cards);
  if(!filtered.length) $('view').append(el('p',query?'Brak wyników. Spróbuj krótszego zapytania.':'Nie ma jeszcze notatek w tej kategorii.','empty'));
  $('status').textContent = query ? `Liczba wyników: ${filtered.length}` : '';
  document.title = (query ? 'Wyszukiwanie' : folder || 'Biblioteka') + ' · Butterfly KOL';
}
const decode = value => { try {return decodeURIComponent(value);} catch {return value;} };
function wireLinks(article,note) {
  const fileURL=new URL(note.path.split('/').map(encodeURIComponent).join('/'),notesBase);
  for (const a of article.querySelectorAll('a[href]')) {
    const raw=a.getAttribute('href');
    if(raw.startsWith('#')) {a.href=route(note.path,decode(raw.slice(1)));continue;}
    let target;try { target = raw.startsWith('/notes/') ? new URL(raw.slice(1),base) : new URL(raw,fileURL); } catch { a.removeAttribute('href');continue; }
    if(target.origin===notesBase.origin && target.pathname.startsWith(notesBase.pathname) && /\.md$/i.test(target.pathname)) {
      const path=target.pathname.slice(notesBase.pathname.length).split('/').map(decode).join('/');a.href=route(path,decode(target.hash.slice(1)));
    } else {a.href=target.href;if(target.origin!==location.origin){a.rel='noopener noreferrer';}}
  }
  for(const img of article.querySelectorAll('img[src]')) {
    const raw=img.getAttribute('src'); const url=raw.startsWith('/notes/')?new URL(raw.slice(1),base):new URL(raw,fileURL);
    if(!['http:','https:'].includes(url.protocol)) img.remove(); else {img.src=url.href;img.loading='lazy';}
  }
}
function noteView(note) {
  crumbs(note.path.split('/').slice(0,-1),note.title);
  const article = el('article');
  const header=el('div'); header.append(el('div',`${category(note)} · ${note.minutes} MIN CZYTANIA`,'article-meta'),el('h1',note.title));
  const body=el('div',undefined,'markdown');
  body.innerHTML = DOMPurify.sanitize(marked.parse(note.markdown,{gfm:true}), {USE_PROFILES:{html:true},FORBID_TAGS:['style','form','input','button','textarea','select'],FORBID_ATTR:['style','srcset','id','name','autofocus']});
  if(body.firstElementChild?.tagName==='H1')body.firstElementChild.remove();
  const usedSlugs=new Set(), headings=[...body.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  $('toc').replaceChildren();
  for(const heading of headings) {
    const slug=heading.textContent.toLowerCase().trim().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s+/g,'-')||'sekcja';
    let unique=slug,index=1;while(usedSlugs.has(unique))unique=slug+'-'+index++;usedSlugs.add(unique);heading.id='section-'+unique;heading.dataset.slug=unique;
    const a=link(heading.textContent,route(note.path,heading.dataset.slug));a.style.paddingLeft=`${12+Math.max(0,Number(heading.tagName.slice(1))-2)*10}px`;$('toc').append(a);
  }
  if(!headings.length)$('toc').append(el('p','Ta notatka nie ma podsekcji.','status'));
  for(const pre of body.querySelectorAll('pre')) {
    const code=pre.querySelector('code');if(!code)continue;
    const bar=el('div',undefined,'code-header'),button=el('button','Kopiuj','copy');button.type='button';
    bar.append(el('span',code.className.replace('language-','')||'kod'),button);pre.prepend(bar);
    button.onclick=async()=>{try{await navigator.clipboard.writeText(code.textContent);button.textContent='Skopiowano';}catch{button.textContent='Zaznacz i skopiuj';}setTimeout(()=>button.textContent='Kopiuj',2200);};
  }
  for(const table of body.querySelectorAll('table')) {const wrapper=el('div',undefined,'table-wrap');table.replaceWith(wrapper);wrapper.append(table);}
  wireLinks(body,note);article.append(header,body);
  const nav=el('nav',undefined,'article-navigation');nav.ariaLabel='Sąsiednie notatki';const index=notes.indexOf(note);
  for(const [item,label] of [[notes[index-1],'← Poprzednia'],[notes[index+1],'Następna →']]) {
    if(item){const a=link('',route(item.path));a.append(el('span',label),el('strong',item.title));nav.append(a);}else nav.append(el('span'));
  }
  $('view').replaceChildren(article,nav);$('status').textContent='';document.title=note.title+' · Butterfly KOL';
  observer?.disconnect();observer=new IntersectionObserver(entries=>{const active=entries.find(e=>e.isIntersecting);if(active)for(const a of $('toc').querySelectorAll('a'))a.classList.toggle('active',a.hash===route(note.path,active.target.dataset.slug));},{rootMargin:'-15% 0px -65% 0px'});headings.forEach(h=>observer.observe(h));
}
function navigate({keepScroll=false}={}) {
  closeMenu();renderTree();
  const params=current(),path=params.get('note'),folder=params.get('folder')||'',query=params.get('q')||'';
  $('search').value=query;
  if(query)catalog(query);
  else if(path) {
    const note=byPath.get(path);
    if(!note) {observer?.disconnect();crumbs();$('toc').replaceChildren();$('status').textContent='';$('view').replaceChildren(el('h1','Nie znaleziono notatki'),el('p','Plik został usunięty, przeniesiony albo nie występuje w aktualnej bibliotece.','description'),link('Wróć do biblioteki','#','retry'));document.title='Nie znaleziono · Butterfly KOL';}
    else noteView(note);
  } else catalog('',folder);
  const heading=params.get('heading');
  if(heading){const target=[...$('view').querySelectorAll('[data-slug]')].find(h=>h.dataset.slug===heading);target?.scrollIntoView();}
  else if(!keepScroll)window.scrollTo({top:0,behavior:'instant'});
}
let searchTimer;
$('search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{const query=$('search').value.trim();history.replaceState(null,'',query?'#'+new URLSearchParams({q:query}):'#');navigate({keepScroll:true});$('search').focus();},160);});
window.addEventListener('hashchange',()=>{clearTimeout(searchTimer);navigate();});
document.addEventListener('click',event=>{const a=event.target.closest('a');if(a && a.hash===location.hash && a.origin===location.origin && a.pathname===location.pathname){closeMenu();if(current().get('heading'))navigate();}});
async function load() {
  const version=++loadVersion;$('refreshButton').disabled=true;$('status').textContent='Wczytywanie biblioteki…';
  try {
    const response=await fetch(new URL('notes-manifest.json',base),{cache:'no-store'});if(!response.ok)throw Error(`HTTP ${response.status}`);
    const data=await response.json();if(data.version!==1 || !Array.isArray(data.notes))throw Error('Nieprawidłowy format manifestu');
    const paths=new Set();
    for(const n of data.notes){if(!n || !['path','title','markdown','text','excerpt'].every(k=>typeof n[k]==='string') || !/\.md$/i.test(n.path) || n.path.split('/').some(p=>!p || p==='.' || p==='..') || paths.has(n.path))throw Error('Nieprawidłowa pozycja manifestu');paths.add(n.path);}
    if(version!==loadVersion)return;notes=data.notes;byPath=new Map(notes.map(n=>[n.path,n]));navigate({keepScroll:true});
  }catch(error){$('status').textContent='Nie udało się wczytać biblioteki.';const message=location.protocol==='file:'?'Uruchom stronę przez serwer HTTP zgodnie z README.':'Sprawdź połączenie i czy wygenerowano notes-manifest.json.';const retry=el('button','Spróbuj ponownie','retry');retry.onclick=load;$('view').replaceChildren(el('h1','Biblioteka jest niedostępna'),el('p',message,'description'),retry);console.error(error);}
  finally{if(version===loadVersion)$('refreshButton').disabled=false;}
}
$('refreshButton').onclick=load;
load();
