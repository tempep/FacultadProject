import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "../../config/routes/paths";
import { useAuthContext } from "../../contexts/AuthContext";
import Navbar from "../../partials/Navbar";


export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();


  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}