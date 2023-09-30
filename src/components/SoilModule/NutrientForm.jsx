// NutrientForm.jsx
import React, { useState } from 'react';
import { addNutrientData } from '../src/service/firebase/firebaseFunctions';

function NutrientForm() {
  const [fland_name, setFLand_Name] = useState('');
  const [fland_location, setFLand_Locataion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addNutrientData(fland_name, fland_location);

    if (success) {
      alert('Nutrients added successfully.');
      setFLand_Name('');
      setFLand_Locataion('');
    } else {
      alert('Failed to add nutrients. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enter Nutrients</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Fland Name:</label>
          <input
            type="text"
            value={fland_name}
            onChange={(e) => setFLand_Name(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Fland Location:</label>
          <input
            type="text"
            value={fland_location}
            onChange={(e) => setFLand_Locataion(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Nutrients
        </button>
      </form>
    </div>
  );
}

export default NutrientForm;
