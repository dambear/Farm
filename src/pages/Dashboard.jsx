import React, { useState, useEffect } from "react"

import { checkAndUpdateWeatherData } from "../service/firebase/weatherFunctions"

import WeatherCurrent from "../components/1-DASH/WeatherCurrent"
import WeatherWeekly from "../components/1-DASH/WeatherWeekly"
import WeatherHighlight from "../components/1-DASH/WeatherHighlight"
import WeatherHourly from "../components/1-DASH/WeatherHourly"

function Home() {
  useEffect(() => {
    checkAndUpdateWeatherData()
  }, [])

  return (
    <div className="absolute right-0 w-5/6 h-screen">
      <div className="container mx-auto p-7">
        <div className="bg-gradient-to-r from-[#F5FAD1] via-teal-100 to-cyan-100 flex items-center justify-center relative  rounded-[20px] ">
          <div className="h-60 w-1/4 ">
            <WeatherCurrent />
          </div>

          <div className="h-60 w-3/4">
            <WeatherWeekly />
          </div>
        </div>

        <div className=" flex relative mt-4">
        <p className="text-xl font-bold">Today's Highlight</p>
        </div>
        
        <div className="bg-gray-200 flex items-center justify-center relative mt-4">
          <WeatherHighlight />
        </div>

        <div className="bg-gray-200 flex items-center justify-center relative mt-10">
         <WeatherHourly />
        </div>
      </div>
    </div>
  )
}

export default Home
