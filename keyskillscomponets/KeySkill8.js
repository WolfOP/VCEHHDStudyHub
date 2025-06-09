import { useState } from 'react';

const healthyEatingInitiatives = [
  {
    id: 'adg',
    name: 'Australian Dietary Guidelines (ADGs)',
    evaluation:
      'Provides evidence-based dietary advice. Generalised language and lack of visual aids are limitations. No outcome data in sources.',
  },
  {
    id: 'aghe',
    name: 'Australian Guide to Healthy Eating (AGHE)',
    evaluation:
      'Visual tool for dietary guidance. Useful for Guidelines 2 and 3. Hard to classify mixed foods. No outcome data in sources.',
  },
  {
    id: 'hep',
    name: 'Healthy Eating Pyramid (HEP)',
    evaluation:
      'Visual model by Nutrition Australia. Includes lifestyle tips. Adapted for various cultures. Hard to classify foods.',
  },
  {
    id: 'nutritionaus',
    name: 'Nutrition Australia',
    evaluation:
      'Provides multiple resources and programs. Includes Healthy Eating Advisory Service and National Nutrition Week. No impact data in sources.',
  },
  {
    id: 'hsrs',
    name: 'Health Star Rating System (HSRS)',
    evaluation:
      'Rates packaged foods. Not detailed in sources. May have low awareness or manipulation issues.',
  },
  {
    id: 'atsiguide',
    name: 'Aboriginal and Torres Strait Islander Guide to Healthy Eating',
    evaluation:
      'Culturally tailored version of AGHE. Aims to support healthy eating in Indigenous communities. No impact data provided.',
  },
];

export default function KeySkill8() {
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
      <h2 className="text-xl font-semibold mb-4">🥗 Key Skill 8: Evaluate Healthy Eating Initiatives</h2>
      <p className="text-gray-300 mb-4">
        Write your evaluation of each healthy eating initiative. Then click to view the sample evaluation for comparison.
      </p>

      {healthyEatingInitiatives.map(({ id, name, evaluation }) => (
        <div key={id} className="mb-6">
          <h3 className="text-lg font-bold text-yellow-300 mb-2">{name}</h3>
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
