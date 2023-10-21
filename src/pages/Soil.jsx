import React from "react"
import SoilTable from "../components/SoilModule/SoilHistoryTable"
import SoilRightSide from "../components/SoilModule/SoilRightSide"

function SoilModule() {
  return (
    <div className="absolute right-0 w-5/6 h-screen">
      <div className="flex">
        <div className="bg-bglines h-screen w-4/6">
          <SoilTable />
        </div>

        <div className="bg-white h-screen w-2/6 p-4">
          <SoilRightSide />
        </div>
      </div>
    </div>
  )
}

export default SoilModule
