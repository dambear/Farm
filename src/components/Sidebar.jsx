import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-white w-1/6 h-screen fixed shadow-2xl">
      <div className="name_logo text-black font-semibold p-4 text-xl w-11/12 mx-auto">
        {/* You can replace this with your logo */}
        Farmwise
      </div>

      <nav className="flex flex-col flex-1 pr-9 oveflow-auto">
        <ul className="mt-5">
          <li className="mb-2">
            <Link to="/" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
              <span className="mr-2">📊</span> Dashboard
            </Link>
          </li>

        <li className="mb-2">
          <Link to="alert" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
            <span className="mr-2">🚨</span> Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
            <span className="mr-2">🔔</span> New Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/farmer" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
            <span className="mr-2">👦</span> Farmer
          </Link>
        </li>
        <li className="mb-2">
          <a href="/newfarmer" className="nav-link hover:text-white  font-semibold hover:bg-emerald-400">
            <span className="mr-2">🌾</span> New Farmer
          </a>
        </li>
        <li className="mb-2">
          <Link to="/soilmodule" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
            <span className="mr-2">🌾</span> Soil Module
          </Link>
        </li>
        <li className="mb-2">
          <a href="#" className="nav-link hover:text-white font-semibold hover:bg-emerald-400">
            <span className="mr-2">⚙️</span> Setting
          </a>
        </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
