// src/components/FarmerTable.js
import React, { useEffect, useState } from "react"
import { fetchAlertData } from "../../service/firebase/alertFunctions"

function AlertHistory() {
  const [alertData, setAlertData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlertData()
      setAlertData(data)
    }

    fetchData()
  }, [])

  return (
    <div className="absolute right-0 w-4/5 h-screen">
      <div className="bg-white h-50 text-left p-2 border-b-4">
        <h1 className="text-2xl font-bold"># Alert History</h1>
      </div>


      
    </div>
  )
}

export default AlertHistory
