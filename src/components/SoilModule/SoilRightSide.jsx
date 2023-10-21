import React, { useEffect, useState } from "react"
import soilNData from "../../res/json/soilrightside.json"
import { getSoilNImg } from "../../utils/weather/soilUtils"

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

function SoilRightSide() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const handleLeftButtonClick = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? soilNData.length - 1 : prevIndex - 1
    )
  }

  const handleRightButtonClick = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === soilNData.length - 1 ? 0 : prevIndex + 1
    )
  }

  const currentSlide = soilNData[currentSlideIndex]

  return (
    <div className="mt-4">
      {/* Add the image with a container and set its size and border */}

      <div className="flex items-center justify-center">
        <div className="bg-gray-200 w-80 h-80 rounded-full">
          <img
            className="w-80 rounded-full"
            src={getSoilNImg(currentSlide.soilNCode)}
            alt={currentSlide.nutrient_name}
          />
        </div>
      </div>

      <div className="px-4">
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{currentSlide.nutrient_name}</h2>
        </div>

        <div className="mt-2 ">
          <div className="h-48">
            <p className="text-lg">{currentSlide.nutrient_info}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3 justify-center">
        {/* Centered buttons */}
        <button
          onClick={handleLeftButtonClick}
          className="bg-white py-2 px-4 rounded-lg border border-black" // Added border-black class
        >
          <AiOutlineLeft />
        </button>
        <div className="bg-black text-white py-2 px-4 rounded-lg">
          Nutrients
        </div>
        <button
          onClick={handleRightButtonClick}
          className="bg-white py-2 px-4 rounded-lg border border-black" // Added border-black class
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  )
}

export default SoilRightSide
