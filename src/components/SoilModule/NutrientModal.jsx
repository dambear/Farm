import React from 'react';

function NutrientModal({ nutrientData, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl font-Oswald mb-4">Nutrient Details</h2>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-center font-Gabarito bg-gray-100 border-b">Name</th>
              <th className="py-2 px-4 text-center font-Gabarito bg-gray-100 border-b">Function</th>
              <th className="py-2 px-4 text-center font-Gabarito bg-gray-100 border-b">Concentration</th>
              <th className="py-2 px-4 text-center font-Gabarito bg-gray-100 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {nutrientData.map((nutrient) => (
              <tr key={nutrient.n_id}>
                <td className="py-2 px-4 text-center border-b font-bold">{nutrient.name}</td>
                <td className="py-2 px-4 text-center border-b font-Opensans">{nutrient.function}</td>
                <td className="py-2 px-4 text-center border-b font-Bebasneue text-lg">{nutrient.concentration}</td>
                <td className="py-2 px-4 text-center border-b font-Bebasneue text-lg text-red-500">{nutrient.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default NutrientModal;
