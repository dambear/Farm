import React, { useEffect, useState } from 'react';
import { fetchSoilData } from './service/firebase/firebaseFunctions'; // Make sure to adjust the import path as needed

import NutrientModal from './NutrientModal'; // Import the NutrientModal component

function SoilTable() {
  const [soilData, setSoilData] = useState([]);
  const [selectedNutrientData, setSelectedNutrientData] = useState(null);

  useEffect(() => {
    // Fetch soil data when the component mounts
    async function fetchData() {
      const data = await fetchSoilData();
      setSoilData(data);
    }

    fetchData();
  }, []);

  // Function to handle opening the nutrient modal
  const openNutrientModal = (nutrientData) => {
    setSelectedNutrientData(nutrientData);
  };

  // Function to handle closing the nutrient modal
  const closeNutrientModal = () => {
    setSelectedNutrientData(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Soil Data Table</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b">Land ID</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Land Name</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Location</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Soil Quality</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Soil Test Date</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Nutrient</th>
          </tr>
        </thead>
        <tbody>
          {soilData.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.fland_id}</td>
              <td className="py-2 px-4 border-b">{item.fland_name}</td>
              <td className="py-2 px-4 border-b">{item.fland_location}</td>
              <td className="py-2 px-4 border-b">{item.soil_quality}</td>
              <td className="py-2 px-4 border-b">{item.soil_test_date.toDate().toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => openNutrientModal(item.nutrient)}
                >
                  View Nutrient
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedNutrientData && (
        <NutrientModal nutrientData={selectedNutrientData} onClose={closeNutrientModal} />
      )}
    </div>
  );
}

export default SoilTable;