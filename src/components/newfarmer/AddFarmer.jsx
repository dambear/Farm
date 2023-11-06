import React, { useState, useEffect } from "react"

import { addFarmerData } from "../../service/firebase/farmerFunction"

import addimg from "../../static/farmer/add.png"
import cancelimg from "../../static/farmer/cancel.png"

import addDataimg from "../../static/farmer/addData.png"

const AddFarmer = ({ onSubmit, onClose }) => {
  // Initialize state variables
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [gender, setGender] = useState("") // Gender is initially empty
  const [contact_number, setContactNumber] = useState("")
  const [farmer_address, setFarmerAddress] = useState("")

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ensure contact number is exactly 11 characters long
    if (contact_number.length !== 11) {
      alert("Contact number must be 11 characters long.")
      return // Prevent form submission if length is not 11 characters
    }

    try {
      // Call the addFarmerData function with form input values
      const farmer_id = await addFarmerData(
        first_name,
        last_name,
        birthdate,
        gender,
        contact_number,
        farmer_address
      )

      if (farmer_id) {
        // Success message or redirection
        console.log(`Farmer added with ID: ${farmer_id}`)
        // Reset form input fields
        setFirstName("")
        setLastName("")
        setBirthdate("")
        setGender("")
        setContactNumber("")
        setFarmerAddress("")

        onSubmit()
      } else {
        // Handle error case
        console.error("Error adding farmer.")
      }
    } catch (error) {
      console.error("Error adding farmer: ", error)
    }
  }

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
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
              <img src={addDataimg} alt="" />
            </div>

            <span className="text-center text-xl font-medium mt-3 ml-2">
              Add Farmer Data
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
                    value={first_name}
                    onChange={(e) =>
                      setFirstName(capitalizeFirstLetter(e.target.value))
                    }
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
                    value={last_name}
                    onChange={(e) =>
                      setLastName(capitalizeFirstLetter(e.target.value))
                    }
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
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
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
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    <option value="">Select Gender</option>{" "}
                    {/* Initial empty option */}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                    value={contact_number}
                    onChange={(e) => {
                      // Allow only numeric input
                      const numericInput = e.target.value.replace(/\D/g, "")
                      setContactNumber(numericInput.slice(0, 11)) // Limit to 11 characters
                    }}
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
                    value={farmer_address}
                    onChange={(e) => setFarmerAddress(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center mt-4 ml-2">
                <button
                  type="submit"
                  className="bg-white text-green-500 border-[1px]  border-green-400 hover:bg-green-500 
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-green-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[14px] mt-[1.5px] ml-24">
                    ADD FARMER
                  </span>
                  <img
                    className="w-5 mt-[1.5px] ml-[70px]"
                    src={addimg}
                    alt=""
                  />
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
                  <img
                    className="w-5 mt-[1.5px] ml-24"
                    src={cancelimg}
                    alt=""
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFarmer
