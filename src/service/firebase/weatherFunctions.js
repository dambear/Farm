// Import necessary Firebase Firestore functions and axios
import {
  doc,
  setDoc,
  serverTimestamp,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore"
import app from "./firebase"

import axios from "axios"

const db = getFirestore(app)

let wID = "10000001" // Make sure wID is a string

// Function to add weather data
export const addWeatherData = async () => {
  // Check if wID is undefined or null, and assign a default value if needed
  if (!wID) {
    console.error("Invalid document ID. Using default ID.")
    wID = "defaultID"
  }

  const apiKey = "X1H49c4zAPW8fBIednZuPMhDviAl3qQi"

  try {
    // Fetch weather data
    const currentData = await axios.get(
      `https://api.tomorrow.io/v4/weather/realtime?location=batangas%20city&apikey=${apiKey}`
    )

    const hourlyData = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast?location=batangas%20city&timesteps=1h&apikey=${apiKey}`
    )

    const weeklyData = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast?location=batangas%20city&timesteps=1d&apikey=${apiKey}`
    )

    // Process data
    const current = currentData.data
    const hourly = hourlyData.data
    const weekly = weeklyData.data

    // Get Firestore document reference
    const weatherDocRef = doc(db, "Weather", wID)

    // Set document data
    await setDoc(weatherDocRef, {
      wID,
      current,
      hourly,
      weekly,
      created_at: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error fetching or saving weather data:", error)
    throw error
  }
}

// Function to periodically check and update weather data
export const checkAndUpdateWeatherData = async () => {
  try {
    const weatherData = await fetchWeatherData()
    if (weatherData.length > 0) {
      const weatherItem = weatherData[0] // Assuming you want to check the first weather item
      const created_at = weatherItem.created_at.toDate()
      const currentDate = new Date()

      // Check if `created_at` is not from the current day
      if (
        currentDate.getDate() !== created_at.getDate() ||
        currentDate.getMonth() !== created_at.getMonth() ||
        currentDate.getFullYear() !== created_at.getFullYear()
      ) {
        // If not, update weather data
        await addWeatherData()
        console.log("Weather data updated.")
      } else {
        console.log("Weather data is up to date.")
      }
    } else {
      console.log("No weather data found.")
    }
  } catch (error) {
    console.error("Error checking or updating weather data:", error)
    throw error
  }
}

// Function to get weatherData
export const fetchWeatherData = async () => {
  const weatherRef = collection(db, "Weather")
  const weatherSnapshot = await getDocs(weatherRef)

  const weatherData = []
  weatherSnapshot.forEach((doc) => {
    weatherData.push({ id: doc.id, ...doc.data() })
  })

  return weatherData
}
