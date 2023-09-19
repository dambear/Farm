import React from 'react'
import SecondPanel from '../components/alert/secondpanel'
import AlertPanel from '../components/alert/Alert_panel'

function About() {
  return (
    <div className="bg-gray-300 absolute right-0 w-5/6 h-screen">
      <SecondPanel />
      <AlertPanel />
      <h1>This is about page.</h1>
    </div>
  )
}

export default About
