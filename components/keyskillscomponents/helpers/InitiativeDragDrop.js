import { useState } from 'react';

const ottawaAreas = [
  'Build healthy public policy',
  'Create supportive environments',
  'Strengthen community action',
  'Develop personal skills',
  'Reorient health services'
];

export default function InitiativeDragDrop({ initiatives, showAnswers }) {
  const [placements, setPlacements] = useState({});

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, area) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    setPlacements((prev) => ({ ...prev, [id]: area }));
  };

  const getPlacedInitiatives = (area) =>
    Object.entries(placements)
      .filter(([, placedArea]) => placedArea === area)
      .map(([id]) => initiatives.find((item) => item.id === id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold text-purple-300 mb-2">Initiatives</h3>
        <div className="space-y-2">
          {initiatives.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="p-2 bg-gray-600 rounded cursor-move"
            >
              <p>{item.name}</p>
              {showAnswers && (
                <p className="text-xs text-green-300">{item.ottawaArea}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {ottawaAreas.map((area) => (
          <div
            key={area}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, area)}
            className="min-h-[80px] p-2 bg-gray-700 rounded"
          >
            <p className="font-semibold mb-1 text-yellow-300">{area}</p>
            {getPlacedInitiatives(area).map((item) => (
              <div key={item.id} className="p-1 bg-gray-500 rounded mb-1">
                {item.name}
              </div>
            ))}
            {showAnswers &&
              initiatives
                .filter(
                  (init) =>
                    init.ottawaArea === area &&
                    !getPlacedInitiatives(area).some((i) => i.id === init.id)
                )
                .map((init) => (
                  <div
                    key={init.id}
                    className="p-1 bg-gray-500 rounded mb-1 opacity-50"
                  >
                    {init.name}
                  </div>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}
