import React from "react"

import addDataimg from "../../static/farmer/addData.png"

import editimg from "../../static/farmer/edit.png"

function NutrientModal({ nutrientData, soilLandName, soilTestDate, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white mx-auto rounded-3xl shadow-lg z-50 p-6">
        <div className="modal-content ">
          <div className="flex justify-left mx-4">
            <div className="w-12">
              <img src={addDataimg} alt="" />
            </div>

            <span className="text-center text-xl font-medium mt-3 ml-2">
              Nutrient Details
            </span>

            <div className="ml-80">
              <button
                onClick={onClose}
                className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 ml-8
               flex hover:text-white font-sm py-1 pl-20  rounded-3xl shadow-md shadow-blue-500/40 w-56
               transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="font-semibold text-[14px] mt-[3.5px]">
                  CLOSE
                </span>{" "}
                <img className="w-7 ml-12 " src={editimg} alt="" />
              </button>
            </div>
          </div>

          <div className="flex space-x-16 mt-3 mb-4 mx-4 ">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-black">
                Land Name:&nbsp; &nbsp;
              </label>

              <div
                className="text-black border-[1px] border-[#AAFF00] bg-[#AAFF00] 
               hover:text-white rounded-3xl shadow-md shadow-[#AAFF00]
               transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="font-semibold text-[14px] mx-4">
                  {soilLandName}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <label className="text-sm font-semibold text-black">
                Soil Test Date: &nbsp; &nbsp;
              </label>

              <div
                className="text-black border-[1px] border-[#AAFF00] bg-[#AAFF00] 
               hover:text-white rounded-3xl shadow-md shadow-[#AAFF00]
               transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="font-semibold text-[14px] mx-4">
                  {soilTestDate}
                </span>
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="inline-block min-w-full shadow rounded-3xl overflow-hidden">
              <table className="min-w-full border-2  leading-normal bg-white">
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
                      <td className="text-center py-2"> {nutrient.name}</td>
                      <td className="text-center py-2">{nutrient.function}</td>
                      <td className="text-center py-2">
                        {nutrient.concentration}
                      </td>
                      <td className="text-center py-2 text-red-500">
                        {parseFloat(nutrient.score).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutrientModal
