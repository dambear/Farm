import React from 'react';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Farmer from './pages/Farmer';
import NewFarmer from './pages/NewFarmer';

function App() {
  return (
    <Router>
    <div className="">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/about" element={<About />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/newfarmer" element={<NewFarmer />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
