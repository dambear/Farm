import React from 'react'

import AlertSidebar from '../components/Alert/AlertSidebar'
import AlertHistory from '../components/Alert/AlertHistory'
import A from '../components/Alert/A'

function Alert() {
  return (
    <div className="bg-gray-300 absolute right-0 w-5/6 h-screen">
      <AlertSidebar />
      <A />
    </div>
  )
}

export default Alert
