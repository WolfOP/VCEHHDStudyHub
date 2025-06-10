import { useState } from 'react';

const initiatives = [
  {
    name: 'Provision of Clean Drinking Water',
    category: "Old Public Health",
    explanation: 'Improved sanitation reduced disease and improved life expectancy.',
  },
  {
    name: 'Mass Immunisation Programs',
    category: "Old Public Health / Health Promotion",
    explanation: 'Vaccination reduced infectious diseases and increased child survival.',
  },
  {
    name: 'Quitline',
    category: "Social Model of Health / Health Promotion",
    explanation: 'Supports behavioural change, reducing smoking-related illnesses.',
  },
  {
    name: 'Australian Dietary Guidelines',
    category: "Health Promotion",
    explanation: 'Encourages healthy eating, preventing obesity and diet-related diseases.',
  },
  {
    name: 'Aboriginal Road to Good Health Program',
    category: "Social Model / Indigenous Health",
    explanation: 'Culturally safe education reducing chronic disease risks for ATSI peoples.',
  },
];

export default function KeySkill2() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🏛️ Key Skill 2: Explain Health Initiatives & Models</h2>
      <p className="text-gray-300 mb-4">Select an initiative to explore how it promotes health using the Social Model or Old Public Health principles.</p>
      <div className="space-y-4">
        {initiatives.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelected(item)}
            className="w-full text-left p-3 bg-purple-700 rounded hover:bg-purple-600"
          >
            {item.name}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-6 p-4 bg-gray-700 rounded text-white">
          <h3 className="text-lg font-semibold mb-2">{selected.name}</h3>
          <p><strong>Category:</strong> {selected.category}</p>
          <p className="mt-2"><strong>Explanation:</strong> {selected.explanation}</p>
        </div>
      )}
    </section>
  );
}
