import React, { useState } from "react"
import { addNutrientData } from "../../service/firebase/soilmoduleFunctions"

import addimg from "../../static/farmer/add.png"
import cancelimg from "../../static/farmer/cancel.png"

import addDataimg from "../../static/farmer/addData.png"

function AddSoilData({ onClose }) {
  const [fland_name, setFLand_Name] = useState("")
  const [fland_location, setFLand_Locataion] = useState("")

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await addNutrientData(fland_name, fland_location)

    if (success) {
      alert("Nutrients added successfully.")
      setFLand_Name("")
      setFLand_Locataion("")
      onClose()
    } else {
      alert("Failed to add nutrients. Please try again.")
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
              <img src={addDataimg} alt="" />
            </div>

            <span className="text-center text-xl font-medium mt-3 ml-2">
              Add Soil Data
            </span>
          </div>

          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="mt-4">
                  <label className="text-sm font-semibold text-black">
                    Fland Name:
                  </label>

                  <input
                    type="text"
                    value={fland_name}
                    onChange={(e) => setFLand_Name(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-black">
                    Fland Location:
                  </label>

                  <input
                    type="text"
                    value={fland_location}
                    onChange={(e) => setFLand_Locataion(e.target.value)}
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
                    ADD SOIL DATA
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

export default AddSoilData
