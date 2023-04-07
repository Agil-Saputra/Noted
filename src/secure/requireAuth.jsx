import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function RequireAuth({ children }) {
    const {currentUser} = useContext(AuthContext)
  return (
     currentUser ?  children : <Navigate to="/" />
  )
}
