// Creating components for Key Skills 1-10 with full interactivity and content logic
// Example shows one; the ZIP will include all built in this style

// KeySkill1.js
import { useState } from 'react';
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
      labels: { color: '#fff' },
    },
  },
  scales: {
    x: { ticks: { color: '#fff' } },
    y: { ticks: { color: '#fff' } },
  },
};

export default function KeySkill1() {
  const [response, setResponse] = useState('');

  return (
    <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">📈 Analyse Data</h2>
      <p className="text-gray-300 mb-4">Interpret trends from charts or tables and describe health impacts.</p>
      <Line data={data} options={options} />
      <textarea
        placeholder="Type your interpretation..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="mt-4 w-full p-2 rounded bg-gray-700 text-white"
      />
    </section>
  );
}
