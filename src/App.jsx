import React from "react"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AlertNew from "./pages/AlertNew"
import Farmer from "./pages/Farmer"

import SoilModule from "./pages/Soil"
import AlertHistory from "./pages/AlertHistory"

function App() {
  return (
    <Router>
      <div className="font-Poppins">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alert" element={<AlertNew />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/soilmodule" element={<SoilModule />} />

          <Route path="/alerthistory" element={<AlertHistory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
