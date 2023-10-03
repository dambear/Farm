// src/components/FarmerTable.js
import React, { useEffect, useState } from "react"
import { BsFillTrashFill, BsPencilSquare, BsFillPersonVcardFill, BsFillTelephonePlusFill, BsQuestionCircleFill } from "react-icons/bs";
import {
  fetchFarmerData,
  deleteFarmerData,
  updateFarmerData,
} from "../../service/firebase/firebaseFunctions"

import UpdateFarmerModal from "./UpdateFarmerModal"

function FarmerTable() {
  const [farmerData, setFarmerData] = useState([])

  const [editingFarmer, setEditingFarmer] = useState(null)

  const [editedData, setEditedData] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    age: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFarmerData()
      setFarmerData(data)
    }

    fetchData()
  }, [])

  const handleDelete = async (farmer_id) => {
    try {
      // Call the handleDeleteFarmer function from firebaseFunctions.js
      await deleteFarmerData(farmer_id)

      // After deletion, you can fetch the updated data and update the state
      const updatedData = await fetchFarmerData()
      setFarmerData(updatedData)
    } catch (error) {
      console.error("Error deleting farmer: ", error)
    }
  }

  const handleEdit = (farmer) => {
    setEditingFarmer(farmer)
    setEditedData({
      farmer_id: farmer.farmer_id,
      first_name: farmer.first_name,
      last_name: farmer.last_name,
      contact_number: farmer.contact_number,
      age: farmer.age,
    })
  }

  const handleSave = async () => {
    try {
      if (editingFarmer) {
        console.log("Editing Farmer ID:", editingFarmer.farmer_id) // Check the value

        // Call the updateFarmerData function from firebaseFunctions.js
        await updateFarmerData(editingFarmer.farmer_id, editedData)

        // After updating, close the modal and fetch the updated data
        setEditingFarmer(null)
        const updatedData = await fetchFarmerData()
        setFarmerData(updatedData)
      }
    } catch (error) {
      console.error("Error updating farmer: ", error)
    }
  }

  const handleCloseModal = () => {
    setEditingFarmer(null)
  }

  return (
    <div className="p-4 ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Farmer Table</h2>
        <button class="bg-emerald-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 mb-4 rounded">
          Add Farmer
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        {/*TABLE*/}
        <table className="min-w-full bg-white">
          {/*TABLE HEADER*/}
          <thead className="bg-emerald-400 shadow-md">
            <tr>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center flex justify-center"><BsFillPersonVcardFill size='18' className='mr-1.5'/>
                ID
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center justify-center">
                First Name
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center justify-center">
                Last Name
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center justify-center">
                Age
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center justify-center">
                Contact Number
              </th>
              <th className="p-3 text-white text-lg font-semi-bold tracking-wide items-center flex justify-center">
                Actions
                  <div className="tooltip">
                    <BsQuestionCircleFill size='18' className='ml-1.5 hover:fill-emerald-700'/>
                    <span className='tooltip-text text-emerald-400 bg-white'>
                    <p className='flex font-semi-bold items-center'><BsPencilSquare size='24' className='fill-yellow-500 mr-1.5'/>Edit the Data </p>
                    <p className='flex items-center'><BsFillTrashFill size='24' className='fill-red-500 mr-1.5'/>Delete the Data</p>
                    </span>
                    </div>
              </th>{" "}
              {/* Add Actions column */}
            </tr>
          </thead>

          {/*TABLE BODY*/}
          <tbody className="divide-y divide-gray-100 ">
            {farmerData.map((farmer) => (
              <tr key={farmer.farmer_id} className="hover:bg-gray-200 border-b border-gray-300">
                <td className="p-3 text-xl font-medium  font-bold text-blue-500 text-center border">
                  {farmer.farmer_id}
                </td>
                <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                  {farmer.first_name}
                </td>
                <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                  {farmer.last_name}
                </td>
                <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                  {farmer.age}
                </td>
                <td className="p-3 text-xl font-medium text-gray-700 text-center border text-black">
                  <span className="p-1.5 text-xl font-medium uppercase tracking-wider text-emerald-800 bg-emerald-200 rounded-lg">
                  {farmer.contact_number}
                  </span>
                </td>
                <td className="p-5 text-gray-700 text-center justify-center border">
                  <button onClick={() => handleEdit(farmer)}>
                    <BsPencilSquare size="24" className="hover:fill-yellow-500  mr-4" />
                  </button>
                  <button onClick={() => handleDelete(farmer.farmer_id)}>
                    <BsFillTrashFill size="24" className="hover:fill-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingFarmer && (
        <UpdateFarmerModal
          farmer={editingFarmer}
          editedData={editedData}
          setEditedData={setEditedData}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  )
}

export default FarmerTable
