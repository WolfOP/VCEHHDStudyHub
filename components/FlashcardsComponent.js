const flashcards = [
  { term: 'Health and Wellbeing', definition: 'The overall state of a person\'s physical, social, emotional, mental and spiritual existence.' },
  { term: 'DALY', definition: 'Disability Adjusted Life Year - a measure of burden of disease.' },
  { term: 'Ottawa Charter', definition: 'A framework for health promotion outlining five action areas.' }
];

export function getFlashcardsHTML() {
  return `
    <div id="flashcards-root" class="p-4 bg-slate-800 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-purple-300">Unit 3 Glossary Flashcards</h2>
      <div class="text-2xl font-bold mb-2" id="flashcard-term"></div>
      <div class="mb-4 hidden" id="flashcard-def"></div>
      <button id="flashcard-toggle" class="button-style mb-4">Show Definition</button>
      <div class="space-x-4">
        <button id="flashcard-prev" class="button-style">Previous</button>
        <button id="flashcard-next" class="button-style">Next</button>
      </div>
    </div>
  `;
}

export function initFlashcards() {
  const termEl = document.getElementById('flashcard-term');
  const defEl = document.getElementById('flashcard-def');
  const toggleBtn = document.getElementById('flashcard-toggle');
  const prevBtn = document.getElementById('flashcard-prev');
  const nextBtn = document.getElementById('flashcard-next');
  let current = 0;

  function renderCard() {
    const card = flashcards[current];
    if (termEl) termEl.textContent = card.term;
    if (defEl) {
      defEl.textContent = card.definition;
      defEl.classList.add('hidden');
    }
    if (toggleBtn) toggleBtn.textContent = 'Show Definition';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!defEl) return;
      if (defEl.classList.contains('hidden')) {
        defEl.classList.remove('hidden');
        toggleBtn.textContent = 'Hide Definition';
      } else {
        defEl.classList.add('hidden');
        toggleBtn.textContent = 'Show Definition';
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { current = (current - 1 + flashcards.length) % flashcards.length; renderCard(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { current = (current + 1) % flashcards.length; renderCard(); });

  renderCard();
  console.log('initFlashcards: Setup COMPLETE.');
}
