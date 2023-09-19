import React from 'react'
import SemaphoreSMS from './SemaphoreSMS'


function AlertPanel() {
  return (
    <div className="bg-gray-300 absolute right-0 w-4/5 h-screen">
      <h1>This is about page.</h1>
      <SemaphoreSMS />
    </div>
  )
}

export default AlertPanel
