import React, { useState, useEffect } from "react"
import { fetchFarmerData } from "../../service/firebase/firebaseFunctions"
import { add2MessageData } from "../../service/firebase/alertFunctions"
import axios from "axios"
import DataPanelModal from "./DataPanelModal" // Import the DataPanelModal component

function AlertA() {
  const [selectedItems, setSelectedItems] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [farmerData, setFarmerData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [message, setMessage] = useState("")
  const [selectedItemsContacts, setSelectedItemsContacts] = useState("")
  const [recipientInfo, setRecipientInfo] = useState([])
  const [messageData, setMessageData] = useState([])
  const [alertType, setAlertType] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFarmerData()
      setFarmerData(data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setFilteredData(
      farmerData.filter((item) =>
        `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    )

    if (selectedItems.length === filteredData.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }

    const selectedItemsContactNumbers = selectedItems.map((selectedItem) => {
      const selectedItemData = filteredData.find(
        (itemData) =>
          `${itemData.first_name} ${itemData.last_name}` === selectedItem
      )
      return selectedItemData ? selectedItemData.contact_number : ""
    })

    setSelectedItemsContacts(selectedItemsContactNumbers.join(", "))
  }, [selectedItems, searchQuery, farmerData])

  useEffect(() => {
    const updatedRecipientInfo = selectedItems.map((selectedItem) => {
      const selectedItemData = filteredData.find(
        (itemData) =>
          `${itemData.first_name} ${itemData.last_name}` === selectedItem
      )
      return selectedItemData
        ? {
            name: selectedItem,
            contactNumber: selectedItemData.contact_number,
          }
        : null
    })

    const filteredRecipientInfo = updatedRecipientInfo.filter(
      (item) => item !== null
    )

    setRecipientInfo(filteredRecipientInfo)
  }, [selectedItems, filteredData])

  const handleAlertTypeChange = (event) => {
    setAlertType(event.target.value)
  }

  const handleCheckboxChange = (e) => {
    const { first_name, last_name } = filteredData[e.target.value]
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
      const allItemNames = filteredData.map(
        (item) => `${item.first_name} ${item.last_name}`
      )
      setSelectedItems(allItemNames)
    } else {
      setSelectedItems([])
    }
    setSelectAll(!selectAll)
  }

  const handleMessageChange = (e) => {
    const inputText = e.target.value
    if (inputText.length <= 300) {
      setMessage(inputText)
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setSearchQuery("")
  }

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-message", {
        number: selectedItemsContacts,
        message,
      })

      if (response.status === 200) {
        console.log("Message sent successfully:", response.data)

        setMessageData(response.data)
      } else {
        console.error("Error sending message. Status:", response.status)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      alertType === "" ||
      recipientInfo === "" ||
      message === "" ||
      messageData === ""
    ) {
      alert("Please fill in all required fields.")
    } else {
      const success = await add2MessageData(
        alertType,
        recipientInfo,
        message,
        messageData
      )
      if (success) {
        alert("Alert added successfully.")
        setAlertType("")
        setRecipientInfo("")
        setMessage("")
        setMessageData([])
        setSelectedItems([])
      } else {
        alert("Failed to add Alert. Please try again.")
      }
    }
  }

  console.log(alertType)

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Select and Store Items</h1>

      <DataPanelModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        selectedItems={selectedItems}
        filteredData={filteredData}
        handleSelectAllChange={handleSelectAllChange}
        handleCheckboxChange={handleCheckboxChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleItemHover={handleItemHover}
        handleItemLeave={handleItemLeave}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={toggleModal}
      >
        Open Modal
      </button>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <label className="text-lg font-semibold">Select alert type:</label>
          <select
            id="fruitSelect"
            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            value={alertType}
            onChange={handleAlertTypeChange}
          >
            <option value="">Select alert type</option>
            <option value="weather">Weather</option>
            <option value="announcement">Announcement</option>
          </select>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold mt-4">Recipients:</h2>
          <div className="pl-4 h-20 grid grid-cols-2 border-2">
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
                      filteredData.find(
                        (itemData) =>
                          `${itemData.first_name} ${itemData.last_name}` ===
                          item
                      ).contact_number
                    }
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold">Message:</h2>
            <textarea
              className="w-full border rounded py-2 px-3 h-48"
              value={message}
              onChange={handleMessageChange}
            />
            <div className="text-right mt-2">
              Character Count: {message.length}/300
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold">
              Selected Items' Contact Numbers:
            </h2>
            <div className="pl-4">{selectedItemsContacts}</div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-700  text-white mt-4 py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default AlertA
