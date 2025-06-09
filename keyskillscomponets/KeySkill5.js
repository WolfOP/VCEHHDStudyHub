import { useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'Fit 4 Life Initiative',
    prompt: 'Which Ottawa Charter area is reflected most in this initiative, and how does it improve health outcomes?',
    sampleResponse:
      'Fit 4 Life reflects the action area "Create supportive environments" by offering safe spaces for physical activity. This improves physical health by increasing fitness and reducing risk of chronic disease.',
  },
  {
    id: 2,
    title: 'Deadly Choices Program',
    prompt: 'How does Deadly Choices demonstrate the use of Ottawa Charter action areas to promote health?',
    sampleResponse:
      'Deadly Choices uses "Reorient health services" by partnering with Aboriginal Medical Services to deliver culturally appropriate health promotion, improving access and trust.',
  },
  {
    id: 3,
    title: 'Aboriginal Road to Good Health',
    prompt: 'Explain how this program uses Ottawa Charter action areas to lead to improved health outcomes.',
    sampleResponse:
      'This program uses "Develop personal skills" through education about nutrition and exercise, which helps reduce diabetes risk and promote healthy lifestyles.',
  },
];

export default function KeySkill5() {
  const [responses, setResponses] = useState(caseStudies.map(() => ''));
  const [showExamples, setShowExamples] = useState(false);

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">📚 Key Skill 5: Analyse Health Promotion Programs</h2>
      <p className="text-gray-300 mb-4">
        Read each case study and explain how the initiative applies Ottawa Charter action areas and contributes to
        improved health.
      </p>

      {caseStudies.map((study, index) => (
        <div key={study.id} className="mb-6">
          <h3 className="text-lg text-purple-300 font-semibold mb-2">{study.title}</h3>
          <p className="text-gray-400 mb-2 italic">{study.prompt}</p>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows={4}
            placeholder="Write your response here..."
            value={responses[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {showExamples && (
            <p className="text-green-400 text-sm mt-1">💡 Example: {study.sampleResponse}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500"
          onClick={() => setShowExamples(true)}
        >
          Show Examples
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => {
            setResponses(caseStudies.map(() => ''));
            setShowExamples(false);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}