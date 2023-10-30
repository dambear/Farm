import React, { useState, useEffect } from "react"
import { fetchFarmerData } from "../../service/firebase/firebaseFunctions"
import { add2MessageData } from "../../service/firebase/alertFunctions"
import axios from "axios"
import AddRecipientModal from "./AddRecipientModal"
import RecipientList from "./RecipientList"
import addimg from "../../static/farmer/add.png"

import FailedCustomAlert from "../0-Notification-Alert/FailedCustomAlert"
import SuccessCustomAlert from "../0-Notification-Alert/SuccessCustomAlert"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"
import { prettyPrintWeatherCode } from "../../utils/weather/weatherUtils"

function CreateNewAlert() {
  const [weatherData, setWeatherData] = useState()
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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailedAlert, setShowFailedAlert] = useState(false)

  // get weather data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData()
      setWeatherData(data)
    }

    fetchData()
  }, [])

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

  const generateWeatherSmg = () => {
    const currentDate = new Date()

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const month = months[currentDate.getMonth()]
    const day = currentDate.getDate()
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"

    // Adjust hours to be in 12-hour format
    const formattedHours = hours % 12 || 12

    // Use padStart to add leading zero to minutes if needed
    const formattedMinutes = minutes.toString().padStart(2, "0")

    const formattedDateTime = `${month} ${day}, ${year}, at ${formattedHours}:${formattedMinutes} ${ampm}`

    console.log(formattedDateTime)

    // ==================== End of Time =====================

    // ==================== Start Get weather Data ============

    const weather = weatherData[0].current.data.values

    const weatherCondition = prettyPrintWeatherCode(weather.weatherCode)

    const weatherSMG = `Good Day! As of ${formattedDateTime}, The weather in your farm area is currently ${weatherCondition} with a temperature of ${parseFloat(
      weather.temperature
    ).toFixed(0)}°C.`

    setMessage(weatherSMG)
  }

  const sendMessage = async () => {
    const response = await axios.post("https://farmwise-backend.onrender.com", {
      number: selectedItemsContacts,
      message,
    })

    if (response.status === 200) {
      console.log("Message sent successfully:", response.data)
      setMessageData(response.data)
    } else {
      console.error("Error sending message. Status:", response.status)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    sendMessage()

    if (
      alertType === "" ||
      recipientInfo === "" ||
      message === "" ||
      messageData === ""
    ) {
      setShowFailedAlert(true)
      //alert("Please fill in all required fields.")
    } else {
      const success = await add2MessageData(
        alertType,
        recipientInfo,
        message,
        messageData
      )
      if (success) {
        setShowSuccessAlert(true)
        //alert("Alert added successfully.")
        setShowSuccessAlert(true)
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

  // generate/sign token


  return (
    <div className="mx-8 py-6 ">


      <div className="flex justify-center mt-14">
        <div className=" bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex flex-col justify-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-black mt-2">
                  Recipient:
                </label>
                <button
                  onClick={(e) => toggleModal()}
                  className="bg-white text-green-500 border-[1px]  border-green-400 hover:bg-green-500
                     flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-green-500/40
                     transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[13px] mt-[2px] ">
                    ADD NEW RECIPIENT
                  </span>
                  <img className="w-5 ml-4 mt-[2px]" src={addimg} alt="" />
                </button>
              </div>

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
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-black">
                  Message:
                </label>
                <button
                  onClick={(e) => generateWeatherSmg()}
                  className="bg-white text-green-500 border-[1px]  border-green-400 hover:bg-green-500
                     flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-green-500/40
                     transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[13px] mt-[2px] ">
                    GENERATE WEATHER MESSAGE
                  </span>
                  <img className="w-5 ml-4 mt-[2px]" src={addimg} alt="" />
                </button>
              </div>

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
              onClick={handleSubmit}
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

      {showSuccessAlert && (
        <SuccessCustomAlert
          message="Alert Created Succesfully"
          onClose={() => {
            setShowSuccessAlert(false)
          }}
        />
      )}

      {showFailedAlert && (
        <FailedCustomAlert
          message="Please fill in all required fields."
          onClose={() => {
            setShowFailedAlert(false)
          }}
        />
      )}
    </div>
  )
}

export default CreateNewAlert
