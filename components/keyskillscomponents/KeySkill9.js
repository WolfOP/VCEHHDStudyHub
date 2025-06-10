import { useState } from 'react';

const barriers = [
  {
    id: 'education',
    name: 'Low Education & Cooking Skills',
    example: 'Lack of knowledge makes it hard to interpret food labels and plan healthy meals.'
  },
  {
    id: 'marketing',
    name: 'Food Marketing & Media',
    example: 'Junk food ads influence children to overconsume high-calorie snacks.'
  },
  {
    id: 'time',
    name: 'Time Constraints',
    example: 'Busy lifestyles lead to reliance on takeaway foods that are high in fat and salt.'
  },
  {
    id: 'income',
    name: 'Low Income & Food Security',
    example: 'Low-income households buy cheaper, unhealthy food due to affordability.'
  },
  {
    id: 'location',
    name: 'Geographic Location',
    example: 'People in rural areas may only have access to fast food outlets.'
  },
  {
    id: 'preference',
    name: 'Personal Preferences & Beliefs',
    example: 'Unhealthy foods are often more appealing and harder to resist.'
  },
  {
    id: 'culture',
    name: 'Cultural/Traditional Influences',
    example: 'Family diets and traditions may reinforce poor eating habits.'
  },
  {
    id: 'environment',
    name: 'Housing Environment',
    example: 'Limited cooking facilities reduce ability to prepare nutritious meals.'
  }
];

export default function KeySkill9() {
  const [responses, setResponses] = useState({});
  const [showExamples, setShowExamples] = useState(false);

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = () => setShowExamples(true);
  const handleReset = () => {
    setResponses({});
    setShowExamples(false);
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">⚠️ Key Skill 9: Barriers to Dietary Change</h2>
      <p className="text-gray-300 mb-4">Explain why each of the following makes it difficult to adopt healthier diets. Then compare your explanation to a real-world example.</p>

      {barriers.map(({ id, name, example }) => (
        <div key={id} className="mb-6">
          <h3 className="text-lg font-bold text-purple-400 mb-2">{name}</h3>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            rows={3}
            placeholder="Your explanation here..."
            value={responses[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
          />
          {showExamples && (
            <div className="bg-gray-700 text-green-300 p-3 rounded">
              <strong>Example:</strong> {example}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>
          Show Examples
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
}
