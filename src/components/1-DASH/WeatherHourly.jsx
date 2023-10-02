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
    const dateObj = new Date(inputDate);
  
    // Extract hours
    const hours = dateObj.getHours();
  
    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";
  
    // Convert hours to 12-hour format without leading zeros
    const formattedHours = (hours % 12) || 12;
  
    // Format hours as a string and append AM/PM
    const formattedHour = `${formattedHours} ${amOrPm}`;
  
    return formattedHour;
  }


  // Extract the date-time array from weatherData
  const weather = weatherData[0].hourly.timelines.hourly

  

  const hourlyData = weather.slice(0,8)

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 ">
      {hourlyData.map((hour, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-4 h-48 m-auto mx-2 shadow-md h-40"
        >
          
            
          <div className="flex flex-col items-center">
            <span className="text-blue-600 text-xl font-semibold mb-4">
              {hour.values.temperature}°C
            </span>
            <img
              className="w-12 h-12 mr-2 mb-2 "
              src={getIcon(hour.values.weatherCode)}
              alt={hour.values.weatherCode}
            />
            <p className="text-gray-600 text-center  ">
              {prettyPrintWeatherCode(hour.values.weatherCode)}
            </p>

          </div>

        
          <h2 className="text-sm text-center text-gray-500 mb-4">
            {formatHour(hour.time)}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default WeatherHourly
