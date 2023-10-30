import React, { useState, useEffect } from "react"

import { checkAndUpdateWeatherData } from "../service/firebase/weatherFunctions"

import WeatherCurrent from "../components/1-DASH/WeatherCurrent"
import WeatherWeekly from "../components/1-DASH/WeatherWeekly"
import WeatherHighlight from "../components/1-DASH/WeatherHighlight"
import WeatherHourly from "../components/1-DASH/WeatherHourly"

import bglines from "../static/farmer/bglines.png"

function Dashboard() {
  useEffect(() => {
    checkAndUpdateWeatherData()
  }, [])

  return (
    <div className="absolute right-0 bg-bglines w-5/6 h-[100vh ">
      <div className="container mx-auto p-7">
        <div
          className="bg-gradient-to-r from-[#F5FAD1] via-teal-100 to-cyan-100 flex items-center 
        justify-center relative  rounded-[20px] "
        >
          <div className="h-60 w-1/6 ml-2">
            <WeatherCurrent />
          </div>

          <div className="h-60 w-5/6 mr-6">
            <WeatherWeekly />
          </div>
        </div>

        <div className=" flex relative mt-4 justify-between">
          <p className="text-xl font-bold">Today's Highlight</p>
          {/* <div>
            {" remove at the production "}
            <img src={weatherImg} alt="" className="w-32 h-32" />
          </div> */}
        </div>

        <div className="flex items-center justify-center relative mt-4">
          <WeatherHighlight />
        </div>

        <div className=" flex relative mt-4">
          <p className="text-xl font-bold">Today's Temperature Prediction</p>
        </div>
        <div
          className="bg-white rounded-lg border-r-4 border-r-sky-200 border-l-4 border-l-sky-200 sm:shadow-lg  
        flex items-center  justify-center relative mt-4"
        >
          <WeatherHourly />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
