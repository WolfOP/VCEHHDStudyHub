const flashcards = [

  {
    term: 'Health and Wellbeing',
    definition:
      "The overall state of a person's physical, social, emotional, mental and spiritual existence."
  },
  {
    term: 'Biomedical Approach',
    definition:
      'Focuses on the physical or biological aspects of disease and illness, emphasising diagnosis and treatment.'
  },
  {
    term: 'Social Model of Health',
    definition:
      'Framework that addresses broader social, cultural and environmental determinants of health to reduce inequities.'
  },
  {
    term: 'Ottawa Charter',
    definition:
      'A World Health Organization framework for health promotion outlining five action areas.'
  },
  {
    term: 'Medicare',
    definition:
      "Australia's universal health insurance scheme providing affordable healthcare."
  },
  {
    term: 'Private Health Insurance',
    definition:
      'Optional insurance for healthcare costs not fully covered by Medicare or for private hospital care.'
  },
  {
    term: 'National Disability Insurance Scheme (NDIS)',
    definition:
      'Provides support to Australians under 65 with a permanent and significant disability.'
  },
  {
    term: 'Burden of Disease',
    definition:
      'A measure of the impact of disease and injury, expressed as the gap between current health status and ideal health.'
  },
  {
    term: 'DALY',
    definition:
      'Disability Adjusted Life Year – one year of healthy life lost due to illness, injury or premature death.'
  },
  {
    term: 'Health-Adjusted Life Expectancy (HALE)',
    definition:
      'The average number of healthy years a person can expect to live, free from serious disease or disability.'
  },
  {
    term: 'Incidence',
    definition:
      'The number or rate of new cases of a disease or condition during a specified period.'
  },
  {
    term: 'Prevalence',
    definition:
      'The total number or proportion of cases of a disease or condition in a population at a given time.'
  }

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
