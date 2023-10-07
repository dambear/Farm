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

  const hourlyData = weather.slice(0, 12)

  return (
    <div className="flex ">
      {hourlyData.map((hour, index) => (
        <div key={index} className="bg-white p-4 ">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-center text-black mb-4">
              {formatHour(hour.time)}
            </h2>

            <img
              className="w-12 h-12 mr-2 mb-2 flex "
              src={getIcon(hour.values.weatherCode)}
              alt={hour.values.weatherCode}
            />
            <p className="text-gray-600 text-center">
              {prettyPrintWeatherCode(hour.values.weatherCode)}
            </p>
          </div>
          <span className="text-blue-600 text-md font-semibold mb-4">
            {hour.values.temperature}°C
          </span>
        </div>
      ))}
    </div>
  )
}

export default WeatherHourly
