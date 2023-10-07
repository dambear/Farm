import React from "react";
import { AiOutlineAlert, AiOutlineAppstore, AiOutlineUser, AiOutlineUserAdd, AiOutlineSetting } from "react-icons/ai";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-white w-1/6 h-screen fixed shadow-xl">
      <div className="name_logo text-black text-center font-Merriweather p-4 text-2xl w-11/12 mx-auto">
        {/* You can replace this with your logo */}
        Farmwise
      </div>

      <nav className="flex flex-col items-center">
        <ul className="mt-5">
          
          <li className="mb-2">
            <Link to="/" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
              <AiOutlineAppstore size="24" className="mr-3"/> Dashboard
            </Link>
          </li>

        <li className="mb-2">
          <Link to="alert" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <AiOutlineAlert size="24" className="mr-3"/>  Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <HiOutlineBellAlert size="24" className="mr-3"/> New Alert
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/farmer" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <AiOutlineUser size="24" className="mr-3"/> Farmer
          </Link>
        </li>
        <li className="mb-2">
          <a href="/newfarmer" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <AiOutlineUserAdd size="24" className="mr-3"/> New Farmer
          </a>
        </li>
        <li className="mb-2">
          <Link to="/soilmodule" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <PiPlant size="24" className="mr-3"/> Soil Module
          </Link>
        </li>
        <li className="mb-2">
          <a href="#" className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors">
            <AiOutlineSetting size="24" className="mr-3"/> Setting
          </a>
        </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
