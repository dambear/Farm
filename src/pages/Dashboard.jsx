import React, { useState, useEffect } from "react"

import {
  checkAndUpdateWeatherData,
} from "../service/firebase/weatherFunctions"

import WeatherCurrent from "../components/1-DASH/WeatherCurrent"
import WeatherWeekly from "../components/1-DASH/WeatherWeekly"



function Home() {
  useEffect(() => {
    checkAndUpdateWeatherData()
  }, [])

  return (
    <div className="bg-gray-300 absolute right-0 w-5/6 h-screen">
      <div className="container mx-auto p-7">
        <div className="bg-gray-200 flex items-center justify-center relative mt-10">
          <div className="h-60 w-1/4 bg-red-300">
            <WeatherCurrent />
            Red Div
          </div>

          <div className="h-60 w-3/4 ml-5 bg-red-300">
            <WeatherWeekly />
          </div>

          
        </div>

        <div className="bg-gray-200 flex items-center justify-center relative mt-10">
          <div className="h-80 w-1/2 mr-3 bg-blue-300">
            {/* Content for the first bottom div goes here */}
            Bottom Div 1
          </div>
          <div className="h-80 w-1/2 ml-3 bg-blue-300">
            {/* Content for the second bottom div goes here */}
            Bottom Div 2
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
