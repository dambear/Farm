import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    // Check the token and navigate accordingly
    if (!token) {
      navigate("/")
    }
  }, [token, navigate])

  return children
}

export function UnprotectedRoute({ children }) {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    // Check the token and navigate accordingly
    if (token) {
      navigate("/dashboard")
    }
  }, [token, navigate])

  return children
}
