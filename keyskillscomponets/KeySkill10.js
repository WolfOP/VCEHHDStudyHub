import { useState } from 'react';

const components = [
  {
    id: 'medicare',
    name: 'Medicare',
    details: 'Universal health insurance scheme. Covers public hospital care and subsidises medical services.'
  },
  {
    id: 'pbs',
    name: 'Pharmaceutical Benefits Scheme (PBS)',
    details: 'Subsidises the cost of essential medications. Aims to make medicines affordable and accessible.'
  },
  {
    id: 'ndis',
    name: 'National Disability Insurance Scheme (NDIS)',
    details: 'Supports people with permanent and significant disabilities. Offers services, equipment, and financial support.'
  },
  {
    id: 'phi',
    name: 'Private Health Insurance',
    details: 'Optional insurance providing access to private hospitals, choice of doctor, and extras like dental or physio.'
  }
];

const criteria = ['Funding', 'Sustainability', 'Access', 'Equity'];

export default function KeySkill10() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (componentId, criterion, value) => {
    setResponses((prev) => ({
      ...prev,
      [componentId]: {
        ...prev[componentId],
        [criterion]: value,
      },
    }));
  };

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setResponses({});
    setSubmitted(false);
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🏥 Key Skill 10: Analyse Australia's Health System</h2>
      <p className="text-gray-300 mb-4">For each component, describe how it supports the following: funding, sustainability, access, and equity. Then compare your responses to model examples.</p>

      {components.map(({ id, name, details }) => (
        <div key={id} className="mb-6">
          <h3 className="text-lg font-bold text-purple-400 mb-1">{name}</h3>
          <p className="text-gray-400 italic mb-2">{details}</p>

          {criteria.map((criterion) => (
            <div key={criterion} className="mb-2">
              <label className="text-gray-300 font-semibold">{criterion}</label>
              <textarea
                className="w-full p-2 rounded bg-gray-700 text-white mb-1"
                rows={2}
                placeholder={`Describe how ${name} promotes ${criterion.toLowerCase()}`}
                value={responses[id]?.[criterion] || ''}
                onChange={(e) => handleChange(id, criterion, e.target.value)}
              />
              {submitted && (
                <p className="text-green-300 text-sm bg-gray-700 p-2 rounded">
                  <strong>Sample:</strong> {/* Real-world examples would go here in a real scenario */}
                  {' '}The {name} promotes {criterion.toLowerCase()} by ... (add actual sample response)
                </p>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>
          Show Sample Responses
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
}
