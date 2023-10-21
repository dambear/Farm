import React from "react"

function NutrientModal({ nutrientData, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-md">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl font-Oswald mb-4">Nutrient Details</h2>
        <div className="mx-8 py-6 ">
          <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
            <div className="inline-block min-w-full shadow rounded-xl overflow-hidden">
              <table className="min-w-full leading-normal bg-white">
                <thead>
                  <tr>
                    <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                      Function
                    </th>
                    <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                      Concentration
                    </th>
                    <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nutrientData.map((nutrient) => (
                    <tr
                      key={nutrient.n_id}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
                      <td className="text-center"> {nutrient.name}</td>
                      <td className="text-center">{nutrient.function}</td>
                      <td className="text-center">{nutrient.concentration}</td>
                      <td className="text-center">{nutrient.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutrientModal
