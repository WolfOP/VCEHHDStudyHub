import { useState } from 'react';

const initiatives = [
  {
    id: 'naccho',
    name: 'NACCHO',
    evaluation:
      'Federal funding increased Aboriginal participation in health policy. Seen as a model for self-determination. Improves holistic, culturally respectful care.',
  },
  {
    id: 'closegap',
    name: 'Close the Gap',
    evaluation:
      'Mixed success. Year 12 attainment improved. Child mortality declined 33%. Life expectancy and cancer outcomes still lagging.',
  },
  {
    id: 'goodhealth',
    name: 'Aboriginal Road to Good Health',
    evaluation:
      'Well received. Participants report weight loss and health improvements. Positively impacts physical, mental and social wellbeing.',
  },
  {
    id: 'careears',
    name: "Care for Kids' Ears",
    evaluation:
      'High awareness. 40% of mothers identified campaign. Participants showed improved symptom knowledge and behaviours.',
  },
  {
    id: 'moveitmob',
    name: 'Move it Mob Style',
    evaluation:
      'Positive feedback. In fourth season, community events well attended. Seen as culturally appropriate and engaging.',
  },
  {
    id: 'caac',
    name: 'Central Australian Aboriginal Congress (CAAC)',
    evaluation:
      'High participation due to community-run model. Offers relevant education and care. Promotes equity and engagement.',
  },
];

export default function KeySkill6() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setResponses({});
    setSubmitted(false);
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🎯 Key Skill 6: Evaluate Indigenous Health Initiatives</h2>
      <p className="text-gray-300 mb-4">
        For each initiative, describe how it improves health outcomes and promotes social justice. Then review the
        provided evaluation to compare.
      </p>

      {initiatives.map(({ id, name, evaluation }) => (
        <div key={id} className="mb-6">
          <h3 className="text-lg font-bold text-purple-400 mb-2">{name}</h3>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            rows={3}
            placeholder="Your evaluation here..."
            value={responses[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
          />
          {submitted && (
            <div className="bg-gray-700 text-green-300 p-3 rounded">
              <strong>Sample Evaluation:</strong> {evaluation}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Show Sample Evaluations
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
