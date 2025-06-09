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
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  const [modelSubmitted, setModelSubmitted] = useState(false);
  const [dragSubmitted, setDragSubmitted] = useState(false);
  const [key4Success, setKey4Success] = useState(false);
  const [key5Success, setKey5Success] = useState(false);

  const items = [
    { id: 1, text: 'Quitline – Develop Personal Skills' },
    { id: 2, text: 'Road to Good Health – Create Supportive Environments' },
    { id: 3, text: 'Care for Kids’ Ears – Strengthen Community Action' },
  ];
const initiatives = [
    { id: 1, text: 'Quit Campaign', category: 'Develop Personal Skills' },
    { id: 2, text: 'Pillow Program', category: 'Create Supportive Environments' },
    { id: 3, text: 'Aboriginal Road to Good Health', category: 'Strengthen Community Action' },
  ];
  const DropZone = ({ children, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'ITEM',
      drop: (item) => onDrop(item),
      collect: (monitor) => ({ isOver: monitor.isOver() }),
    });

    return (
      <div
        ref={drop}
        className={`p-4 mb-4 border-2 border-dashed rounded-xl min-h-[80px] ${isOver ? 'border-green-400' : 'border-gray-600'}`}
      >
        {children}
      </div>
    );
  };

  const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'ITEM',
      item: { id: item.id, text: item.text },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    return (
      <div
        ref={drag}
        className={`p-2 mb-2 bg-gray-700 rounded cursor-move ${isDragging ? 'opacity-50' : ''}`}
      >
        {item.text}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
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

        {/* Key Skill 2 */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">🏛️ Explain initiatives from 'Old' Public Health, Social Model, and Ottawa Charter</h2>
          <p className="text-gray-300 mb-4">Drag each initiative to the correct Ottawa Charter action area or model of health.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-purple-300">Initiatives</h3>
              {items.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
            <div>
              <h3 className="text-md font-bold mb-2 text-purple-300">Drop Zones</h3>
              <DropZone onDrop={() => setDragSubmitted(true)}>Create Supportive Environments</DropZone>
              <DropZone onDrop={() => setDragSubmitted(true)}>Develop Personal Skills</DropZone>
              <DropZone onDrop={() => setDragSubmitted(true)}>Strengthen Community Action</DropZone>
            </div>
          </div>
          {dragSubmitted && (
            <div className="mt-4 text-green-400">
              ✅ Nice work! Review how each initiative aligns with its respective action area.
            </div>
          )}
        </section>

        {/* Key Skill 3 */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">⚖️ Compare Biomedical and Social Models of Health</h2>
          <p className="text-gray-300 mb-4">
            Fill in the blanks below to compare how each model contributes to improved health outcomes.
          </p>
          <table className="w-full text-sm text-left text-gray-300 mb-4">
            <thead className="text-gray-400 border-b border-gray-600">
              <tr>
                <th className="p-2">Aspect</th>
                <th className="p-2">Biomedical Model</th>
                <th className="p-2">Social Model</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-2">Focus</td>
                <td className="p-2">Diagnosis and treatment</td>
                <td className="p-2">Prevention and health promotion</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Example Initiative</td>
                <td className="p-2">Surgery to remove tumour</td>
                <td className="p-2">Quitline</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Strength</td>
                <td className="p-2">Effective for treating many conditions</td>
                <td className="p-2">Addresses broader determinants of health</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Limitation</td>
                <td className="p-2">Does not address causes of illness</td>
                <td className="p-2">Effectiveness may take longer to show</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => setModelSubmitted(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Show Sample Summary
          </button>
          {modelSubmitted && (
            <div className="mt-4 text-green-400">
              ✅ Sample Summary: The biomedical model is essential for treating conditions once they occur, while the social model aims to prevent illness by addressing environmental and social factors. Both models work together to improve Australia's health status.
            </div>
          )}
        </section>

         {/* Key Skill 4 */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">🧩 Match Health Promotion Initiatives with Ottawa Charter Action Areas</h2>
          <p className="text-gray-300 mb-4">Drag each initiative to the correct Ottawa Charter action area.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-purple-300">Initiatives</h3>
              {initiatives.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
            <div>
              <h3 className="text-md font-bold mb-2 text-purple-300">Drop Zones</h3>
              <DropZone onDrop={() => setKey4Success(true)}>Develop Personal Skills</DropZone>
              <DropZone onDrop={() => setKey4Success(true)}>Create Supportive Environments</DropZone>
              <DropZone onDrop={() => setKey4Success(true)}>Strengthen Community Action</DropZone>
            </div>
          </div>
          {key4Success && (
            <div className="mt-4 text-green-400">
              ✅ Well done! You've linked initiatives correctly with Ottawa Charter action areas.
            </div>
          )}
        </section>

        {/* Key Skill 5 */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">🌏 Analyse Indigenous Health Initiatives</h2>
          <p className="text-gray-300 mb-4">Select the Ottawa Charter action area each initiative reflects and explain how it promotes social justice.</p>
          <div className="mb-4">
            <label className="block mb-2">Which Ottawa Charter action area does "Care for Kids' Ears" primarily reflect?</label>
            <select className="w-full p-2 bg-gray-700 text-white rounded">
              <option>Choose one...</option>
              <option>Develop Personal Skills</option>
              <option>Create Supportive Environments</option>
              <option>Reorient Health Services</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Explain how this initiative promotes social justice:</label>
            <textarea className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white" rows={3}></textarea>
          </div>
          <button
            onClick={() => setKey5Success(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          {key5Success && (
            <div className="mt-4 text-green-400">
              ✅ Great job! You've identified both the Ottawa Charter area and the social justice principle.
            </div>
          )}
        </section>

        {/* Placeholder Key Skills */}
        {[...Array(3)].map((_, i) => (
          <section
            key={i}
            className="bg-gray-800 rounded-xl p-6 shadow-md mb-6 opacity-60 border border-dashed border-gray-500"
          >
            <h2 className="text-lg font-medium mb-2">🔧 Key Skill Placeholder #{i + 6}</h2>
            <p className="text-gray-400">Coming soon...</p>
          </section>
        ))}
      </div>
    </DndProvider>
  );
}
