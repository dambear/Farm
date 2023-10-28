// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import {
  getIcon,
  prettyPrintWeatherCode,
} from "../../utils/weather/weatherUtils"

const WeatherHourly = () => {
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

  function formatHour(inputDate) {
    // Create a Date object from the inputDate
    const dateObj = new Date(inputDate)

    // Extract hours
    const hours = dateObj.getHours()

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM"

    // Convert hours to 12-hour format without leading zeros
    const formattedHours = hours % 12 || 12

    // Format hours as a string and append AM/PM
    const formattedHour = `${formattedHours} ${amOrPm}`

    return formattedHour
  }

  // Extract the date-time array from weatherData
  const weather = weatherData[0].hourly.timelines.hourly

  const hourlyData = weather.slice(0, 10)

  return (
    <div className="flex">
      {hourlyData.map((hour, index) => (
        <div key={index} className="bg-white my-4 flex flex-row justify-center">
          <div className="flex flex-col items-center justify-center w-28 text-center ">

            <div className="">
              <h2 className=" font-bold text-center text-black ">
                {formatHour(hour.time)}
              </h2>
            </div>

            <div>
              <img
                className="w-10 mb-1 "
                src={getIcon(hour.values.weatherCode)}
                alt={hour.values.weatherCode}
              />
            </div>

            <div className="mb-1">
              <p className="text-gray-600 text-center text-sm ">
                {prettyPrintWeatherCode(hour.values.weatherCode)}
              </p>
            </div>

            <div>
              <span className="text-blue-600 text-sm font-semibold text-center ">
                {parseFloat(hour.values.temperature).toFixed(0)}°C
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherHourly
