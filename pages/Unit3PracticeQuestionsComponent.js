export function Unit3PracticeQuestionsComponent() {
  const questions = [
    'Explain one strength and one limitation of the biomedical model of health.',
    'Describe how the Ottawa Charter supports health promotion in Australia.',

    'Explain the role of the social model of health in reducing smoking rates.',
    'Outline two benefits of optimal health and wellbeing for the nation.',
    'Discuss one program aimed at improving Indigenous health outcomes.',
    'What role does VicHealth play in promoting health in Victoria?',
    'Explain how the NDIS aims to improve access and equity.'

  ];
  const listItems = questions.map(q => `<li class="mb-2">${q}</li>`).join('');
  return `
    <section class="content-section">
      <h1>Unit 3 Practice Questions</h1>
      <ul class="list-disc pl-6 mt-4">${listItems}</ul>
    </section>
  `;
}
