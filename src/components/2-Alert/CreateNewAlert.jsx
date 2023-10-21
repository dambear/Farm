import React, { useState, useEffect } from "react"
import { fetchFarmerData } from "../../service/firebase/firebaseFunctions"
import { add2MessageData } from "../../service/firebase/alertFunctions"
import axios from "axios"
import AddRecipientModal from "./AddRecipientModal" 
import RecipientList from "./RecipientList"
import addimg from "../../static/farmer/add.png"
import { MdAddIcCall } from "react-icons/md"

function CreateNewAlert() {
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

  return (
    <div className="mx-8 py-6 ">
      <div className="mb-4">
        <span className="text-3xl font-bold">DASHBOARD</span>
      </div>

      <div className="flex justify-center">
        <div className=" bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <button
                onClick={(e) => toggleModal()}
                className="bg-white text-green-500 border-[1px]  border-green-400 hover:bg-green-500 ml-8
                     flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-green-500/40
                     transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="font-semibold text-[14px] mt-[2.5px] ">
                  ADD NEW RECIPIENT
                </span>
                <img className="w-5 ml-4 mt-[2px]" src={addimg} alt="" />
              </button>
            </div>

            <div>
              <label className="text-sm font-semibold text-black">Recipient:</label>

              <RecipientList
                selectedItems={selectedItems}
                filteredData={filteredData}
                handleRemoveItem={handleRemoveItem}
                handleItemHover={handleItemHover}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mt-4">
              <label className="text-sm font-semibold text-black">
                Alert Type:
              </label>

              <select
                className="w-full border rounded px-3 py-2 mt-1 border-gray-400
            focus:outline-none focus:ring focus:border-blue-300"
                value={alertType}
                onChange={handleAlertTypeChange}
              >
                <option value="">Select alert type</option>
                <option value="weather">Weather</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-black">
                Message:
              </label>

              <textarea
                className="w-full h-32 border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                value={message}
                onChange={handleMessageChange}
                required
              />

              <div className="text-right text-sm">
                Character Count: {message.length}/300
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center mt-4 ml-2">
            <button
              type="submit"
              className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="font-semibold text-[14px] mt-[3px] ml-44">
                SEND MESSAGE
              </span>
              <img className="w-6 ml-36" src={addimg} alt="" />
            </button>
          </div>
        </div>
      </div>

      <AddRecipientModal
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
    </div>
  )
}

export default CreateNewAlert
