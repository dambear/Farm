// src/components/FarmerTable.js
import React, { useEffect, useState } from "react"
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs"
import {
  fetchFarmerData,
  deleteFarmerData,
  updateFarmerData,
} from "../../service/firebase/firebaseFunctions"

function AlertHistoryTable() {
  const [farmerData, setFarmerData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFarmerData()
      setFarmerData(data)
    }

    fetchData()
  }, [])

  return (
    <div className="p-4 ">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Farmer Table</h2>
        <h2 className="text-xl font-semibold mb-4">Add Farmer Button</h2>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        {/*TABLE*/}
        <table className="min-w-full bg-white border border-gray-300">
          {/*TABLE HEADER*/}
          <thead className="bg-gray-50 border-b-2 gray-200">
            <tr>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                First Name
              </th>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                Last Name
              </th>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                Age
              </th>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                Contact Number
              </th>
              <th className="p-3 text-sm font-semi-bold tracking-wide text-left">
                Actions
              </th>{" "}
              {/* Add Actions column */}
            </tr>
          </thead>

          {/*TABLE BODY*/}
          <tbody className="divide-y divide-gray-100 ">
            {farmerData.map((farmer) => (
              <tr key={farmer.farmer_id}>
                <td className="p-3 text-sm font-bold text-blue-500 ">
                  {farmer.farmer_id}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {farmer.first_name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {farmer.last_name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {farmer.age}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {farmer.contact_number}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button onClick={() => handleEdit(farmer)}>
                    <BsPencilSquare size="24" className="fill-yellow-500" />
                  </button>
                  <button onClick={() => handleDelete(farmer.farmer_id)}>
                    <BsFillTrashFill size="24" className="fill-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AlertHistoryTable
