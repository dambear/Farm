// get the photo of weather based on weather code

import nitrogen from "../../static/soilrigthbar-img/nitrogen.png"
import boron from "../../static/soilrigthbar-img/boron.png"
import calcium from "../../static/soilrigthbar-img/calcium.png"
import copper from "../../static/soilrigthbar-img/copper.png"
import iron from "../../static/soilrigthbar-img/iron.png"
import magnesium from "../../static/soilrigthbar-img/magnesium.png"
import manganese from "../../static/soilrigthbar-img/manganese.png"
import molybdenum from "../../static/soilrigthbar-img/molybdenum.png"
import phosphorus from "../../static/soilrigthbar-img/phosphorus.png"
import potassium from "../../static/soilrigthbar-img/potassium.png"
import sulfur from "../../static/soilrigthbar-img/sulfur.png"
import zinc from "../../static/soilrigthbar-img/zinc.png"

export function getSoilNImg(soilNCode) {
  const soilNIcons = {
    1: nitrogen,
    2: phosphorus,
    3: potassium,
    4: calcium,
    5: magnesium,
    6: sulfur,
    7: iron,
    8: manganese,
    9: zinc,
    10: copper,
    11: boron,
    12: molybdenum,
  }

  return soilNIcons[soilNCode]
}
