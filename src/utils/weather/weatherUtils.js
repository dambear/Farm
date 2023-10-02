
import clearDay from "../../static/icons/clear_day.svg";
import cloudy from "../../static/icons/cloudy.svg";
import mostlyClearDay from "../../static/icons/mostly_clear_day.svg";
import partlyCloudyDay from "../../static/icons/partly_cloudy_day.svg";
import mostlyCloudy from "../../static/icons/mostly_cloudy.svg";
import fog from "../../static/icons/fog.svg";
import fogLight from "../../static/icons/fog_light.svg";
import drizzle from "../../static/icons/drizzle.svg";
import rain from "../../static/icons/rain.svg";
import rainLight from "../../static/icons/rain_light.svg";
import rainHeavy from "../../static/icons/rain_heavy.svg";
import snow from "../../static/icons/snow.svg";
import flurries from "../../static/icons/flurries.svg";
import snowLight from "../../static/icons/snow_light.svg";
import snowHeavy from "../../static/icons/snow_heavy.svg";
import freezingDrizzle from "../../static/icons/freezing_drizzle.svg";
import freezingRain from "../../static/icons/freezing_rain.svg";
import freezingRainLight from "../../static/icons/freezing_rain_light.svg";
import freezingRainHeavy from "../../static/icons/freezing_rain_heavy.svg";
import icePellets from "../../static/icons/ice_pellets.svg";
import icePelletsHeavy from "../../static/icons/ice_pellets_heavy.svg";
import icePelletsLight from "../../static/icons/ice_pellets_light.svg";
import tstorm from "../../static/icons/tstorm.svg";

// get the photo of weather based on weather code
export function getIcon(weatherCode) {
  const weatherIcons = {
    1000: clearDay,
    1001: cloudy,
    1100: mostlyClearDay,
    1101: partlyCloudyDay,
    1102: mostlyCloudy,
    2000: fog,
    2100: fogLight,
    // 3000: "Light Wind",
    // 3001: "Wind",
    // 3002: "Strong Wind",
    4000: drizzle,
    4001: rain,
    4200: rainLight,
    4201: rainHeavy,
    5000: snow,
    5001: flurries,
    5100: snowLight,
    5101: snowHeavy,
    6000: freezingDrizzle,
    6001: freezingRain,
    6200: freezingRainLight,
    6201: freezingRainHeavy,
    7000: icePellets,
    7101: icePelletsHeavy,
    7102: icePelletsLight,
    8000: tstorm,
  };

  return weatherIcons[weatherCode];
}





// description base on weather code
export function prettyPrintWeatherCode(code) {
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
  return weatherCodes[code]
}
