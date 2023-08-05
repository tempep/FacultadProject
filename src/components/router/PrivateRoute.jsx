import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "../../config/routes/paths";
import Navbar from "../../partials/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import useLocaleStorage from "../../hooks/useLocaleStorage";

export default function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated } = useAuthContext();
  const userInfo = useLocaleStorage();

  console.log(allowedRoles);

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={LOGIN} />
  );
}
