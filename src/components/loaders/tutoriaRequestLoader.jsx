import { toast } from "react-hot-toast";

const URL_BACKEND_DOCENTE = "http://127.0.0.1:5000/usuario/users_docentes";

const getDocentes = async (token) => {
  let data;
  const response = await fetch(URL_BACKEND_DOCENTE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    toast.error("Su sesión ha expirado, por favor iniciar sesión nuevamente.", {
      duration: 4000,
    });
    setTimeout(() => {
      window.location.href = "/my/logout";
    }, 5000);
  } else {
    data = await response.json();
  }
  return data.datos;
};

const isAdmin = (userInfo) => {
  var arrayRoles = []; 
  userInfo.roles.forEach((rol) => {
    arrayRoles.push(rol.rol);
  });
  return arrayRoles.includes("ROLE_ADMIN");
};

export const tutoriaRequestLoader = async () => {
  const token = window.localStorage.getItem("token");
  const objStored = window.localStorage.getItem("userInfo");
  const userInfo = JSON.parse(objStored);
  const docentes = await getDocentes(token);
  const isAdministrator = isAdmin(userInfo);
  return {docentes, isAdministrator};
};
