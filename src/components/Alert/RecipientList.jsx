import React, { useState } from "react"
import rimg from "../../static/alert/r-img.png"
import { getFImg } from "../../utils/weather/farmerUtils"

function RecipientList({ selectedItems, filteredData, handleRemoveItem }) {
  const [hoveredRecipient, setHoveredRecipient] = useState(null)

  const handleRecipientHover = (recipientName) => {
    setHoveredRecipient(recipientName)
  }

  const handleRecipientLeave = () => {
    setHoveredRecipient(null)
  }

  return (
    <div className="bg-gray-400 w-[500px] h-28 flex flex-wrap border-2 overflow-y-auto p-2">
      {selectedItems.map((item, index) => {
        // Find the corresponding itemData based on item
        const itemData = filteredData.find(
          (itemData) => `${itemData.first_name} ${itemData.last_name}` === item
        )

        // Fallback to default image if itemData is undefined
        const imgSrc = itemData ? itemData.farmer_profile : rimg

        return (
          <div
            key={index}
            className="flex h-11 border-2 rounded-xl p-1 mx-1 mt-1"
            onMouseEnter={() => handleRecipientHover(item)}
            onMouseLeave={handleRecipientLeave}
          >
            <div className="bg-white rounded-full">
              <img
                src={getFImg(imgSrc)}
                alt="recipient-profile"
                className="w-8 h-8"
              />
            </div>

            <div className="flex items-center justify-center mx-1">{item}</div>

            <div className="flex items-center justify-center">
              <button
                className="text-red-500"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </button>
              {hoveredRecipient === item && (
                <span className="text-blue-600 ml-2">
                  {itemData.contact_number}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecipientList
