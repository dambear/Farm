import React, { useState } from "react"

import { useNavigate } from "react-router-dom"

import {
  AiOutlineAlert,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai"

import { HiOutlineBellAlert } from "react-icons/hi2"
import { PiPlant } from "react-icons/pi"

import { Link, Navigate } from "react-router-dom"

import logo from "../static/farmer/logo.png"

import WarningCustomAlert from "../components/0-Notification-Alert/WarningCustomAlert"

function Sidebar() {
  const navigate = useNavigate() // Initialize useNavigate

  const [isAlertSectionOpen, setAlertSectionOpen] = useState(false)

  const [showWarningAlert, setShowWarningAlert] = useState(false)

  const toggleAlertSection = () => {
    setAlertSectionOpen(!isAlertSectionOpen)
  }

  const logout = () => {
    setShowWarningAlert(true)
    // localStorage.removeItem("token")
  }

  return (
    <div>
      <div className="bg-white w-1/6 h-screen fixed shadow-xl">
        <div className="h-[630px]">
          <div className="p-6 mx-auto flex">
            <img className="w-[60px]" src={logo} alt="" />

            <span className="mt-4 ml-2 font-semibold text-xl">Farmwise</span>
          </div>

          <nav className="flex flex-col items-center">
            <ul className="mt-5">
              <li className="mb-2 ">
                <Link
                  to="/dashboard"
                  className="flex items-center  whitespace-nowrap py-[10px] px-2 w-52 font-normal
              tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                >
                  <AiOutlineAppstore size="24" className="mr-5 ml-3" />{" "}
                  Dashboard
                </Link>
              </li>

              <li className="mb-2">
                <div
                  onClick={toggleAlertSection}
                  className="flex items-center  whitespace-nowrap py-[10px] px-2 w-52 font-normal
              tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                >
                  <AiOutlineAlert size="24" className="mr-5 ml-3" /> Alert
                  <span>{isAlertSectionOpen ? "-" : "+"}</span>
                </div>
                {isAlertSectionOpen && (
                  <ul>
                    <li className="mb-2 pl-8">
                      <Link
                        to="/alert"
                        className="flex items-center  whitespace-nowrap py-[10px] px-2 font-normal
                    tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                      >
                        <HiOutlineBellAlert size="20" className="mr-3" /> New
                        Alert
                      </Link>
                    </li>
                    <li className="mb-2 pl-8">
                      <Link
                        to="/alerthistory"
                        className="flex items-center  whitespace-nowrap py-[10px] px-2 font-normal 
                    tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                      >
                        <AiOutlineAlert size="20" className="mr-3" /> Alert
                        History
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="mb-2">
                <Link
                  to="/farmer"
                  className="flex items-center  whitespace-nowrap py-[10px] px-2 w-52 font-normal
              tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                >
                  <AiOutlineUser size="24" className="mr-5 ml-3" /> Farmer
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/soilmodule"
                  className="flex items-center  whitespace-nowrap py-[10px] px-2 w-52 font-normal
              tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
                >
                  <PiPlant size="24" className="mr-5 ml-3" /> Soil Module
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <ul className="flex flex-col items-center ">
            <li className="">
              <a
                onClick={logout}
                className="flex items-center  whitespace-nowrap py-[10px] px-2 w-52 font-normal
              tracking-wide rounded-lg text-[18px] hover:bg-[#AAFF00]  hover:text-white"
              >
                <AiOutlineLogout size="24" className="mr-5 ml-3" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showWarningAlert && (
        <WarningCustomAlert
          message="Are you sure you want to logout?"
          onYes={() => {
            setShowWarningAlert(false)
            localStorage.removeItem("token")
            navigate("/")
          }}
          onNo={() => {
            setShowWarningAlert(false)
          }}
        />
      )}
    </div>
  )
}

export default Sidebar
