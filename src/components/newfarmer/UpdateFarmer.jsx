import { updateFarmerData } from "../../service/firebase/farmerFunction"
import React, { useState, useEffect } from "react"

import updateimg from "../../static/farmer/update.png"

import editimg from "../../static/farmer/edit.png"
import cancelimg from "../../static/farmer/cancel.png"

const UpdateFarmer = ({ selectedFarmer, onSubmit, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    farmer_id: selectedFarmer.farmer_id,
    farmer_profile: 1,
    first_name: selectedFarmer.first_name,
    last_name: selectedFarmer.last_name,
    birthdate: selectedFarmer.birthdate,
    gender: selectedFarmer.gender,
    contact_number: selectedFarmer.contact_number,
    farmer_address: selectedFarmer.farmer_address,
  })

  useEffect(() => {
    if (updatedData.gender === "male") {
      setUpdatedData((prevData) => ({
        ...prevData,
        farmer_profile: 1,
      }))
    } else if (updatedData.gender === "female") {
      setUpdatedData((prevData) => ({
        ...prevData,
        farmer_profile: 2,
      }))
    } else {
      setUpdatedData((prevData) => ({
        ...prevData,
        farmer_profile: 3,
      }))
    }
  }, [updatedData.gender])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "first_name" || name === "last_name") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1)
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: capitalizedValue,
      }))
    } else if (name === "contact_number") {
      const numericInput = value.replace(/\D/g, "").slice(0, 11)
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: numericInput,
      }))
    } else {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation: Check if required fields are not empty
    if (
      updatedData.first_name.trim() === "" ||
      updatedData.last_name.trim() === "" ||
      updatedData.birthdate.trim() === "" ||
      updatedData.gender.trim() === "" ||
      updatedData.contact_number.trim() === "" ||
      updatedData.farmer_address.trim() === ""
    ) {
      console.error("All fields are required.")
      return
    }

    try {
      await updateFarmerData(selectedFarmer.farmer_id, updatedData)
      console.log("Farmer data updated successfully.")
      onClose()
    } catch (error) {
      console.error("Error updating farmer data: ", error)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white  w-96 mx-auto rounded-3xl shadow-lg z-50 p-6">
        <div className="modal-content ">
          <div className="flex justify-center">
            <div className="w-12">
              <img src={updateimg} alt="" />
            </div>

            <span className="text-center text-xl font-medium mt-3 ml-2">
              Update Farmer Data
            </span>
          </div>

          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div>
                  <label className="text-sm font-semibold text-black">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={updatedData.first_name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-black">
                    Last Name:
                  </label>

                  <input
                    type="text"
                    name="last_name"
                    value={updatedData.last_name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <div>
                  <label className="text-sm font-semibold text-black">
                    Birthdate:
                  </label>

                  <input
                    type="date"
                    name="birthdate"
                    value={updatedData.birthdate}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-black">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={updatedData.gender}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mt-4">
                  <label className="text-sm font-semibold text-black">
                    Contact Number:
                  </label>

                  <input
                    type="text"
                    name="contact_number"
                    value={updatedData.contact_number}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-black">
                    Farmer Address:
                  </label>

                  <textarea
                    name="farmer_address"
                    value={updatedData.farmer_address}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center mt-4 ml-2">
                <button
                  type="submit"
                  className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[14px] mt-[1.5px] ml-28">
                    UPDATE
                  </span>
                  <img className="w-5 mt-[1.5px] ml-24" src={editimg} alt="" />
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className=" text-white border-[1px]  border-red-400 bg-red-500 mt-2
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[14px] mt-[1.5px] ml-28">
                    CANCEL
                  </span>
                  <img className="w-5 mt-[1.5px] ml-24" src={cancelimg} alt="" />
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateFarmer
