// src/components/FarmerForm.js
import React, { useState } from "react"
import { BsFillClipboardPlusFill } from "react-icons/bs"
import { addFarmerData } from "../../service/firebase/firebaseFunctions"

function FarmerForm() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [contact_number, setContactNumber] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Regular expressions for validation
    const phoneNumberPattern = /^\d{11}$/
    const agePattern = /^\d{1,2}$/

    if (!phoneNumberPattern.test(contact_number)) {
      alert("Contact number must be 11 numeric characters.")
      return
    }

    if (!agePattern.test(age)) {
      alert("Age must be 1 to 2 numeric characters.")
      return
    }

    const docId = await addFarmerData(
      first_name,
      last_name,
      contact_number,
      age
    )
    if (docId) {
      alert(`Farmer added with ID: ${docId}`)
      // Clear input fields
      setFirstName("")
      setLastName("")
      setContactNumber("")
      setAge("")
    } else {
      alert("Failed to add farmer. Please try again.")
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white border-2 shadow-lg rounded-lg mt-10 shadow-md">
      <h2 className="flex items-center text-xl font-Oswald mb-4">
        <BsFillClipboardPlusFill size="24" className="fill-green-500 mr-2" />
        Add a Farmer
      </h2>
      <form onSubmit={handleSubmit}>
        {/*FIRSTNAME*/}
        <div className="relative mt-10">
          <input
            id="firstname"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-300 placeholder-transparent peer"
            placeholder="Enter Firstname:"
          />
          <label
            for="firstname"
            className="absolute left-2 -top-7 text-gray-600 text-sm 
          transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-black peer-focus:text-lg font-Gabarito"
          >
            Enter Firstname:
          </label>
        </div>

        {/*LASTNAME*/}
        <div className="relative mt-9">
          <input
            id="lastname"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-300 placeholder-transparent peer"
            placeholder="Enter Lastname:"
          />
          <label
            for="lastname"
            className="absolute left-2 -top-7 text-gray-600 text-sm 
          transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-black peer-focus:text-lg font-Gabarito"
          >
            Enter Lastname:
          </label>
        </div>

        {/*CONTACT*/}
        <div className="relative mt-9">
          <input
            id="contact"
            type="text"
            value={contact_number}
            onChange={(e) => {
              // Ensure only numeric input and limit to 11 characters
              const numericValue = e.target.value.replace(/\D/g, "")
              setContactNumber(numericValue.slice(0, 11))
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-300 placeholder-transparent peer"
            placeholder="Enter Contact (11 digits):"
          />
          <label
            for="contact"
            className="absolute left-2 -top-7 text-gray-600 text-sm 
          transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-black peer-focus:text-lg font-Gabarito"
          >
            Contact Number (11 digits):
          </label>
        </div>

        <div className="relative mt-9">
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => {
              // Ensure only numeric input and limit to 2 characters
              const numericValue = e.target.value.replace(/\D/g, "")
              setAge(numericValue.slice(0, 2))
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-300 placeholder-transparent peer"
            placeholder="Age (1-2 digits):"
          />
          <label
            for="age"
            className="absolute left-2 -top-7 text-gray-600 text-sm 
          transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-black peer-focus:text-lg font-Gabarito"
          >
            Age (1-2 digits):
          </label>
        </div>

        <button
          type="submit"
          className="text-white text-lg mt-3 font-semibold px-4 py-2 rounded-md mr-2 border-2 border-emerald-500 bg-emerald-500 
          hover:bg-white hover:text-emerald-500 duration-300 ease-in-out hover:scale-110 hover:shadow-lg transition-colors"
        >
          Add Farmer
        </button>
      </form>
    </div>
  )
}

export default FarmerForm
