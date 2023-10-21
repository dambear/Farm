// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import { prettyPrintWeatherCode } from "../../utils/weather/weatherUtils"

const WeatherCurrent = () => {
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

  // const date = weatherData[0].current.data.time

  const weather = weatherData[0].current.data.values

  // function formatDate(inputDate) {
  //   const options = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //   }

  //   const formattedDate = new Date(inputDate).toLocaleDateString(
  //     "en-US",
  //     options
  //   )

  //   return formattedDate
  // }

  return (
    <div className="text-gray-800 h-full p-5 rounded-l-[20px]">
      <h2 className="text-base text-gray">Batangas City</h2>
      <h1 className="text-6xl font-bold mt-4">{weather.temperature}°C</h1>
      <div className=" mt-8 ">
        <p className="text-gray-400 font-medium">Today</p>

        <p className="text-xl mb-2 font-bold">
          {prettyPrintWeatherCode(weather.weatherCode)}
        </p>
      </div>
    </div>
  )
}

export default WeatherCurrent
