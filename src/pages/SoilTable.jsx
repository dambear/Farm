import React from "react"

function SoilTabl5e() {
  return (
    <div className="bg-gray-300 absolute p-5 right-0 w-5/6 h-screen">
      {/*
        <h1 className='text-2xl font-bold mb-4 '>Soil Module</h1>
      */}

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white mb-10">
          <thead className="bg-emerald-400 shadow-md">
            <tr>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center">
                Nutrient
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center">
                Optimal Range
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center">
                Unit
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center">
                Function
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/*ROW 1*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-red-600 bg-red-200 rounded-lg">
                  Nitrogen (N)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.05 - 0.15%
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                %
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Promotes leafy growth and overall vigor
              </td>
            </tr>

            {/*ROW 2*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-red-600 bg-red-200 rounded-lg">
                  Phosphorus (P)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                10 - 40 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                parts per million (ppm)
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Supports root development and flowering
              </td>
            </tr>

            {/*ROW 3*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-amber-600 bg-amber-200 rounded-lg">
                  Potassium (K)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                100 - 300 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Enhance disease resistance and fruiting
              </td>
            </tr>

            {/*ROW 4*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-orange-600 bg-orange-200 rounded-lg">
                  Calcium (Ca)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                1.5 - 4.0%
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                %
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Aids in cell wall structure and nutrient uptake
              </td>
            </tr>

            {/*ROW 5*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-orange-600 bg-orange-200 rounded-lg">
                  Magnesium (Mg)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.2 - 0.5%
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                %
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Essential for photosynthesis and enzyme activation
              </td>
            </tr>

            {/*ROW 6*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-red-600 bg-red-200 rounded-lg">
                  Sulfur (S)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.2 - 0.5%
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                %
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Important for amino acid and protein formation
              </td>
            </tr>

            {/*ROW 7*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-blue-600 bg-blue-200 rounded-lg">
                  Iron (Fe)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                2 - 5 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Essential for chlorophyll production
              </td>
            </tr>

            {/*ROW 8*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-blue-600 bg-blue-200 rounded-lg">
                  Manganese (Mn)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                1 - 10 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Involved in photosynthesis and enzyme activity
              </td>
            </tr>

            {/*ROW 9*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-blue-600 bg-blue-200 rounded-lg">
                  Zinc (Zn)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.5 - 2 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Essential for hormone regulation and growth
              </td>
            </tr>

            {/*ROW 10*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-blue-600 bg-blue-200 rounded-lg">
                  Copper (Cu)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.2 - 2 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Affects nutrient uptake and enzyme function
              </td>
            </tr>
            {/*ROW 11*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-gray-600 bg-gray-300 rounded-lg">
                  Boron (B)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                0.5 - 2 ppm
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                ppm
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Important for flower and fruit development
              </td>
            </tr>
            {/*ROW 12*/}
            <tr>
              <td className="p-1 text-sl font-medium text-gray-700 text-center border text-black">
                <span className="p-1.5 text-sl font-medium uppercase tracking-wider text-emerald-600 bg-emerald-300 rounded-lg">
                  pH (Acidity/Alkalinity)
                </span>
              </td>
              <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                6.0 - 6.8
              </td>
              <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                -
              </td>
              <td className="p-3 text-sl font-medium text-gray-700 text-center border text-black">
                Influence nutrient availability and microbial activity
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SoilTabl5e
