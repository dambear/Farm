import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import loginimg from "../../src/static/farmer/logo.png"

import FailedCustomAlert from "./0-Notification-Alert/FailedCustomAlert"
import SuccessCustomAlert from "./0-Notification-Alert/SuccessCustomAlert"

import { fetchUserData } from "../service/firebase/userFunctions"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailedAlert, setShowFailedAlert] = useState(false)

  const [userData, setUserData] = useState()


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData()
      setUserData(data)
    }

    fetchData()
  }, [])



  const navigate = useNavigate() // Initialize useNavigate

  const validateUser = (e) => {
    e.preventDefault() // Prevent form submission and page refresh
    const user = userData.find((user) => user.username === username)
    if (user && user.password === password) {
      // Successful login, handle accordingly (e.g., redirect)
      setShowSuccessAlert(true)
      console.log("Login Successful")
    } else {
      console.log("Login Failed")
      setShowFailedAlert(true)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-bglines bg-repeat-round">
      <div className="flex justify-center w-screen h-screen items-center">
        <div className=" bg-white w-90 h-[460px] p-4 rounded-2xl shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <div className=" bg-gray-200 rounded-full w-52 flex justify-center items-center">
              <img className="w-36 ml-[-15px]" src={loginimg} alt="" />
            </div>
            <label className="text-[27px] font-bold my-3">Welcome Back!</label>
          </div>

          <div className="flex flex-col mx-4">
            <form onSubmit={validateUser}>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-72 border text-center rounded-3xl px-4 py-[6px] mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mt-3">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-72 border text-center rounded-3xl px-4 py-[6px] mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="absolute mt-[2px] right-3 top-1/2 transform -translate-y-1/2">
                    {password !== "" && (
                      <span
                        onClick={togglePasswordVisibility}
                        className="cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex space-x-4 justify-center">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-1" />
                  <span className="text-sm font-bold inline-block relative">
                    Remember me
                  </span>
                </div>

                <div>
                  <label className="text-sm font-bold text-blue-600 cursor-pointer">
                    Forgot Password?
                  </label>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-white mt-4 mb-2 w-36 text-green-500 border-[1px]  border-green-400 hover:bg-green-500 
                        flex justify-center hover:text-white font-sm py-2 rounded-3xl  shadow-md shadow-green-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <span className="font-semibold text-[14px]">LOGIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccessAlert && (
        <SuccessCustomAlert
          message="Login Success."
          onClose={() => {
            setShowSuccessAlert(false)
            navigate('/dashboard');
          }}
        />
      )}

      {showFailedAlert && (
        <FailedCustomAlert
          message="Login Failed. Please check your credentials."
          onClose={() => {
            setShowFailedAlert(false)
          }}
        />
      )}
    </div>
  )
}

export default Login
