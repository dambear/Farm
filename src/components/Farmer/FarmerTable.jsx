// src/components/FarmerTable.js
import React, { useEffect, useState } from "react"
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsFillPersonVcardFill,
  BsFillTelephonePlusFill,
  BsSearch
} from "react-icons/bs"
import {
  fetchFarmerData,
  deleteFarmerData,
  updateFarmerData,
} from "../../service/firebase/firebaseFunctions"

import { addMessageData } from "../../service/firebase/alertFunctions"

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

  const handleClick = () => {
    addMessageData()
    console.log("Button clicked!")
    // You can perform any actions or state updates here
  }

  const [search, setSearch] = useState('');
  console.log(search);

  return (
    <div className="p-4">
      <div className="flex justify-between">

        <div className="flex items-center border-2 p-2 rounded-3xl border-emerald-300 ml-2 mb-4 bg-gray-100">
          <BsSearch size="18" className="mr-2 fill-gray-500" />

          <input 
            type="search"
            placeholder="Search..."
            className="search text-black text-md focus:outline-none bg-gray-100  border-gray-500"
            onChange={(e) => setSearch(e.target.value)}/>
        </div>  

        <button
          class="text-white font-semibold py-2 px-4 mb-4 rounded-md border-2 border-emerald-400 bg-emerald-400
          hover:bg-white hover:text-emerald-400 hover:scale-110 hover:shadow-lg duration-300 ease-in-out"
          onClick={handleClick}>
          Add Farmer
        </button>
      </div>

      <div className="rounded shadow">
        {/*TABLE*/}
        <table className="min-w-full bg-white shadow-lg">
          {/*TABLE HEADER*/}
          <thead className="bg-emerald-400 shadow-md">
            <tr>
              <th className="p-3 text-lg font-Gabarito">
              <BsFillPersonVcardFill size="28" className="items-center ml-5"/>
              </th>
              <th
                className="p-3 text-lg font-Gabarito tracking-wide items-center justify-center">
                First Name
              </th>
              <th className="p-3  text-lg font-Gabarito tracking-wide items-center justify-center">
                Last Name
              </th>
              <th className="p-3  text-lg font-Gabarito tracking-wide items-center justify-center">
                Age
              </th>
              <th className="p-3 text-lg font-Gabarito tracking-wide items-center justify-center">
                Contact Number
              </th>
              <th className="p-3  text-lg font-Gabarito tracking-wide items-center flex justify-center">
                Actions
              </th>{" "}
              {/* Add Actions column */}
            </tr>
          </thead>

          {/*TABLE BODY*/}
          <tbody className="divide-y divide-gray-100">

            {farmerData
              .filter((farmer) => {
                return search.toLowerCase() === ''
                ? farmer
                : farmer.first_name.toLowerCase().includes(search);
              })
              .map((farmer) => (
              <tr
                key={farmer.farmer_id}
                className="hover:bg-gray-100 border-b "
              >
                <td className="p-3 text-xl font-medium font-bold text-blue-500 text-center border-b">
                  {farmer.farmer_id}
                </td>
                <td className="p-3 text-xl font-semibold text-center text-black border-b duration-100 hover:shadow-lg ease-in-out hover:scale-110 ">
                  {farmer.first_name}
                </td>
                <td className="p-3 text-xl font-semibold text-center text-black border-b duration-100 hover:shadow-lg ease-in-out hover:scale-110 ">
                  {farmer.last_name}
                </td>
                <td className="p-3 text-2xl font-Bebasneue text-center text-black border-b duration-100 hover:shadow-lg ease-in-out hover:scale-110">
                    {farmer.age}
                </td>
                <td className="p-3 text-center justify-center text-xl font-medium text-center text-black border-b">
                <span className="flex items-center justify-center">
                  <BsFillTelephonePlusFill size="20" className="mr-3 fill-green-500"/>{farmer.contact_number}
                </span>
                </td>
                <td className="p-3 flex items-center text-gray-700 text-center justify-center border-b ">
                    <button class="py-2 px-4 rounded-xl flex items-center mr-2.5 text-xl font-navheader border-2 border-yellow-300 bg-yellow-300
                    hover:bg-transparent hover:text-yellow-500 duration-300 hover:shadow-lg ease-in-out transition-colors hover:scale-110" 
                    onClick={() => handleEdit(farmer)}>
                    <BsPencilSquare size="20" className="mr-2"/>
                      Edit
                    </button>
                    <button class="py-2 px-4 rounded-xl flex items-center text-xl font-navheader border-2 border-red-400 bg-red-400
                    hover:bg-transparent hover:text-red-500 duration-300 hover:shadow-lg ease-in-out transition-colors hover:scale-110" 
                    onClick={() => handleDelete(farmer.farmer_id)}>
                    <BsFillTrashFill size="20" className="mr-2"/>Delete
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
