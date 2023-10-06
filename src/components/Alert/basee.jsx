import React, { useState, useEffect } from "react"

function AlertA() {
  const [selectedItems, setSelectedItems] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(false)

  const data = [
    {
      first_name: "John",
      last_name: "Doe",
      contactnumber: "123-456-7890",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      contactnumber: "987-654-3210",
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      contactnumber: "555-123-4567",
    },
  ]

  const filteredData = data.filter((item) =>
    `${item.first_name} ${item.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    // Check if all data items are selected to update "Select All" checkbox
    if (selectedItems.length === data.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedItems])

  const handleCheckboxChange = (e) => {
    const { first_name, last_name } = data[e.target.value]
    const itemName = `${first_name} ${last_name}`
    if (e.target.checked) {
      setSelectedItems([...selectedItems, itemName])
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== itemName))
    }
  }

  const handleItemHover = (itemName) => {
    setHoveredItem(itemName)
  }

  const handleItemLeave = () => {
    setHoveredItem(null)
  }

  const handleRemoveItem = (itemName) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemName))
  }

  const handleSelectAllChange = () => {
    if (!selectAll) {
      const allItemNames = data.map(
        (item) => `${item.first_name} ${item.last_name}`
      )
      setSelectedItems(allItemNames)
    } else {
      setSelectedItems([])
    }
    setSelectAll(!selectAll)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Select and Store Items</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={toggleModal}
      >
        Open Modal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Data Panel (Modal)</p>
                <button className="modal-close" onClick={toggleModal}>
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M10.293 9l3.646-3.646a1 1 0 10-1.414-1.414L9.88 7.293 6.234 3.646a1 1 0 10-1.414 1.414L8.466 9l-3.647 3.646a1 1 0 001.414 1.414L9.88 10.706l3.646 3.647a1 1 0 001.414-1.414L10.293 9z" />
                  </svg>
                </button>
              </div>

              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <span className="inline-block relative">Select All</span>
              </label>
              <input
                type="text"
                placeholder="Search by name"
                className="w-full border rounded p-2 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div>
                {filteredData.map((item, index) => (
                  <label
                    key={index}
                    className="block mb-2"
                    onMouseEnter={() => handleItemHover(item)}
                    onMouseLeave={handleItemLeave}
                  >
                    <input
                      type="checkbox"
                      value={index}
                      onChange={handleCheckboxChange}
                      checked={selectedItems.includes(
                        `${item.first_name} ${item.last_name}`
                      )}
                      className="mr-2"
                    />
                    <span className="inline-block relative">{`${item.first_name} ${item.last_name}`}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-bold mt-4">Selected Items:</h2>
        <div className="pl-4">
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
              onMouseEnter={() => handleItemHover(item)}
              onMouseLeave={handleItemLeave}
            >
              <div>{item}</div>
              <button
                className="text-red-500 ml-2"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </button>
              {hoveredItem === item && (
                <span className="text-blue-600 ml-2">
                  {
                    data.find(
                      (itemData) =>
                        `${itemData.first_name} ${itemData.last_name}` === item
                    ).contactnumber
                  }
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlertA
