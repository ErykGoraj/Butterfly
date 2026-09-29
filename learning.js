export function createBookmarks({ el, link, getNotes, view, breadcrumb, toc }) {
  const key = 'butterfly-bookmarks-v1';
  let saved = new Set(), canSave = true;
  try { const value = JSON.parse(localStorage.getItem(key) || '[]'); if (Array.isArray(value)) saved = new Set(value.filter(item => typeof item === 'string')); }
  catch { canSave = false; }
  function hint() { return el('p', canSave ? 'Zakładki są zapisywane w tej przeglądarce. Nie zmieniają postępu kursów.' : 'Zapis w przeglądarce jest niedostępny. Zakładki działają tylko do odświeżenia strony.', 'status'); }
  function button(note, onChange = () => {}) {
    const button = el('button', '', 'bookmark-button'); button.type = 'button';
    const refresh = () => { button.textContent = saved.has(note.path) ? '★ Usuń zakładkę' : '☆ Zapisz na później'; button.setAttribute('aria-pressed', String(saved.has(note.path))); };
    refresh();
    button.onclick = () => {
      saved.has(note.path) ? saved.delete(note.path) : saved.add(note.path);
      try { localStorage.setItem(key, JSON.stringify([...saved])); } catch { canSave = false; }
      refresh(); onChange();
      if (!canSave && !button.parentElement.querySelector('.bookmark-warning')) button.after(el('p', 'Zakładka zapisana tylko na czas tej sesji.', 'bookmark-warning status'));
    };
    return button;
  }
  function list() {
    breadcrumb.replaceChildren(link('Biblioteka', '#'), el('span', '/'), el('span', 'Zakładki'));
    toc.replaceChildren(el('p', 'Twoje miejsca do powrotu.', 'status'));
    view.replaceChildren(el('span', 'WRÓĆ DO TEGO, CO WAŻNE', 'eyebrow'), el('h1', 'Zapisane na później'), hint());
    const notes = getNotes().filter(note => saved.has(note.path));
    if (!notes.length) view.append(el('p', 'Nie masz zakładek do dostępnych notatek. Otwórz lekcję i wybierz „Zapisz na później”.', 'empty'), link('Przeglądaj bibliotekę', '#', 'retry'));
    for (const note of notes) {
      const item = el('section', undefined, 'bookmark-item');
      item.append(link(note.title, '#' + new URLSearchParams({note: note.path})), button(note, () => { item.remove(); if (!view.querySelector('.bookmark-item')) list(); }));
      view.append(item);
    }
    document.title = 'Zakładki · Butterfly KOL';
  }
  return { button, list };
}
