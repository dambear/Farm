// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

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

  const date = weatherData[0].current.data.time

  const weather = weatherData[0].current.data.values

  // const weather = weatherData[0].weekly.timelines.daily
  
  

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

  return (
    <div className="bg-white p-4 shadow-md">

      {/* use format datee function */}
      <p>{formatDate(date)}</p>
      <p>{weather.temperature}°C</p>
    </div>
  )
}

export default WeatherCurrent
