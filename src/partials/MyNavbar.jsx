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

export default function MyNavbar({ children }) {
  const activeStyle = {
    fontWeight: "bold",
    color: "yellow",
    textDecoration: "underline",
  };

  const linksForRole = () => {
    let linksRoutes = [];
    if (isAdmin()) {
      linksRoutes.push(
        {
          href: "/my/new-user",
          label: "Nuevo usuario",
          icon: <PersonFillAdd size={25} />,
        },
        {
          href: "/my/edit-user",
          label: "Editar usuario",
          icon: <PersonFillGear size={25} />,
        },
        {
          href: "/my/new-tutoria",
          label: "Nueva tutoria",
          icon: <Calendar2CheckFill size={25} />,
        },
        {
          href: "/my/solicitar",
          label: "Solicitar tutoria",
          icon: <WindowPlus size={25} />,
        },
        {
          href: "/my/tutorias",
          label: "Tutorias",
          icon: <PersonFillExclamation size={25} />,
        }
      );
      return linksRoutes;
    } else if (isTeacher()) {
      linksRoutes.push(
        {
          href: "/my/new-tutoria",
          label: "Nueva tutoria",
          icon: <Calendar2CheckFill size={25} />,
        },
        {
          href: "/my/tutorias",
          label: "Tutorias",
          icon: <PersonFillExclamation size={25} />,
        }
      );
      return linksRoutes;
    } else {
      linksRoutes.push({
        href: "/my/tutorias",
        label: "Tutorias",
        icon: <PersonFillExclamation size={25} />,
      });
      return linksRoutes;
    }
  };

  const objStored = window.localStorage.getItem("userInfo");
  const userInfo = JSON.parse(objStored);

  const isTeacher = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol.rol);
    });
    const res = arrayRoles.includes("ROLE_DOCENTE");
    return res;
  };

  const isAdmin = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol.rol);
    });
    return arrayRoles.includes("ROLE_ADMIN");
  };

  return (
    <>
        {/* <nav class="bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
            <NavLink to="#" class="flex items-center">
              <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Facultad-
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-200">
              Project
              </span>
            </NavLink>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-900 md:flex-row md:space-x-8 ">
                {linksForRole().map((link) => (
                  <li>
                  <NavLink
                    to={link.href}
                    style={({ active }) => active ? activeStyle : null}
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded bg-transparent md:p-0"
                    >
                    {link.label} {link.icon}
                  </NavLink>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </nav> */}
        <aside
          id="sidebar-multi-level-sidebar"
          class="absolute top-18 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full overflow-y-auto bg-gray-900">
            <ul class="space-y-2 font-medium">
              {linksForRole().map((link) => (
                <NavLink
                  to={link.href}
                  style={({ active }) => (active ? activeStyle : null)}
                >
                  {link.label} {link.icon}
                </NavLink>
              ))}
            </ul>
          </div>
        </aside>
      {children}
    </>
  );
}
