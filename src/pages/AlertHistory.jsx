import React from "react"

import CreateNewAlert from "../components/2-Alert/CreateNewAlert"
import AlertHistoryView from "../components/2-Alert/AlertHistoryView"

function Alert() {
  return (
    <div className="bg-bglines absolute right-0 w-5/6 h-screen">
      <AlertHistoryView />
    </div>
  )
}

export default Alert
