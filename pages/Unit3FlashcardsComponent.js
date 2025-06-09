import { getFlashcardsHTML, initFlashcards } from '../components/FlashcardsComponent.js';

export function Unit3FlashcardsComponent() {
  const html = `
    <section class="content-section">
      <h1>Unit 3 Glossary Flashcards</h1>
      ${getFlashcardsHTML()}
    </section>
  `;

  requestAnimationFrame(() => {
    initFlashcards();
  });

  return html;
}
