// get the photo of weather based on weather code

import male from "../../static/farmer/male.png"
import female from "../../static/farmer/female.png"

export function getFImg(f_pic) {
  const FIcons = {
    1: male,
    2: female
  }

  return FIcons[f_pic]
}
