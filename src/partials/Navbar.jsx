import React from "react";
import { NavLink } from "react-router-dom";
import {
  Calendar2CheckFill,
  EnvelopeAtFill,
  GraphUp,
  PersonFill,
  PersonFillAdd,
  PersonFillExclamation,
  PersonFillGear,
  Power,
  WindowPlus,
} from "react-bootstrap-icons";

export default function Navbar() {
  const activeStyle = {
    fontWeight: "bold",
    color: "yellow",
    textDecoration: "underline",
  };

  const objStored = window.localStorage.getItem("userInfo");
  const userInfo = JSON.parse(objStored);

  console.log(userInfo);
  console.log(objStored);

  const isStudent = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol.rol);
    });
    const res = arrayRoles.includes("ROLE_ESTUDIANTE");
    return res;
  };
  const isTeacher = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol.rol);
    });
    const res = arrayRoles.includes("ROLE_DOCENTE");
    return res;
  };

  console.log(isTeacher());

  const isAdmin = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol.rol);
    });
    return arrayRoles.includes("ROLE_ADMIN");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/my/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Facultad
          </span>
          <span className="text-yellow-300 self-center text-2xl font-semibold whitespace-nowrap">
            Project
          </span>
        </NavLink>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-100 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
            id="user-button"
            data-dropdown-toggle="user-dropdown"
          >
            <PersonFill className="h-8 mr-3 ml-3" size={40} />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="flex gap-x-6 items-center text-sm dark:text-white">
                {<PersonFill size={25} />} {userInfo.nombre}
              </span>
              <span className="flex gap-x-6 items-center text-sm truncate dark:text-gray-400">
                {<EnvelopeAtFill size={25} color="white" />} {userInfo.email}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400"></span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {isAdmin() && (
                <>
                  <li>
                    <NavLink
                      to="/my/new-user"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Nuevo usuario {<PersonFillAdd size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/edit-user"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Editar usuario {<PersonFillGear size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/new-tutoria"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Nueva tutoria {<Calendar2CheckFill size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/solicitar"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Solicitar tutoria {<WindowPlus size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/tutorias"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Tutorias {<PersonFillExclamation size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard {<GraphUp size={25} />}
                    </NavLink>
                  </li>
                </>
              )}
              {isTeacher() && (
                <>
                  <li>
                    <NavLink
                      to="/my/new-tutoria"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Nueva tutoria {<Calendar2CheckFill size={25} />}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my/tutorias"
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Tutorias {<PersonFillExclamation size={25} />}
                    </NavLink>
                  </li>
                </>
              )}
              {isStudent() && (
                <>
                  <li>
                    <NavLink
                      to="/my/tutorias"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Tutorias
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="py-2">
              <NavLink
                to="/my/logout"
                className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-red-400 dark:text-gray-200 dark:hover:text-white"
              >
                Cerrar sesión {<Power size={25} />}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
