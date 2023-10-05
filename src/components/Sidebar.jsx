import React from "react";
import { AiOutlineAlert, AiOutlineAppstore, AiOutlineUser, AiOutlineUserAdd, AiOutlineSetting } from "react-icons/ai";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-white w-1/6 h-screen fixed shadow-xl">
      <div className="name_logo text-black text-center font-Gabarito p-4 text-2xl w-11/12 mx-auto">
        {/* You can replace this with your logo */}
        Farmwise
      </div>

      <nav className="flex flex-col items-center">
        <ul className="mt-5">
          <li className="mb-2">
            <Link to="/" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
              <AiOutlineAppstore size="24" className="mr-3"/> Dashboard
            </Link>
          </li>

        <li className="mb-2">
          <Link to="alert" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <AiOutlineAlert size="24" className="mr-3"/>  Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <HiOutlineBellAlert size="24" className="mr-3"/> New Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/farmer" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <AiOutlineUser size="24" className="mr-3"/> Farmer
          </Link>
        </li>
        <li className="mb-2">
          <a href="/newfarmer" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <AiOutlineUserAdd size="24" className="mr-3"/> New Farmer
          </a>
        </li>
        <li className="mb-2">
          <Link to="/soilmodule" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <PiPlant size="24" className="mr-3"/> Soil Module
          </Link>
        </li>
        <li className="mb-2">
          <a href="#" className="nav-link items-center hover:text-black font-Montserrat hover:bg-slate-200">
            <AiOutlineSetting size="24" className="mr-3"/> Setting
          </a>
        </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
