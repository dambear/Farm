import React from 'react';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Alert from './pages/Alert';
import Farmer from './pages/Farmer';
import NewFarmer from './pages/NewFarmer';
import SoilModule from './pages/SoilMonitoring';

function App() {
  return (
    <Router>
    <div className="">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/alert" element={<Alert />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/newfarmer" element={<NewFarmer />} />
        <Route path="/soilmodule" element={<SoilModule />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
