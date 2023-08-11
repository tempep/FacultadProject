import React from "react";
import "../scss/layout/_navbar.scss";
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
import useLocaleStorage from "../hooks/useLocaleStorage";

export default function MyNavbar() {
  const userInfo = useLocaleStorage();
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
        },
        /* {
          href: "/my",
          label: "Gráficas",
          icon: <GraphUp size={25} />,
        } */
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
        },
        /* {
          href: "/my",
          label: "Gráficas",
          icon: <GraphUp size={25} />,
        } */
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

  const isTeacher = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol);
    });
    return arrayRoles.includes("ROLE_DOCENTE");
  };

  const isAdmin = () => {
    var arrayRoles = [];
    userInfo.roles.forEach((rol) => {
      arrayRoles.push(rol);
    });
    return arrayRoles.includes("ROLE_ADMIN");
  };

  console.log(isAdmin());
  console.log(isTeacher());

  return (
    <aside className="sidebar">
      <div className="sidebar_title">
        <h2>Facultad Project</h2>
        <p>
          <i>
            <PersonFill size={25} />
          </i>
          {userInfo.nombre}
        </p>
      </div>
      <ul className="link_list">
        {linksForRole().map((link) => (
          <li>
            <NavLink to={link.href}>
              <i>{link.icon}</i>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink to="/my/logout" className="logout_link">
        <Power size={25} />
        <span>Cerrar sesión</span>
      </NavLink>
    </aside>
  );
}
