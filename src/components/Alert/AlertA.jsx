import React, { useState, useEffect } from "react"
import { fetchFarmerData } from "../../service/firebase/firebaseFunctions"
import { add2MessageData } from "../../service/firebase/alertFunctions"
import axios from "axios"
import DataPanelModal from "./DataPanelModal" // Import the DataPanelModal component
import RecipientList from "./RecipientList"

import { MdAddIcCall } from "react-icons/md"

function AlertA() {
  const [selectedItems, setSelectedItems] = useState([])
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
    <div className=" ">
      <div className="bg-white h-50 text-left p-2 border-b-4">
        <h1 className="text-2xl font-bold"># Create New Alert</h1>
      </div>

      <div className=" p-6 bg-[#E4E9F7] ">
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

        <div class="w-48 bg-blue-100 rounded-lg flex items-center justify-between">
          <div class="text-lg font-semibold">Recipients</div>

          <button
            class="bg-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={toggleModal}
          >
            <MdAddIcCall size="25" className="fill-green-400" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center ">
          <RecipientList
            selectedItems={selectedItems}
            filteredData={filteredData}
            handleRemoveItem={handleRemoveItem}
            handleItemHover={handleItemHover}
          />
        </div>

        <div className="flex items-center mt-4">
          <label className="text-lg font-semibold">Select alert type:</label>
          <select
            className="ml-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            value={alertType}
            onChange={handleAlertTypeChange}
          >
            <option value="">Select alert type</option>
            <option value="weather">Weather</option>
            <option value="announcement">Announcement</option>
          </select>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold">Message:</h2>
        </div>

        <div className="mt-4 flex items-center justify-center ">
          <div className="w-96">
            <textarea
              className="h-64 w-96 border rounded py-2 px-3"
              value={message}
              onChange={handleMessageChange}
            />
            <div className="text-right">
              Character Count: {message.length}/300
            </div>
          </div>
        </div>

        {/* <div className="mt-4">
        <h2 className="text-lg font-bold">Selected Items' Contact Numbers:</h2>
        <div className="pl-4">{selectedItemsContacts}</div>
      </div> */}

        <div className="mt-3 flex items-center justify-center ">
          <button
            onClick={handleSubmit}
            className="h-12 bg-emerald-400 hover:bg-emerald-700 text-white mt-4 py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertA
