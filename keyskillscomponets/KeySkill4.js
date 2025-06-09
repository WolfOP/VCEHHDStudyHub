import { useState } from 'react';
import InitiativeDragDrop from './helpers/InitiativeDragDrop.js';

const initiatives = [
  {
    id: 'goodstart',
    name: 'Good Start Program',
    description:
      'Aims to promote healthy eating and exercise among Indigenous children through culturally appropriate programs.',
    ottawaArea: 'Develop personal skills',
  },
  {
    id: 'fit4life',
    name: 'Fit 4 Life',
    description:
      'Supports physical activity in Indigenous youth by providing sports and recreation in local communities.',
    ottawaArea: 'Create supportive environments',
  },
  {
    id: 'deadlychoices',
    name: 'Deadly Choices',
    description:
      'Encourages Indigenous Australians to make healthy lifestyle choices through education and media campaigns.',
    ottawaArea: 'Reorient health services',
  },
  {
    id: 'closinggap',
    name: 'Closing the Gap',
    description:
      'A national strategy aiming to reduce disadvantage among Aboriginal and Torres Strait Islander people, including health equity.',
    ottawaArea: 'Build healthy public policy',
  },
  {
    id: 'roadtohealth',
    name: 'Aboriginal Road to Good Health',
    description:
      'A free Type 2 diabetes prevention program teaching nutrition and lifestyle skills.',
    ottawaArea: 'Strengthen community action',
  },
];

export default function KeySkill4() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());

  const handleReset = () => {
    setResetKey(Date.now());
    setShowAnswers(false);
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">🎯 Key Skill 4: Health Promotion Matching</h2>
      <p className="text-gray-300 mb-4">
        Drag each initiative into its correct Ottawa Charter action area. Click "Show Answers" for help or use "Reset"
        to try again.
      </p>
      <InitiativeDragDrop key={resetKey} initiatives={initiatives} showAnswers={showAnswers} />

      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500"
          onClick={() => setShowAnswers(true)}
        >
          Show Answers
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
