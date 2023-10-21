import React, { useEffect, useState } from "react"
import { addFarmerData } from "../../service/firebase/farmerFunction"

function AddFarmer() {
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

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Farmer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            value={first_name}
            onChange={(e) =>
              setFirstName(capitalizeFirstLetter(e.target.value))
            }
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(capitalizeFirstLetter(e.target.value))}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Birthdate:
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option> {/* Initial empty option */}
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number (11 digits):
          </label>
          <input
            type="tel"
            value={contact_number}
            onChange={(e) => {
              // Allow only numeric input
              const numericInput = e.target.value.replace(/\D/g, "")
              setContactNumber(numericInput.slice(0, 11)) // Limit to 11 characters
            }}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Farmer Address:
          </label>
          <textarea
            value={farmer_address}
            onChange={(e) => setFarmerAddress(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Farmer
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddFarmer
