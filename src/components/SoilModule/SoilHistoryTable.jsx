import React, { useEffect, useState } from "react"
import { fetchSoilData } from "../../service/firebase/soilmoduleFunctions"
import NutrientModal from "./NutrientModal"
import editimg from "../../static/farmer/edit.png"
import addimg from "../../static/farmer/add.png"
import AddSoilData from "./AddSoilData"

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

function SoilHistoryTable() {
  const [soilData, setSoilData] = useState([])
  const [selectedNutrientData, setSelectedNutrientData] = useState(null)
  const [selectedSoilLandName, setSelectedSoilLandName] = useState(null)
  const [selectedSoilTestDate, setSelectedSoilTestDate] = useState(null)
  const [isAddSoilDataModalOpen, setIsAddSoilDataModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFromDate, setSelectedFromDate] = useState("")
  const [selectedToDate, setSelectedToDate] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Adjust the number of items per page as needed

  useEffect(() => {
    async function fetchData() {
      const data = await fetchSoilData()
      setSoilData(data)
    }

    fetchData()
  }, [])

  // Create a function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Create a function to go to the next page
  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredSoilData.length / itemsPerPage)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Create a function to generate an array of page numbers
  const generatePageNumbers = () => {
    const totalPages = Math.ceil(filteredSoilData.length / itemsPerPage)
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleFromDateChange = (event) => {
    setSelectedFromDate(event.target.value)
  }

  const handleToDateChange = (event) => {
    setSelectedToDate(event.target.value)
  }

  // Filtering and pagination
  const filteredSoilData = soilData.filter((item) => {
    const landNameMatch = item.fland_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const dateInRange =
      (!selectedFromDate ||
        new Date(item.soil_test_date.toDate()).setHours(0, 0, 0, 0) >=
          new Date(selectedFromDate).setHours(0, 0, 0, 0)) &&
      (!selectedToDate ||
        new Date(item.soil_test_date.toDate()).setHours(23, 59, 59, 999) <=
          new Date(selectedToDate + "T23:59:59.999Z"))

    return landNameMatch && dateInRange
  })

  filteredSoilData.sort((a, b) => {
    if (selectedFromDate || selectedToDate || searchQuery) {
      return a.soil_test_date.toDate() - b.soil_test_date.toDate()
    } else {
      return b.soil_test_date.toDate() - a.soil_test_date.toDate()
    }
  })

  const handleClearDateFilters = () => {
    setSelectedFromDate("")
    setSelectedToDate("")
    setSearchQuery("")
  }

  const openNutrientModal = (nutrientData, soilLandName, soilTestDate) => {
    setSelectedNutrientData(nutrientData)
    setSelectedSoilLandName(soilLandName)
    setSelectedSoilTestDate(soilTestDate)
  }

  const closeNutrientModal = () => {
    setSelectedNutrientData(null)
    setSelectedSoilLandName(null)
    setSelectedSoilTestDate(null)
  }

  const handleAddSoilData = () => {
    setIsAddSoilDataModalOpen(true)
  }

  const closeAddSoilDataModal = async () => {
    setIsAddSoilDataModalOpen(false)

    const updatedData = await fetchSoilData()
    setSoilData(updatedData)
  }

  const totalPages = Math.ceil(filteredSoilData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredSoilData.slice(startIndex, endIndex)

  return (
    <div className="mx-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search by Land Name"
            className="border rounded-lg py-2 px-3 w-64 focus:outline-none focus:ring focus:border-blue-300"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <button
            onClick={handleAddSoilData}
            className="bg-white text-green-500 border-[1px]  border-green-400 hover:bg-green-500 ml-8
                          flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-green-500/40
                          transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="font-semibold text-[14px] mt-[6.5px]">
              ADD SOIL DATA
            </span>{" "}
            <img className="w-6 ml-4 mt-[4px]" src={addimg} alt="" />
          </button>
        </div>

        {/* this is the page nav */}
        <div className="flex justify-center space-x-1">
          <button
            className="px-2 border rounded-lg bg-white"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <AiOutlineLeft />
          </button>
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-xl ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-white"
              } border`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 border rounded-lg bg-white"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>

      <div className="flex flex-row space-x-6 mt-4">
        <div className="space-x-2">
          <label className="text-sm font-semibold text-black">From Date:</label>

          <input
            type="date"
            placeholder="From Date"
            className="border rounded-lg py-2 px-3 w-40 focus:outline-none focus:ring focus:border-blue-300"
            value={selectedFromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="space-x-2">
          <label className="text-sm font-semibold text-black">To Date:</label>

          <input
            type="date"
            placeholder="To Date"
            className="border rounded-lg py-2 px-3 w-40 focus:outline-none focus:ring focus:border-blue-300"
            value={selectedToDate}
            onChange={handleToDateChange}
          />
        </div>

        <div>
          <button
            onClick={handleClearDateFilters}
            className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 ml-8
                          flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-blue-500/40
                          transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="font-semibold text-[14px] mt-[3.5px]">
              Clear Filters
            </span>{" "}
            <img className="w-6 ml-4 mt-[2.4px]" src={editimg} alt="" />
          </button>
        </div>
      </div>

      <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-xl overflow-hidden">
          <table className="min-w-full leading-normal bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                  Land Name
                </th>
                <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                  Location
                </th>
                <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                  Soil Quality
                </th>
                <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                  Soil Test Date
                </th>
                <th className="py-3 px-6 text-center bg-[#AAFF00] text-[#333333] font-semibold uppercase tracking-wider">
                  Nutrient
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.map((item) => (
                <tr className="hover:bg-gray-200 cursor-pointer" key={item.id}>
                  <td className="text-center py-2">{item.fland_name}</td>
                  <td className="text-center py-2">{item.fland_location}</td>
                  <td className="text-center py-2">{item.soil_quality}</td>
                  <td className="text-center py-2">
                    {item.soil_test_date.toDate().toLocaleDateString()}
                  </td>
                  <td className="text-center py-2">
                    <button
                      onClick={() =>
                        openNutrientModal(
                          item.nutrient,
                          item.fland_name,
                          item.soil_test_date.toDate().toLocaleDateString()
                        )
                      }
                      className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-1 pl-6 pr-2  rounded-3xl mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      <span className="font-semibold text-[14px] mt-[1.5px]">
                        VIEW
                      </span>{" "}
                      <img
                        className="w-5 ml-2 mt-[1.5px]"
                        src={editimg}
                        alt=""
                      />
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
            soilLandName={selectedSoilLandName}
            soilTestDate={selectedSoilTestDate}
            onClose={closeNutrientModal}
          />
        )}

        {isAddSoilDataModalOpen && (
          <AddSoilData
            onSubmit={(updatedData) => {
              // Implement your logic for handling the update here, e.g., calling an API or updating state.
              // After handling the update, you can close the modal.
              // For now, we'll just log the updated data.
              console.log("Updated Farmer Data:", updatedData)

              closeAddSoilDataModal()
            }}
            onClose={closeAddSoilDataModal}
          />
        )}
      </div>
    </div>
  )
}

export default SoilHistoryTable
