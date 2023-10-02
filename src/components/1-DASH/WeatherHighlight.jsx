// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import { prettyPrintWeatherCode } from "../../utils/weather/weatherUtils"

const WeatherHighlight = () => {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData()
      setWeatherData(data)
    }

    fetchData()
  }, [])

  if (!weatherData || weatherData.length === 0) {
    return <div>Loading...</div> // You can display a loading message or handle this case as needed.
  }

  function formatTime(inputDate) {
    // Create a Date object from the inputDate
    const dateObj = new Date(inputDate)

    // Extract hours and minutes
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM"

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12

    // Format hours and minutes as a string with leading zeros
    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amOrPm}`

    return formattedTime
  }

  //get the weather current data

  const weather = weatherData[0].current.data.values

  const weekly = weatherData[0].weekly.timelines.daily[0].values

  

  return (
    <div className="bg-red-300 w-full h-full grid grid-cols-3 grid-rows-2 flex-wrap ">
      <div className="h-48 mr-2 mb-2 bg-green-500 rounded-full">
        <p>{weather.temperature}</p>
      </div>

      <div className="h-48  ml-2 mr-2 mb-2 bg-blue-300 rounded-[20px] text-center shadow-lg">
        <h2 className="m-2 text-xl font-bold">Wind Speed</h2>
        <p>{weather.windSpeed}</p>
      </div>

      <div className="h-48 ml-2 mb-2 bg-blue-300 rounded-tl-full rounded-tr-full  ">
        {weather.cloudCover}
      </div>

      <div className=" h-48 mr-2 mt-2 bg-blue-300 ">
        <h2>humidity</h2>
        <p>{weather.humidity}</p>
      </div>

      <div className="h-48 mx-2 mt-2 bg-blue-300 rounded-tr-full rounded-br-full ">
        {weather.visibility}
      </div>

      <div className="h-48 ml-2 mt-2 bg-blue-300  rounded-3xl ">
        sunrise
        {formatTime(weekly.sunriseTime)}
        <h2>
          {" "}
          sunshessh
          {formatTime(weekly.sunsetTime)}
        </h2>
      </div>
    </div>
  )
}

export default WeatherHighlight
