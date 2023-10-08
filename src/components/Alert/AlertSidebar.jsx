import React from "react"
import {
  AiOutlineAlert,
} from "react-icons/ai"
import { HiOutlineBellAlert } from "react-icons/hi2"
import { Link } from "react-router-dom"

function AlertSidebar() {
  return (
    <div className="bg-gray-300 w-1/6 h-screen fixed shadow-xl">
      <div className="name_logo text-black text-center font-Merriweather p-4 text-2xl w-11/12 mx-auto">
        {/* You can replace this with your logo */}
        Farmwise
      </div>

      <nav className="flex flex-col items-center">
        <ul className="mt-5">
          <li className="mb-2">
            <Link
              to="/alert"
              className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors"
            >
              <HiOutlineBellAlert size="24" className="mr-3" /> Create New Alert
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/alerthistory"
              className="flex items-center font-Montserrat whitespace-nowrap 
            pl-2 pr-2 px-2 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl text-xl
            hover:bg-emerald-300 hover:text-white hover:shadow-lg hover:scale-110 duration-100 ease-in-out transition-colors"
            >
              <AiOutlineAlert size="24" className="mr-3" /> Alert Hisory
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AlertSidebar
