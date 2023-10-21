import React from "react"
import FarmerTable from "../components/Farmer/FarmerTable"
import NewFarmerTable from "../components/newfarmer/NewFarmerTable"
import AddFarmer from "../components/newfarmer/Add"

function Farmer() {
  return (
    <div className="absolute right-0 bg-bglines  w-5/6 h-[100vh">
      <NewFarmerTable />
    </div>
  )
}

export default Farmer
