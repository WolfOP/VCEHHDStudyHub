import { useState } from 'react';

const initiatives = [
  {
    id: 'naccho',
    name: 'NACCHO',
    description: `Represents 142 Aboriginal Community Controlled Health Services (ACCHS), offering culturally appropriate, holistic healthcare.`,
    socialJustice: {
      access: 'Expands provision of health and wellbeing services with culturally respectful approaches.',
      equity: 'Focuses on needs-based, culturally relevant healthcare for Aboriginal communities.',
      participation: 'Initiated and operated by the Aboriginal community, fostering self-determination.'
    },
    evaluation: `Federal funding in 1997 increased Aboriginal participation in national health policy. NACCHO is seen as a living embodiment of self-determination.`
  },
  {
    id: 'close-the-gap',
    name: 'Close the Gap',
    description: `Aims to close health/life expectancy gaps between Indigenous and non-Indigenous Australians with seven key targets.`,
    socialJustice: {
      access: 'Improves access to early childhood education, employment, and services.',
      equity: 'Directly targets systemic health inequalities with national action.',
      participation: 'Developed in collaboration with communities.'
    },
    evaluation: `Only 1/7 targets met. Some improvement in Year 12 attainment and child mortality. Life expectancy gap widening.`
  },
  {
    id: 'good-health',
    name: 'Road to Good Health',
    description: `A 6-week free diabetes prevention program promoting healthy eating and physical activity for Indigenous Australians.`,
    socialJustice: {
      access: 'Free program, allows participants to bring family/friends.',
      equity: 'Targets a group with high diabetes prevalence.',
      participation: 'Encourages community participation through culturally relevant education.'
    },
    evaluation: `Positive participant feedback. Reported weight loss and lifestyle changes.`
  },
  {
    id: 'kids-ears',
    name: "Care for Kids' Ears",
    description: `Raises awareness of otitis media and hearing loss using apps, posters, and media in 22 Indigenous languages.`,
    socialJustice: {
      access: 'Broad information distribution via schools, kiosks, media, and multiple languages.',
      equity: 'Targets a health condition highly prevalent among Aboriginal children.',
      participation: 'Resources developed for communities and schools.'
    },
    evaluation: `40% of mothers recognized the campaign. Knowledge of symptoms and prevention increased.`
  },
  {
    id: 'move-it-mob-style',
    name: 'Move It Mob Style',
    description: `TV and online fitness program featuring Indigenous dancers and music promoting physical activity in communities.`,
    socialJustice: {
      access: 'Free and widely distributed online and on TV.',
      equity: 'Culturally tailored with Indigenous role models.',
      participation: 'Led by Indigenous youth and showcases culture.'
    },
    evaluation: `Award-nominated, well-received, running for multiple seasons. Positive community feedback.`
  }
];

export default function KeySkill7() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🧭 Key Skill 7: Evaluating Indigenous Health Initiatives</h2>
      <p className="text-gray-300 mb-6">Select an initiative to evaluate its social justice promotion and health outcomes.</p>

      {initiatives.map((item) => (
        <div key={item.id} className="mb-4">
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded w-full text-left hover:bg-purple-800"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            {item.name}
          </button>
          {expandedId === item.id && (
            <div className="bg-gray-700 p-4 mt-2 rounded">
              <p className="text-gray-300 mb-2"><strong>Description:</strong> {item.description}</p>
              <p className="text-green-300 font-semibold">Promoting Social Justice:</p>
              <ul className="list-disc pl-5 text-gray-200 mb-2">
                <li><strong>Access:</strong> {item.socialJustice.access}</li>
                <li><strong>Equity:</strong> {item.socialJustice.equity}</li>
                <li><strong>Participation:</strong> {item.socialJustice.participation}</li>
              </ul>
              <p className="text-blue-300"><strong>Evaluation Data:</strong> {item.evaluation}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
