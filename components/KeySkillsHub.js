// components/KeySkillsHub.js
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['1900', '1920', '1940', '1960', '1980', '2000', '2022'],
  datasets: [
    {
      label: 'Male Life Expectancy',
      data: [50, 57, 63, 68, 72, 76, 80],
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    {
      label: 'Female Life Expectancy',
      data: [55, 60, 67, 72, 78, 82, 84],
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#fff' },
    },
    y: {
      ticks: { color: '#fff' },
    },
  },
};

export default function KeySkillsHub() {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Unit 3 SAC 2 – Key Skills Hub</h1>

      {/* Key Skill 1 */}
      <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">🔍 Analyse data that shows improvements in health over time</h2>

        <div className="mb-6">
          <Line data={data} options={options} />
        </div>

        <div className="mb-4">
          <label htmlFor="response" className="block mb-2 font-medium">
            Why has life expectancy improved between 1900 and 2022?
          </label>
          <textarea
            id="response"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Discuss public health initiatives, biomedical advancements, and social health models..."
          ></textarea>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Submit Response
        </button>

        {submitted && (
          <div className="mt-4 text-green-400">
            ✅ Great! Reflect on how your answer links improvements to specific policies or models.
          </div>
        )}
      </section>

      {/* Placeholder Key Skills */}
      {[...Array(8)].map((_, i) => (
        <section
          key={i}
          className="bg-gray-800 rounded-xl p-6 shadow-md mb-6 opacity-60 border border-dashed border-gray-500"
        >
          <h2 className="text-lg font-medium mb-2">🔧 Key Skill Placeholder #{i + 2}</h2>
          <p className="text-gray-400">Coming soon...</p>
        </section>
      ))}
    </div>
  );
}
