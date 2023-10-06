// RecipientList.js (New Component)
import React from "react"

function RecipientList({
  selectedItems,
  filteredData,
  handleItemHover,
  handleRemoveItem,
}) {
  return (
    <div className="pl-4 h-20 grid grid-cols-2 border-2">
      {selectedItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center"
          onMouseEnter={() => handleItemHover(item)}
        >
          <div>{item}</div>
          <button
            className="text-red-500 ml-2"
            onClick={() => handleRemoveItem(item)}
          >
            Remove
          </button>
          <span className="text-blue-600 ml-2">
            {
              filteredData.find(
                (itemData) =>
                  `${itemData.first_name} ${itemData.last_name}` === item
              ).contact_number
            }
          </span>
        </div>
      ))}
    </div>
  )
}

export default RecipientList
