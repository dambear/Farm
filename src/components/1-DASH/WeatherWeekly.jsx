// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import { getIcon } from "../../utils/weather/weatherUtils";

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

  console.log(weather)

  function formatDate(inputDate) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: 'Asia/Manila', // Set to Philippines timezone
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
    <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {weeklyWeather.map((daily, index) => (
        <div key={index} className="bg-white rounded-md p-4 shadow-md">
          <h2 className="text-lg font-semibold">{formatDate(daily.time)}</h2>
          {/* <p className="text-gray-600">{prettyPrintWeatherCode(daily.weatherCodeMin)}</p> */}
          <div className="flex items-center mt-2">
            <img
              className="w-8 h-8 mr-2"
              src={`../../static/icons/${getIcon(daily.weatherCodeMax)}`}// Use the actual image source here
              alt={daily.weatherCodemax}
            />
            <p className="text-blue-600">{daily.values.temperatureMax}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherWeekly
