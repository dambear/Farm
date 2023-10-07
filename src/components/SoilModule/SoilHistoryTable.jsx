import React, { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { PiPottedPlantBold } from "react-icons/pi";
import { fetchSoilData } from "../../service/firebase/soilmoduleFunctions" // Make sure to adjust the import path as needed

import NutrientModal from "./NutrientModal" // Import the NutrientModal component

function SoilHistoryTable() {
  const [soilData, setSoilData] = useState([])
  const [selectedNutrientData, setSelectedNutrientData] = useState(null)

  useEffect(() => {
    // Fetch soil data when the component mounts
    async function fetchData() {
      const data = await fetchSoilData()
      setSoilData(data)
    }

    fetchData()
  }, [])

  // Function to handle opening the nutrient modal
  const openNutrientModal = (nutrientData) => {
    setSelectedNutrientData(nutrientData)
  }

  // Function to handle closing the nutrient modal
  const closeNutrientModal = () => {
    setSelectedNutrientData(null)
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-Oswald mb-4">Soil Data Table</h1>

      <div className="overflow-auto rounded-md">
      <table className="min-w-full  border shadow-md">
        <thead className="bg-emerald-400">
          <tr>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Land ID</th>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Land Name</th>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Location</th>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Soil Quality</th>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Soil Test Date</th>
            <th className="py-3 px-4 text-center text-lg font-Gabarito border-b">Nutrient</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {soilData.map((item) => (
            <tr className="hover:bg-gray-100" key={item.id}>
              <td className="p-3 text-center text-lg font-semibold text-blue-500">
                {item.fland_id}
              </td>
              <td className="p-3 text-center text-lg text-black font-Opensans font-bold">{item.fland_name}</td>
              <td className="p-3 text-lg font-Opensans flex items-center justify-center ">
                  <CiLocationOn size="20" className="mr-2 "/>
                  {item.fland_location}
              </td>
              <td className="p-3 text-center text-xl font-Bebasneue border-bx">
                {item.soil_quality}
              </td>
              <td className=" text-center border-b font-Bebasneue">
                <span className="px-4 py-1.5 text-xl font-medium uppercase tracking-wider 
                text-emerald-800 bg-emerald-300 rounded-lg bg-opacity-30">
                  {item.soil_test_date.toDate().toLocaleDateString()}
                </span>
              </td>
              <td className="p-3 flex border-b justify-center items-center">
                <button
                  className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded hover:scale-110 duration-300"
                  onClick={() => openNutrientModal(item.nutrient)}
                >
                  View Nutrient
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedNutrientData && (
        <NutrientModal
          nutrientData={selectedNutrientData}
          onClose={closeNutrientModal}
        />
      )}
    </div>
  )
}

export default SoilHistoryTable
