// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

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


  function formatDate(inputDate) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }

    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    )

    return formattedDate
  }


  // Extract the date-time array from weatherData
  const weather = weatherData[0].hourly.timelines.hourly

  

  const hourlyData = weather.slice(0,8)

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
      {hourlyData.map((hour, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-4 h-48 m-auto mx-2 shadow-md"
        >
          
            
            <span className="text-blue-600 text-xl font-semibold mb-4">
              {hour.values.temperature }°C
            </span>
        
          <h2 className="text-sm text-center text-gray-500 mb-4">
            {formatDate(hour.time)}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default WeatherHourly
