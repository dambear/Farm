import React, { useEffect, useState } from "react"
import { fetchAlertData } from "../../service/firebase/alertFunctions"

function A() {
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

  return (
    <div className="absolute right-0 w-4/5 h-screen">

      <div className="bg-white h-50 text-left p-2 border-b-4">
        <h1 className="text-2xl font-bold"># Alert History</h1>
      </div>

      <div className="mt-4">
        <label className="mr-2">Filter by Alert Type:</label>
        <select
          value={selectedAlertType}
          onChange={handleAlertTypeChange}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="weather">Weather</option>
          <option value="announcement">Announcement</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="mr-2">From Date:</label>
        <input
          type="date"
          value={selectedFromDate}
          onChange={handleFromDateChange}
          className="border p-2"
        />
        <label className="ml-2 mr-2">To Date:</label>
        <input
          type="date"
          value={selectedToDate}
          onChange={handleToDateChange}
          className="border p-2"
        />
        <button
          onClick={handleClearDateFilters}
          className="bg-blue-500 text-white p-2 ml-2 rounded"
        >
          Clear Filters
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={toggleSortOrder}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sort {sortOrder === "latest" ? "Oldest First" : "Latest First"}
        </button>
      </div>
      {filteredAlerts.map((alert) => (
        <div
          key={alert.alert_id}
          className="border p-4 mb-4 cursor-pointer"
          onClick={() => openModal(alert)}
        >
          <p>Alert Type: {alert.alert_type}</p>
          <p>Created Date: {formatDate(alert.created_at)}</p>
          <p>Recipient Info:</p>
          <ul>
            <li>
              Name:{" "}
              {alert.recipientInfo
                .map((recipient) => recipient.name)
                .join(", ")}
            </li>
          </ul>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Created Date: {formatDate(selectedAlert.created_at)}</p>
            <p>Alert Type: {selectedAlert.alert_type}</p>
            <p>Message: {selectedAlert.message}</p>
            <p>
              Recipient Name:{" "}
              {selectedAlert.recipientInfo
                .map((recipient) => recipient.name)
                .join(", ")}
            </p>
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default A
