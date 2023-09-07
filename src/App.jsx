import React from 'react';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function App() {
  return (
    <Router>
    <div className="">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
