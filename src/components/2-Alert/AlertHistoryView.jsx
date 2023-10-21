import React, { useEffect, useState } from "react"
import { fetchAlertData } from "../../service/firebase/alertFunctions"

import editimg from "../../static/farmer/edit.png"

import addDataimg from "../../static/farmer/addData.png"

// Define the CSS class for the alert cards
const alertCardStyle = {
  width: "calc(33.33% - 20px)", // Set the width to 33.33% minus margin
  marginRight: "20px", // Add margin between the cards
}

function AlertHistoryView() {
  const [alertData, setAlertData] = useState([])
  const [selectedAlertType, setSelectedAlertType] = useState("all")
  const [selectedFromDate, setSelectedFromDate] = useState("")
  const [selectedToDate, setSelectedToDate] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState({})
  const [sortOrder, setSortOrder] = useState("latest")

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlertData()
      setAlertData(data)
    }

    fetchData()
  }, [])

  const formatDate = (inputDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    const formattedDate = new Date(
      inputDate.seconds * 1000 + inputDate.nanoseconds / 1000000
    ).toLocaleDateString("en-US", options)

    return formattedDate
  }

  const handleAlertTypeChange = (e) => {
    setSelectedAlertType(e.target.value)
  }

  const handleFromDateChange = (e) => {
    setSelectedFromDate(e.target.value)
  }

  const handleToDateChange = (e) => {
    setSelectedToDate(e.target.value)
  }

  const handleClearDateFilters = () => {
    setSelectedFromDate("")
    setSelectedToDate("")
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
  }

  const sortedAlerts = alertData.sort((a, b) => {
    if (sortOrder === "latest") {
      return b.created_at.toDate() - a.created_at.toDate()
    } else {
      return a.created_at.toDate() - b.created_at.toDate()
    }
  })

  const openModal = (alert) => {
    setSelectedAlert(alert)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const filteredAlerts = sortedAlerts.filter(
    (alert) =>
      (selectedAlertType === "all" || alert.alert_type === selectedAlertType) &&
      (!selectedFromDate ||
        new Date(alert.created_at.toDate()) >= new Date(selectedFromDate)) &&
      (!selectedToDate ||
        new Date(alert.created_at.toDate()) <=
          new Date(`${selectedToDate}T23:59:59.999Z`))
  )

  // Ensure there are exactly three alert cards per row
  const alertCardsPerRow = []
  for (let i = 0; i < filteredAlerts.length; i += 3) {
    const row = filteredAlerts.slice(i, i + 3)
    alertCardsPerRow.push(row)
  }

  return (
    <div className="mx-8 py-6 ">
      <div className="mb-4">
        <span className="text-3xl font-bold">DASHBOARD</span>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold text-black">Filters:</label>

        <div className="w-full flex flex-row space-x-2 py-3 border-2  justify-center rounded-3xl">
          <div className="space-x-2 mr-8">
            <label className="text-sm font-semibold text-black">
              Filter by Alert Type:
            </label>

            <select
              className="border rounded-lg py-2 px-3 w-48
          focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select alert type</option>
              <option value="weather">Weather</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div className="space-x-2">
            <label className="text-sm font-semibold text-black">
              From Date:
            </label>

            <input
              type="date"
              placeholder="From Date"
              className="border rounded-lg py-2 px-3 w-40 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="space-x-2">
            <label className="text-sm font-semibold text-black">To Date:</label>

            <input
              type="date"
              placeholder="To Date"
              className="border rounded-lg py-2 px-3 w-40 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <button
              className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 ml-8
                          flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-blue-500/40
                          transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="font-semibold text-[14px] mt-[3.5px]">
                Clear Filters
              </span>{" "}
              <img className="w-6 ml-4 mt-[2.4px]" src={editimg} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-2">
        <button
          onClick={toggleSortOrder}
          className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500
                          flex hover:text-white font-sm py-1 pl-8 pr-2  rounded-3xl shadow-md shadow-blue-500/40
                          transition duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="font-semibold text-[14px] mt-[3.5px]">
            SORT {sortOrder === "latest" ? "OLDEST FIRST" : "LATEST FIRST"}
          </span>{" "}
          <img className="w-6 ml-4 mt-[2.4px]" src={editimg} alt="" />
        </button>
      </div>

      <div className="flex justify-center mt-4 h-[495px]">
        <div className=" bg-white w-full rounded-2xl shadow-lg p-4 overflow-auto">
          {alertCardsPerRow.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center ">
              {row.map((alert) => (
                <div
                  key={alert.alert_id}
                  className="border  border-gray-300  rounded-2xl p-4 mb-4 cursor-pointer"
                  onClick={() => openModal(alert)}
                  style={alertCardStyle} // Apply the alert card style
                >
                  <div className="flex items-center ">
                    <label className="text-sm font-semibold text-black mr-2">
                      Alert Type:
                    </label>

                    <div>
                      <span className="text-[14px]">{alert.alert_type}</span>
                    </div>
                  </div>

                  <div className="flex items-center  ">
                    <label className="text-sm font-semibold text-black mr-2">
                      Created Date:
                    </label>

                    <div>
                      <span className="text-[14px]">
                        {formatDate(alert.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center ">
                    <label className="text-sm font-semibold text-black mr-2">
                      Recipient:
                    </label>

                    <div>
                      <span className="text-[14px]">
                        {formatDate(alert.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center ">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-black mr-2">
                        Recipient Info Names:
                      </label>
                      <div>
                        <span className=" text-[14px]">
                          {alert.recipientInfo
                            .map((recipient) => recipient.name)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

            <div className="modal-container bg-white  w-[500px]  mx-auto rounded-3xl shadow-lg z-50 p-6 ">
              <div className="modal-content">
                <div className="flex justify-center">
                  <div className="w-12">
                    <img src={addDataimg} alt="" />
                  </div>

                  <span className="text-center text-xl font-medium mt-3 ml-2">
                    Alert Information
                  </span>
                </div>

                <div className="flex items-center  mt-3">
                  <label className="text-sm font-semibold text-black">
                    Created Date:&nbsp; &nbsp;
                  </label>

                  <div
                    className="text-black border-[1px] border-[#AAFF00] bg-[#AAFF00] 
                      hover:text-white rounded-3xl shadow-md shadow-[#AAFF00]
                      transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <span className="font-semibold text-[14px] mx-4">
                      {formatDate(selectedAlert.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-3">
                  <label className="text-sm font-semibold text-black">
                    Alert Type:&nbsp; &nbsp;
                  </label>

                  <div
                    className="text-black border-[1px] border-[#AAFF00] bg-[#AAFF00] 
                      hover:text-white rounded-3xl shadow-md shadow-[#AAFF00]
                      transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <span className="font-semibold text-[14px] mx-4">
                      {selectedAlert.alert_type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="">
                    <label className="text-sm font-semibold text-black">
                      Message:
                    </label>

                    <div
                      className="w-full h-24 overflow-auto border text-sm rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                      required
                    >
                      {selectedAlert.message}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="">
                    <label className="text-sm font-semibold text-black">
                      Recipient Names:
                    </label>

                    <div
                      className="w-full h-16 overflow-auto border text-sm rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                      required
                    >
                      {selectedAlert.recipientInfo
                        .map((recipient) => recipient.name)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="">
                    <label className="text-sm font-semibold text-black">
                      Recipient Numbers:
                    </label>

                    <div
                      className="w-full h-16 overflow-auto text-sm border rounded px-3 py-2 mt-1 border-gray-400
                      focus:outline-none focus:ring focus:border-blue-300"
                      required
                    >
                      {selectedAlert.recipientInfo
                        .map((recipient) => recipient.contactNumber)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center mt-4 ml-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <span className="font-semibold text-[14px] mt-[1.5px] ml-44">
                      CLOSE
                    </span>
                    <img className="w-6 ml-36" src={editimg} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertHistoryView
