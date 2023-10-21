import React from "react"
import { getFImg } from "../../utils/weather/farmerUtils"

import bgback from "../../static/farmer/bg.png"

const FarmerPreview = ({ onClose, farmerData, farmerId }) => {
  const selectedFarmerData = farmerData.find(
    (farmer) => farmer.farmer_id === farmerId
  )

  if (!selectedFarmerData) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-red-600">
            Selected farmer not found.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-1/3 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-xl ">
        <div
          className="bg-no-repeat bg-cover bg-farmer-preview
        rounded-tl-3xl rounded-tr-3xl h-28 px-8 flex items-center"


        >
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={getFImg(selectedFarmerData.farmer_profile)}
            alt={selectedFarmerData.farmer_profile}
          />
          <div className="flex">
            <div className="flex flex-col items-center">
              <p className="ml-4 text-2xl font-semibold">{`${selectedFarmerData.first_name} ${selectedFarmerData.last_name}`}</p>

              <div className="bg-gradient-to-t from-slate-900 via-slate-900 to-slate-800 text-white rounded-lg px-2">
                <p className="text-[14px] font-semibold">Farmer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-8 pt-4 pb-4 rounded-bl-3xl rounded-br-3xl ">
          <h2 className="text-[16px] font-bold text-gray-500">INFORMATION</h2>
          <div className="text-[18px] font-semibold ">
            <table className="w-full h-80 mt-2">
              <tbody>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">Farmer ID</td>
                  <td className="w-1/2">{farmerId}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">
                    First Name
                  </td>
                  <td className="w-1/2">{selectedFarmerData.first_name}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">Last Name</td>
                  <td className="w-1/2">{selectedFarmerData.last_name}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">Birthdate</td>
                  <td className="w-1/2">{selectedFarmerData.birthdate}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">Gender</td>
                  <td className="w-1/2">{selectedFarmerData.gender}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">
                    Contact Number
                  </td>
                  <td className="w-1/2">{selectedFarmerData.contact_number}</td>
                </tr>
                <tr>
                  <td className="w-1/2 text-[16px] text-gray-500">Address</td>
                  <td className="w-1/2">{selectedFarmerData.farmer_address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default FarmerPreview
