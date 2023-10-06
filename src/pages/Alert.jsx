import React from 'react'
import SecondPanel from '../components/Alert/Secondpanel'

import AlertA from '../components/Alert/AlertA'

function Alert() {
  return (
    <div className="bg-gray-300 absolute right-0 w-5/6 h-screen">
      <SecondPanel />
      <AlertA />
    </div>
  )
}

export default Alert
