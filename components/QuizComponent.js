const quizQuestions = [
  {
    question: 'Which model of health focuses on the broader determinants of health?',
    options: ['Biomedical model', 'Social model', 'Ottawa Charter', 'NDIS'],
    answer: 1
  },
  {
    question: 'What does DALY stand for?',
    options: ['Disability Adjusted Life Year', 'Daily Activity Level Yield', 'Disease Affected Life Year', 'Dynamic and Latent Youth'],
    answer: 0
  },
  {
    question: 'Which action area is part of the Ottawa Charter?',
    options: ['Improve Medicare', 'Create Supportive Environments', 'Increase Taxation', 'Subsidise Medicines'],
    answer: 1
  }
];

export function getQuizHTML() {
  let html = `<div id="quiz-root" class="p-4 bg-slate-800 rounded-lg shadow-md">`;
  html += `<h2 class="text-xl font-semibold mb-4 text-purple-300">Unit 3 Self-Check Quiz</h2>`;
  html += `<form id="quiz-form" class="space-y-4">`;
  quizQuestions.forEach((q, i) => {
    html += `<div><p class="mb-2">${q.question}</p>`;
    q.options.forEach((opt, j) => {
      html += `<label class="block"><input type="radio" name="q${i}" value="${j}" class="mr-2">${opt}</label>`;
    });
    html += `</div>`;
  });
  html += `<button type="submit" class="button-style mt-4">Submit Answers</button>`;
  html += `</form><div id="quiz-result" class="mt-4 text-lg font-semibold"></div></div>`;
  return html;
}

export function initQuiz() {
  const form = document.getElementById('quiz-form');
  const resultEl = document.getElementById('quiz-result');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach((q, i) => {
      const chosen = form[`q${i}`];
      if (chosen && parseInt(chosen.value) === q.answer) score++;
    });
    if (resultEl) resultEl.textContent = `You scored ${score}/${quizQuestions.length}!`;
  });
  console.log('initQuiz: Setup COMPLETE.');
}
