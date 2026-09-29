import { createQuiz } from './quiz.js';
// Course definitions live in the same build snapshot as the notes.
// Only completion and the last visited lesson are stored in this browser.
export function createCourses({ el, link, view, breadcrumb, toc, getNote, onChange }) {
  let courses = [], progress = {}, storageAvailable = true;
  const storageKey = 'butterfly-course-progress-v1';
  function readProgress() {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
      progress = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
    } catch { progress = {}; storageAvailable = false; }
  }
  readProgress();
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
    catch { storageAvailable = false; }
  }
  const url = (course, note = '', heading = '') => '#' + new URLSearchParams({course: course.id, ...(note ? {note} : {}), ...(heading ? {heading} : {})});
  const lessons = course => course.modules.flatMap(module => module.lessons);
  const state = course => Object.hasOwn(progress, course.id) && progress[course.id] && typeof progress[course.id] === 'object' ? progress[course.id] : {};
  const completed = course => new Set((Array.isArray(state(course).done) ? state(course).done : []).filter(path => lessons(course).includes(path)));
  const next = course => {
    const paths = lessons(course), done = completed(course), last = state(course).last;
    return paths.includes(last) && !done.has(last) ? last : paths.find(path => !done.has(path)) || paths[0];
  };
  function meter(course) {
    const total = lessons(course).length, count = completed(course).size;
    const wrapper = el('div', undefined, 'course-progress');
    const bar = el('progress'); bar.max = total; bar.value = count; bar.setAttribute('aria-label', `Ukończone lekcje: ${count} z ${total}`);
    wrapper.append(el('span', `${count} z ${total} lekcji ukończonych`), bar);
    return wrapper;
  }
  function hint() { return el('p', storageAvailable ? 'Postęp zapisuje się tylko w tej przeglądarce, bez konta.' : 'Przeglądarka blokuje zapis. Postęp zachowamy tylko do zamknięcia lub odświeżenia strony.', 'status'); }
  function courseCrumbs(course, note) {
    breadcrumb.replaceChildren(link('Kursy', '#courses'));
    if (course) breadcrumb.append(el('span', '/'), link(course.title, url(course)));
    if (note) { const name = el('span', note.title); name.setAttribute('aria-current', 'page'); breadcrumb.append(el('span', '/'), name); }
  }
  function clear() {
    toc.replaceChildren(el('p', 'Wybierz lekcję, aby zobaczyć jej spis treści.', 'status'));
    view.replaceChildren();
  }
  function list() {
    clear(); courseCrumbs(); document.title = 'Kursy · Butterfly KOL';
    const hero = el('div', undefined, 'hero');
    hero.append(el('span', 'KROK PO KROKU, W SWOIM TEMPIE', 'eyebrow'), el('h1', 'Wybierz swoją ścieżkę.'), el('p', 'Uporządkowane lekcje, jasny plan i miejsce, do którego zawsze możesz wrócić.', 'description'));
    view.append(hero);
    const cards = el('div', undefined, 'cards course-cards');
    for (const course of courses) {
      const card = el('section', undefined, 'card');
      const count = lessons(course).length, minutes = lessons(course).reduce((sum, path) => sum + getNote(path).minutes, 0);
      const started = !!state(course).last || completed(course).size > 0, finished = completed(course).size === count;
      card.append(el('span', `${course.level} · ${count} lekcji · około ${minutes} min czytania`, 'card-category'), el('h2', course.title), el('p', course.description), meter(course));
      const actions = el('div', undefined, 'course-actions');
      actions.append(link(finished ? 'Powtórz kurs →' : started ? 'Kontynuuj →' : 'Rozpocznij →', url(course, next(course)), 'retry'), link('Zobacz program', url(course), 'course-program-link'));
      card.append(actions); cards.append(card);
    }
    view.append(cards, hint());
    if (!courses.length) view.append(el('p', 'Nie ma jeszcze opublikowanych kursów. W tym czasie możesz korzystać z biblioteki.', 'empty'), link('Przejdź do biblioteki', '#', 'retry'));
  }
  function overview(course) {
    clear(); courseCrumbs(course); document.title = course.title + ' · Butterfly KOL';
    const hero = el('div', undefined, 'hero');
    hero.append(el('span', course.level, 'eyebrow'), el('h1', course.title), el('p', course.description, 'description'));
    if (course.requirements) hero.append(el('p', 'Przyda Ci się: ' + course.requirements, 'status'));
    hero.append(meter(course), link(completed(course).size === lessons(course).length ? 'Powtórz kurs →' : state(course).last ? 'Kontynuuj naukę →' : 'Rozpocznij kurs →', url(course, next(course)), 'retry'));
    view.append(hero);
    if (course.outcomes?.length) {
      const section = el('section', undefined, 'course-outcomes'), items = el('ul');
      course.outcomes.forEach(outcome => items.append(el('li',outcome)));
      section.append(el('h2','Czego się nauczysz'),items); view.append(section);
    }
    if(course.project) {const project=el('section',undefined,'note');project.append(el('h3','Zadanie końcowe'),el('p',course.project));view.append(project);}
    view.append(el('h2', 'Program kursu'));
    let number = 0;
    course.modules.forEach((module, index) => {
      const section = el('section', undefined, 'course-module');
      section.append(el('h3', `${String(index + 1).padStart(2, '0')} / ${module.title}`));
      const items = el('ol', undefined, 'lesson-list'); items.start = number + 1;
      for (const path of module.lessons) {
        number++; const note = getNote(path), done = completed(course).has(path), item = el('li');
        const a = link('', url(course, path), 'lesson-row');
        a.append(el('span', done ? '✓' : String(number).padStart(2, '0'), 'lesson-number'), el('strong', note.title), el('span', done ? 'Ukończona' : `${note.minutes} min`, 'lesson-state'));
        item.append(a); items.append(item);
      }
      section.append(items);
      if(module.quiz?.length){const quiz=el('details',undefined,'module-quiz');quiz.append(el('summary',`Quiz modułu · ${module.quiz.length} pytań`),createQuiz(module.quiz,el));section.append(quiz);}
      view.append(section);
    });
    view.append(hint());
  }
  function decorate(course, note) {
    courseCrumbs(course, note);
    const paths = lessons(course), index = paths.indexOf(note.path), done = completed(course);
    progress[course.id] = {done: [...done], last: note.path}; save();
    const banner = el('div', undefined, 'lesson-banner');
    banner.append(link('← Program kursu', url(course)), el('span', `Lekcja ${index + 1} z ${paths.length}`));
    view.prepend(banner);
    const module=course.modules.find(module=>module.lessons.at(-1)===note.path);
    if(module?.quiz?.length)view.querySelector('.article-navigation').before(createQuiz(module.quiz,el,'Quiz na koniec modułu: '+module.title));
    const footer = el('section', undefined, 'lesson-completion');
    footer.append(el('h2', done.has(note.path) ? 'Lekcja ukończona ✓' : 'Gotowe na kolejny krok?'));
    const button = el('button', done.has(note.path) ? 'Cofnij ukończenie' : 'Oznacz jako ukończoną', 'retry');
    button.type = 'button'; button.setAttribute('aria-pressed', String(done.has(note.path)));
    button.onclick = () => {
      const updated = completed(course);
      updated.has(note.path) ? updated.delete(note.path) : updated.add(note.path);
      progress[course.id] = {done: [...updated], last: note.path}; save();
      onChange(); document.querySelector('.lesson-completion button')?.focus({preventScroll:true});
    };
    footer.append(button, meter(course));
    if (done.size === paths.length) footer.append(el('p', 'Cały kurs ukończony. Możesz wrócić do dowolnej lekcji lub wybrać nową ścieżkę.', 'description'), link('Odkrywaj kursy →', '#courses'));
    else if (index === paths.length - 1) footer.append(link('Wróć do programu kursu →', url(course)));
    footer.append(hint());
    view.querySelector('.article-navigation').before(footer);
  }
  window.addEventListener('storage', event => { if (event.key === storageKey || event.key === null) { readProgress(); onChange(); } });
  return { set: value => { courses = value; }, list, overview, decorate, lessons, url,
    get: id => courses.find(course => course.id === id), count: () => courses.length };
}
