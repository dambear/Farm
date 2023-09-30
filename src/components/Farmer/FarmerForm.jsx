// src/components/FarmerForm.js
import React, { useState } from "react";
import { addFarmerData } from "../../service/firebase/firebaseFunctions";

function FarmerForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const phoneNumberPattern = /^\d{11}$/;
    const agePattern = /^\d{1,2}$/;

    if (!phoneNumberPattern.test(contact_number)) {
      alert("Contact number must be 11 numeric characters.");
      return;
    }

    if (!agePattern.test(age)) {
      alert("Age must be 1 to 2 numeric characters.");
      return;
    }

    const docId = await addFarmerData(
      first_name,
      last_name,
      contact_number,
      age
    );
    if (docId) {
      alert(`Farmer added with ID: ${docId}`);
      // Clear input fields
      setFirstName("");
      setLastName("");
      setContactNumber("");
      setAge("");
    } else {
      alert("Failed to add farmer. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a Farmer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Contact Number (11 digits):
          </label>
          <input
            type="text"
            value={contact_number}
            onChange={(e) => {
              // Ensure only numeric input and limit to 11 characters
              const numericValue = e.target.value.replace(/\D/g, "");
              setContactNumber(numericValue.slice(0, 11));
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Age (1-2 digits):</label>
          <input
            type="text"
            value={age}
            onChange={(e) => {
              // Ensure only numeric input and limit to 2 characters
              const numericValue = e.target.value.replace(/\D/g, "");
              setAge(numericValue.slice(0, 2));
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Farmer
        </button>
      </form>
    </div>
  );
}

export default FarmerForm;
