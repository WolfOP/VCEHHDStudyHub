import { getQuizHTML, initQuiz } from '../components/QuizComponent.js';

export function Unit3QuizComponent() {
  const html = `
    <section class="content-section">
      <h1>Unit 3 Quiz</h1>
      ${getQuizHTML()}
    </section>
  `;

  requestAnimationFrame(() => {
    initQuiz();
  });

  return html;
}
