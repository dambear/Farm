// src/components/FarmerTable.js
import React, { useEffect, useState } from 'react';
import { fetchFarmerData } from '../service/firebaseFunctions';

function FarmerTable() {
  const [farmerData, setFarmerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFarmerData();
      setFarmerData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Farmer Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {farmerData.map((farmer) => (
            <tr key={farmer.farmer_id}>
              <td className="py-2 px-4 border-b">{farmer.farmer_id}</td>
              <td className="py-2 px-4 border-b">{farmer.first_name}</td>
              <td className="py-2 px-4 border-b">{farmer.last_name}</td>
              <td className="py-2 px-4 border-b">{farmer.age}</td>
              <td className="py-2 px-4 border-b">{farmer.contact_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerTable;
