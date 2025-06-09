// KeySkill3.js
import { useState } from 'react';

const comparisonData = {
  biomedical: {
    strengths: [
      'Effective for treating acute conditions and emergencies',
      'Relies on advanced medical technologies and interventions',
      'Improves life expectancy and quality of life',
    ],
    limitations: [
      'Does not address broader determinants of health',
      'Often expensive and resource-intensive',
      'Focuses on treatment rather than prevention',
    ],
  },
  social: {
    strengths: [
      'Focuses on prevention and health promotion',
      'Addresses broader social and environmental determinants',
      'Encourages community participation and equity',
    ],
    limitations: [
      'May not provide immediate solutions for acute conditions',
      'Less visible impact in the short-term',
      'Requires intersectoral collaboration which can be challenging',
    ],
  },
};

export default function KeySkill3() {
  const [selectedModel, setSelectedModel] = useState('biomedical');

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🔬 Key Skill 3: Biomedical vs Social Model of Health</h2>
      <p className="text-gray-300 mb-4">Compare the strengths and limitations of the two models.</p>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedModel('biomedical')}
          className={`px-4 py-2 rounded ${selectedModel === 'biomedical' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Biomedical Model
        </button>
        <button
          onClick={() => setSelectedModel('social')}
          className={`px-4 py-2 rounded ${selectedModel === 'social' ? 'bg-green-500' : 'bg-gray-600'}`}
        >
          Social Model
        </button>
      </div>

      <div className="text-gray-200">
        <h3 className="font-semibold mb-2">Strengths:</h3>
        <ul className="list-disc list-inside mb-4">
          {comparisonData[selectedModel].strengths.map((item, index) => (
            <li key={`strength-${index}`}>{item}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-2">Limitations:</h3>
        <ul className="list-disc list-inside">
          {comparisonData[selectedModel].limitations.map((item, index) => (
            <li key={`limitation-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
