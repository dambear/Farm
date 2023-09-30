import React from "react"
import { updateDoc } from "firebase/firestore"

/*UPDATE*/

function UpdateFarmerModal({
  farmer,
  editedData,
  setEditedData,
  handleSave,
  handleCloseModal,
}) {
  // Validation and submission logic
  const handleModalSubmit = async (e) => {
    e.preventDefault()

    // Regular expressions for validation
    const phoneNumberPattern = /^\d{11}$/
    const agePattern = /^\d{1,2}$/

    if (!phoneNumberPattern.test(editedData.contact_number)) {
      alert("Contact number must be 11 numeric characters.")
      return
    }

    if (!agePattern.test(editedData.age)) {
      alert("Age must be 1 to 2 numeric characters.")
      return
    }

    handleSave()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Farmer</h2>
        <form onSubmit={handleModalSubmit}>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={editedData.first_name}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  first_name: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={editedData.last_name}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  last_name: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Age</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={editedData.age}
              onChange={(e) => {
                // Ensure only numeric input and limit to 2 characters
                const numericValue = e.target.value.replace(/\D/g, "")
                setEditedData({
                  ...editedData,
                  age: numericValue.slice(0, 2),
                })
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Contact Number</label>
            <input
              type="text"
              className="border rounded-md w-full p-2"
              value={editedData.contact_number}
              onChange={(e) => {
                // Ensure only numeric input and limit to 11 characters
                const numericValue = e.target.value.replace(/\D/g, "")
                setEditedData({
                  ...editedData,
                  contact_number: numericValue.slice(0, 11),
                })
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateFarmerModal
