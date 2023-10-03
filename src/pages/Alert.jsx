import React from 'react'
import SecondPanel from '../components/Alert/Secondpanel'
import SemaphoreSMS from '../components/Alert/SemaphoreSMS'

function Alert() {
  return (
    <div className="bg-gray-300 absolute right-0 w-5/6 h-screen">
      <SecondPanel />
      <SemaphoreSMS />
    </div>
  )
}

export default Alert
