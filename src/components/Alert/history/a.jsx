import React, { useState } from "react"

function A() {
  const alertData = [
    {
      alert_id: "32432423",
      alert_type: "weather",
      created_at: "2023-10-08T15:42:49.000Z",
      message: "dali dali",
      recipientInfo: [
        {
          name: "John Doe",
          contact_number: "123-456-7890",
        },
      ],
    },
    {
      alert_id: "56789012",
      alert_type: "emergency",
      created_at: "2023-10-09T15:55:22.000Z",
      message: "urgent alert",
      recipientInfo: [
        {
          name: "Jane Smith",
          contact_number: "987-654-3210",
        },
        {
          name: "Adann sasa",
          contact_number: "987-654-656",
        },
        {
          name: "Joan Axe",
          contact_number: "123-456-789",
        },
      ],
    },
  ]

  const [selectedAlertType, setSelectedAlertType] = useState("all")
  const [selectedFromDate, setSelectedFromDate] = useState("")
  const [selectedToDate, setSelectedToDate] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState({})

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
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

  const openModal = (alert) => {
    setSelectedAlert(alert)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const sortedAlertData = [...alertData].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  )

  return (
    <div className="absolute right-0 w-4/5 h-screen">
      <div className="mb-4">
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
      <div className="mb-4">
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
      </div>
      {sortedAlertData
        .filter(
          (alert) =>
            (selectedAlertType === "all" ||
              alert.alert_type === selectedAlertType) &&
            (!selectedFromDate || alert.created_at >= selectedFromDate) &&
            (!selectedToDate ||
              alert.created_at <= `${selectedToDate}T23:59:59.999Z`)
        )
        .map((alert) => (
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
