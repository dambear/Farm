
import React from "react";
import {Link} from 'react-router-dom';


function Sidebar() {
  return (
 
    <div className="bg-white w-1/6 h-screen fixed p-6 shadow-lg">
      <div className="name_logo w-11/12 mx-auto">
        {/* You can replace this with your logo */}
        Farmwise
      </div>
      <ul className="mt-10">
        <li className="mb-2">
          <Link to="/" className="flex items-center p-2 hover:bg-gray-200 rounded"> 
            <span className="mr-2">📊</span> Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="about" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <span className="mr-2">🚨</span> Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <span className="mr-2">🔔</span> New Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/farmer" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <span className="mr-2">👦</span> Farmer
          </Link>
        </li>
        <li className="mb-2">
          <a href="/newfarmer" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <span className="mr-2">🌾</span> New Farmer
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <span className="mr-2">⚙️</span> Setting
          </a>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;

