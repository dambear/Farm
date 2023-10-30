import React from "react"
import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AlertNew from "./pages/AlertNew"
import Farmer from "./pages/Farmer"
import SoilModule from "./pages/Soil"
import AlertHistory from "./pages/AlertHistory"
import LoginPage from "./pages/LoginPage"
import {
  ProtectedRoute,
  UnprotectedRoute,
} from "./components/routingprotections/RoutingProtections"

function App() {
  return (
    <Router>
      <div className="font-Poppins">
        <Routes>
          <Route
            path="/"
            element={
              <UnprotectedRoute>
                <LoginPage />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Sidebar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alert"
            element={
              <ProtectedRoute>
                <Sidebar />
                <AlertNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer"
            element={
              <ProtectedRoute>
                <Sidebar />
                <Farmer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soilmodule"
            element={
              <ProtectedRoute>
                <Sidebar />
                <SoilModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerthistory"
            element={
              <ProtectedRoute>
                <Sidebar />
                <AlertHistory />
              </ProtectedRoute>
            }
          />

          {/* If no registered path is found, navigate to '/' */}
          <Route
            path="*"
            element={
              <UnprotectedRoute>
                <LoginPage />
              </UnprotectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
