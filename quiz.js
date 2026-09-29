// Form fields are created as text nodes; course authors cannot inject HTML here.
export function createQuiz(questions, el, title = 'Sprawdź zrozumienie') {
  const section = el('section', undefined, 'quiz');
  section.append(el('h3', title), el('p', 'Wybierz jedną odpowiedź w każdym pytaniu. Możesz próbować ponownie — quiz nie blokuje dalszej nauki.', 'status'));
  const form = el('form'), feedback = [];
  questions.forEach((question, index) => {
    const field = el('fieldset'); field.append(el('legend', `${index + 1}. ${question.question}`));
    question.options.forEach((option, optionIndex) => {
      const label = el('label'), input = el('input');
      input.type = 'radio'; input.name = `question-${index}`; input.value = String(optionIndex + 1); input.required = true;
      label.append(input, el('span', option)); field.append(label);
    });
    const message = el('p', '', 'quiz-feedback'); message.hidden = true;
    feedback.push(message); field.append(message); form.append(field);
  });
  const result = el('p', '', 'quiz-result'); result.setAttribute('role', 'status'); result.setAttribute('aria-live', 'polite');
  const submit = el('button', 'Sprawdź odpowiedzi', 'retry'); submit.type = 'submit';
  const reset = el('button', 'Spróbuj od nowa', 'retry'); reset.type = 'reset';
  const actions = el('div', undefined, 'course-actions'); actions.append(submit, reset);
  form.append(actions, result);
  const clear = () => { result.textContent = ''; feedback.forEach(message => { message.hidden = true; message.textContent = ''; }); };
  form.addEventListener('change', clear); form.addEventListener('reset', clear);
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const answers = new FormData(form); let score = 0;
    questions.forEach((question, index) => {
      const correct = Number(answers.get(`question-${index}`)) === question.answer;
      if (correct) score++;
      feedback[index].hidden = false;
      feedback[index].textContent = `${correct ? '✓ Dobrze.' : 'Jeszcze nie. Prawidłowa odpowiedź: ' + question.options[question.answer - 1] + '.'} ${question.explanation}`;
      feedback[index].dataset.correct = String(correct);
    });
    result.textContent = `Wynik: ${score} z ${questions.length}. ${score === questions.length ? 'Świetnie, wszystkie odpowiedzi są poprawne.' : 'Przeczytaj wyjaśnienia i spróbuj ponownie.'}`;
  });
  section.append(form); return section;
}
