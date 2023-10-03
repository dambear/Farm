// src/WeatherForecast.js

import React, { useState, useEffect } from "react"

import { fetchWeatherData } from "../../service/firebase/weatherFunctions"

import { prettyPrintWeatherCode } from "../../utils/weather/weatherUtils"

import windspeedImg from "../../static/asset/windspeed.png"
import humidityImg from "../../static/asset/humidity.png"
import tempImg from "../../static/asset/temperature.png"
import cloudcoverImg from "../../static/asset/cloudcover.png"
import sunsetImg from "../../static/asset/sunset.png"
import sunriseImg from "../../static/asset/sunrise.png"

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
    <div className=" w-full h-full grid grid-cols-3 grid-rows-2 flex-wrap ">
      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-sky-200 to-rose-300 hover:text-white duration-300 h-48 mr-2 mb-2 bg-purple-50 rounded-[20px] shadow-lg">
        <div className="flex m-auto p-4">
          <img src={tempImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">Temperature</h2>
        </div>

        <p className="text-white:base text-center text-4xl font-bold">
          {weather.temperature}
        </p>
      </div>

      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-blue-200 duration-300 h-48 hover:text-white  ml-2 mr-2 mb-2  rounded-[20px] text-center shadow-lg bg-purple-50">
        <div className="flex m-auto p-4">
          <img src={windspeedImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">WindSpeed</h2>
        </div>
        <p className="text-white:base text-center text-4xl font-bold">
          {weather.windSpeed}
        </p>
      </div>

      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-yellow-300 hover:text-white duration-300 h-48 mr-2 mt-2 bg-white rounded-[20px]  shadow-lg">
        <div className="flex m-auto p-4">
          <img src={sunriseImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">Sunrise</h2>
        </div>
        <p className="text-white:base text-center text-4xl font-bold">
          {formatTime(weekly.sunriseTime)}
        </p>
      </div>

      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-violet-200 duration-200 hover:shadow-violet-100 hover:shadow-blur-lg hover:text-white h-48 mr-2 mt-2 bg-purple-50 rounded-[20px]  shadow-lg">
        <div className="flex m-auto p-4">
          <img src={humidityImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">Humidity</h2>
        </div>
        <p className="text-white:base text-center text-4xl font-bold">
          {weather.humidity}%
        </p>
      </div>

      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-yellow-400 hover:text-white duration-200  h-48 mx-2 mt-2 bg-purple-50 rounded-[20px] shadow-lg ">
        <div className="flex m-auto p-4">
          <img src={cloudcoverImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">CloudCover</h2>
        </div>
        <p className="text-center text-white:base text-4xl font-bold">
          {weather.cloudCover}%
        </p>
      </div>

      <div className="hover:-translate-y-1 hover:scale-110 hover:bg-gray-900 hover:text-white duration-200  h-48 mr-2 mt-2 bg-white rounded-[20px]  shadow-lg">
        <div className="flex m-auto p-4">
          <img src={sunsetImg} alt="humidity" className="w-12 h-12" />
          <h2 className="text-xl font-bold  p-2">Sunset</h2>
        </div>
        <p className=" text-center text-white:base text-4xl font-bold">
          {formatTime(weekly.sunsetTime)}
        </p>
      </div>
    </div>
  )
}

export default WeatherHighlight
