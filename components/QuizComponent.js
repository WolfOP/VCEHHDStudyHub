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

  },
  {
    question: 'Which level of government primarily funds Medicare?',
    options: ['Local', 'Federal', 'State', 'Private'],
    answer: 1
  },
  {
    question: 'Which indicator measures years of life lost due to premature death?',
    options: ['YLL', 'YLD', 'HALE', 'BoD'],
    answer: 0
  },
  {
    question: 'What is the main focus of the biomedical model of health?',
    options: ['Prevention of illness', 'Social determinants', 'Diagnosis and treatment', 'Spiritual wellbeing'],
    answer: 2
  },
  {
    question: 'NDIS stands for?',
    options: ['National Disability Insurance Scheme', 'National Disease Intervention System', 'Northern District Health Scheme', 'National Drugs Information Service'],
    answer: 0
  },
  {
    question: 'Which of the following is a sociocultural factor influencing health?',
    options: ['Age', 'Income', 'Blood pressure', 'Genetics'],
    answer: 1
  },
  {
    question: 'Which statement best reflects equity in health?',
    options: ['Treating everyone exactly the same', 'Providing extra support to those with greater need', 'Only focusing on individual responsibility', 'Charging all patients the same fee'],
    answer: 1
  },
  {
    question: 'Which Ottawa Charter action area relates to education and skill building?',
    options: ['Create Supportive Environments', 'Develop Personal Skills', 'Strengthen Community Action', 'Reorient Health Services'],
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
