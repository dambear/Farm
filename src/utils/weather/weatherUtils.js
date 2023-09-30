

const weatherIcons = {
  1000: require("../../static/icons/clear_day.svg"),
  1001: require("../../static/icons/cloudy.svg"),
  1100: require("../../static/icons/mostly_clear_day.svg"),
  1101: require("../../static/icons/partly_cloudy_day.svg"),
  1102: require("../../static/icons/mostly_cloudy.svg"),
  2000: require("../../static/icons/fog.svg"),
  2100: require("../../static/icons/fog_light.svg"),
  // 3000: "Light Wind",
  // 3001: "Wind",
  // 3002: "Strong Wind",
  4000: require("../../static/icons/drizzle.svg"),
  4001: require("../../static/icons/rain.svg"),
  4200: require("../../static/icons/rain_light.svg"),
  4201: require("../../static/icons/rain_heavy.svg"),
  5000: require("../../static/icons/snow.svg"),
  5001: require("../../static/icons/flurries.svg"),
  5100: require("../../static/icons/snow_light.svg"),
  5101: require("../../static/icons/snow_heavy.svg"),
  6000: require("../../static/icons/freezing_drizzle.svg"),
  6001: require("../../static/icons/freezing_rain.svg"),
  6200: require("../../static/icons/freezing_rain_light.svg"),
  6201: require("../../static/icons/freezing_rain_heavy.svg"),
  7000: require("../../static/icons/ice_pellets.svg"),
  7101: require("../../static/icons/ice_pellets_heavy.svg"),
  7102: require("../../static/icons/ice_pellets_light.svg"),
  8000: require("../../static/icons/tstorm.svg"),
}

// get the photo of weather base on weather code
export function getIcon(weatherCode) {
  return weatherIcons[weatherCode]
}

// description base on weather code
export const prettyPrintWeatherCode = async (code) => {
  const weatherCodes = {
    0: "Unknown",
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  }
  return weatherCodes[code.toString()]
}
