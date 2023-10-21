import React, { useState, useEffect } from "react"
import FarmerPreview from "./FarmerPreview"
import { getFImg } from "../../utils/weather/farmerUtils"
import UpdateFarmer from "./UpdateFarmer"
import { fetchFarmerData } from "../../service/firebase/farmerFunction"

function NewFarmerTable() {
  const [farmerData, setFarmerData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [filteredFarmers, setFilteredFarmers] = useState()
  const [showFarmerPreview, setShowFarmerPreview] = useState(false)
  const [isUpdateFarmerModalOpen, setIsUpdateFarmerModalOpen] = useState(false)
  const [selectedFarmerForUpdate, setSelectedFarmerForUpdate] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFarmerData()
      setFarmerData(data)
    }

    fetchData()
  }, [])

  // Function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate)
    const currentDate = new Date()
    const age = currentDate.getFullYear() - birthDate.getFullYear()
    return age
  }

  const handleEdit = (farmer, e) => {
    e.stopPropagation()
    setSelectedFarmer(farmer)

    // Open the UpdateFarmer modal when the edit button is clicked
    setIsUpdateFarmerModalOpen(true)

    // Set the selected farmer data for editing
    setSelectedFarmerForUpdate(farmer)
  }

  const closeUpdateFarmerModal = () => {
    // Close the UpdateFarmer modal
    setIsUpdateFarmerModalOpen(false)

    // Clear the selected farmer data
    setSelectedFarmerForUpdate(null)
  }

  const handleDelete = (farmerId, e) => {
    e.stopPropagation()
    const confirmed = window.confirm(
      "Are you sure you want to delete this farmer?"
    )
    if (confirmed) {
      const updatedFarmers = filteredFarmers.filter(
        (farmer) => farmer.farmer_id !== farmerId
      )
      setFilteredFarmers(updatedFarmers)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    const updatedFarmers = farmerData.farmers.filter((farmer) => {
      const fullName = `${farmer.first_name} ${farmer.last_name}`
      return fullName.toLowerCase().includes(query)
    })
    setFilteredFarmers(updatedFarmers)
  }

  const handleRowClick = (farmer) => {
    setSelectedFarmer(farmer)
    setShowFarmerPreview(true)
  }

  const closeFarmerPreview = () => {
    setShowFarmerPreview(false)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Full Name"
            className="border rounded-lg py-2 px-3 w-64 focus:outline-none focus:ring focus:border-blue-300"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider"></th>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider">
                  Farmer ID
                </th>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider">
                  Full Name
                </th>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider">
                  Age
                </th>
                <th className="py-3 px-6 text-left bg-blue-500 text-white font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {farmerData.map((farmer) => (
                <tr
                  key={farmer.farmer_id}
                  className="hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRowClick(farmer)}
                >
                  <td className="py-4 px-6">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={getFImg(farmer.farmer_profile)}
                      alt={farmer.farmer_profile}
                    />
                  </td>
                  <td className="py-4 px-6">{farmer.farmer_id}</td>
                  <td className="py-4 px-6">{`${farmer.first_name} ${farmer.last_name}`}</td>
                  <td className="py-4 px-6">{farmer.contact_number}</td>
                  <td className="py-4 px-6">
                    {calculateAge(farmer.birthdate)}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={(e) => handleEdit(farmer, e)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(farmer.farmer_id, e)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showFarmerPreview && (
        <FarmerPreview
          selectedFarmer={selectedFarmer}
          onClose={closeFarmerPreview}
          farmerData={farmerData}
        />
      )}
      {isUpdateFarmerModalOpen && (
        <UpdateFarmer
          farmerData={selectedFarmerForUpdate}
          onClose={closeUpdateFarmerModal}
        />
      )}
    </div>
  )
}

export default NewFarmerTable
