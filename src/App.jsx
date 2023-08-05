import React from "react";
import "./scss/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import {
  MY,
  SOLICITAR,
  VALIDATION,
  CONSULTAR,
  NEWUSER,
  LOGIN,
  LOGOUT,
  NOTFOUND,
  TUTORIAS,
  NEWTUTORIA,
  EDITUSER,
  CREARCUENTA,
  DASHBOARD,
  VALIDATIONPRIVATE
} from "./config/routes/paths";
import { AuthContextProvider } from "./contexts/AuthContext";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Tutorias from "./pages/Tutorias";
import NewTutoria from "./pages/NewTutoria";
import NotFound from "./pages/NotFound";
import NewUser from "./pages/NewUser";
import TutoriaRequest from "./pages/TutoriaRequest";
import { DataProvider } from "./contexts/DataContext";
import EditUser from "./pages/EditUser";
import ConsultarTutoria from "./pages/ConsultarTutoria";
import CodeValidation from "./pages/CodeValidation";
import { newUserLoader } from "./components/loaders/newUserLoader";
import { editUserLoader } from "./components/loaders/editUserLoaders";
import CrearCuenta from "./pages/CrearCuenta";
import { crearCuentaLoader } from "./components/loaders/crearCuentaLoader";
import Dashboard from "./pages/Dashboard";
import { tutoriaRequestLoader } from "./components/loaders/tutoriaRequestLoader";
import dashboardLoader from "./components/loaders/dashboardLoader";
import { newTutoriaLoader } from "./components/loaders/newTutoriaLoader";
import RequiredAuth from "./components/RequiredAuth";



const router = createBrowserRouter([
  {
    path: MY,
    element: <PrivateRoute allowedRoles={["ROLE_ADMIN"]}/>,
    children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: NEWUSER,
            element: <NewUser />,
            loader: newUserLoader,
          },
          {
            path: EDITUSER,
            element: <EditUser />,
            loader: editUserLoader,
          },
          {
            path: NEWTUTORIA,
            element: <NewTutoria />,
            loader:newTutoriaLoader
          },
          {
            path: SOLICITAR,
            element: <TutoriaRequest />,
            loader: tutoriaRequestLoader,
          },
          {
            path: TUTORIAS,
            element: <Tutorias />,
            loader: tutoriaRequestLoader,
          },
          {
            path: CONSULTAR,
            element: <ConsultarTutoria />,
          },
          {
            path: LOGOUT,
            element: <Logout />,
          },
          {
            path: NOTFOUND,
            element: <NotFound />,
          },
          
          {
            path: VALIDATIONPRIVATE,
            element: <CodeValidation />,
          }
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: VALIDATION,
        element: <CodeValidation />,
      },
      {
        path: CREARCUENTA,
        element: <CrearCuenta />,
        loader: crearCuentaLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    <DataProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthContextProvider>
    </DataProvider>
  );
}
