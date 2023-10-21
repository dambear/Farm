// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import {
  getIcon,
  prettyPrintWeatherCode,
} from "../../utils/weather/weatherUtils"

const WeatherWeekly = () => {
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

  //get the weather current data

  const weather = weatherData[0].weekly.timelines.daily


  // weeks
  const weekDays = (inputWeeks) => {
    const options = {
      weekday: "long",
    }
    const formattedWeeks = new Date(inputWeeks).toLocaleDateString(
      "en-US",
      options
    )

    return formattedWeeks
  }

  function formatDate(inputDate) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
      // timeZone: 'Asia/Manila',  Set to Philippines timezone
    }

    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    )

    return formattedDate
  }

  // Get only the first 5 items from the array
  const weeklyWeather = weather.slice(1, 6)

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
      {weeklyWeather.map((daily, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-4 h-48 m-auto mx-2 shadow-md"
        >
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12 mr-2 mb-2 "
              src={getIcon(daily.values.weatherCodeMax)}
              alt={daily.values.weatherCodemax}
            />
            <p className="text-gray-600 text-center  ">
              {prettyPrintWeatherCode(daily.values.weatherCodeMax)}
            </p>
            <span className="text-blue-600 text-xl font-semibold mb-4">
              {daily.values.temperatureMax}°C
            </span>
          </div>
          <h2 className="text-center font-semibold">{weekDays(daily.time)}</h2>
          <h2 className="text-[12px] text-center text-gray-500 mb-4">
            {formatDate(daily.time)}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default WeatherWeekly
