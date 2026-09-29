import { readFile } from 'node:fs/promises';

export function validateQuiz(value, context) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${context}: quiz musi być tablicą.`);
  return value.map((q, index) => {
    if (!q || typeof q.question !== 'string' || !q.question.trim() || !Array.isArray(q.options) || q.options.length < 2 || q.options.some(option => typeof option !== 'string' || !option.trim()) || new Set(q.options).size !== q.options.length || !Number.isInteger(q.answer) || q.answer < 1 || q.answer > q.options.length || typeof q.explanation !== 'string' || !q.explanation.trim()) throw new Error(`${context}: pytanie ${index + 1} wymaga question, co najmniej 2 różnych options, answer (numer od 1) i explanation.`);
    return {question:q.question, options:q.options, answer:q.answer, explanation:q.explanation};
  });
}

// Missing Markdown files are omitted, so removing a note never leaves a dead lesson.
export async function generateCourses(filename, notes, warn = console.warn) {
  let config;
  try { config = JSON.parse(await readFile(filename, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw new Error(`courses.json: ${error.message}`); }
  if (!Array.isArray(config.courses)) throw new Error('courses.json: oczekiwano tablicy courses.');
  const paths = new Set(notes.map(note => note.path)), ids = new Set();
  return config.courses.map(course => {
    if (!course || typeof course.id !== 'string' || !/^[a-z0-9-]+$/.test(course.id) || ids.has(course.id)) throw new Error('Kurs musi mieć unikalne id: małe litery, cyfry i myślniki.');
    ids.add(course.id);
    for (const key of ['title', 'description']) if (typeof course[key] !== 'string' || !course[key].trim()) throw new Error(`Kurs ${course.id}: brak ${key}.`);
    if (!Array.isArray(course.modules)) throw new Error(`Kurs ${course.id}: brak tablicy modules.`);
    const used = new Set();
    const modules = course.modules.map(module => {
      if (!module || typeof module.title !== 'string' || !module.title.trim() || !Array.isArray(module.lessons)) throw new Error(`Kurs ${course.id}: nieprawidłowy moduł.`);
      const lessons = module.lessons.filter(lesson => {
        if (typeof lesson !== 'string' || used.has(lesson)) throw new Error(`Kurs ${course.id}: nieprawidłowa lub powtórzona lekcja ${lesson}.`);
        used.add(lesson);
        if (!paths.has(lesson)) { warn(`Kurs ${course.id}: pomijam nieistniejącą notatkę ${lesson}`); return false; }
        return true;
      });
      return { title: module.title, lessons, quiz: validateQuiz(module.quiz, `Kurs ${course.id}, moduł ${module.title}`) };
    }).filter(module => module.lessons.length);
    if (course.outcomes !== undefined && (!Array.isArray(course.outcomes) || course.outcomes.some(item => typeof item !== 'string' || !item.trim()))) throw new Error(`Kurs ${course.id}: outcomes musi być tablicą niepustych tekstów.`);
    if (course.project !== undefined && typeof course.project !== 'string') throw new Error(`Kurs ${course.id}: project musi być tekstem.`);
    return { id: course.id, title: course.title, description: course.description,
      outcomes: course.outcomes || [], project: course.project || '',
      level: typeof course.level === 'string' ? course.level : 'Własne tempo',
      requirements: typeof course.requirements === 'string' ? course.requirements : '', modules };
  }).filter(course => course.modules.length);
}
