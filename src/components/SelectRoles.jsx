import React from "react";
import { toast } from "react-hot-toast";

export default function SelectRoles({ setDataNewUser, dataNewUser }) {
  

  function alertConfirm(){
    const selectedRol=document.getElementById("rol").value;
    const response=confirm(`¿Estás seguro de seleccionar ${selectedRol} como rol?`);
    if(response){
      addRolToArray(selectedRol);
      document.getElementById("rol").required=false;
    }
  }

  function addRolToArray(selectedRol) {
    setDataNewUser((prevState) => {
      const rol = prevState.rol.concat(selectedRol);
      return {
        ...prevState,
        rol,
      };
    });
    toast.success("Rol asignado.", {
      duration: 3000,
      position: "top-center",
    });
  }
  const location = window.location.href;
  const hostname = window.location.hostname;
  console.log(location + "------" + hostname)
  return (
    <main>
      <select
        name="rol"
        id="rol"
        required
        disabled={dataNewUser.rol.length === 2 && true}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Roles disponibles</option>
        {!dataNewUser.rol[0] && (
          <>
            {location === `http://${hostname}:5173/my/new-user` && <option value="ROLE_ADMIN" onClick={alertConfirm}>Administrador</option>}
            <option value="ROLE_DOCENTE" onClick={alertConfirm}>Docente</option>
            <option value="ROLE_ESTUDIANTE" onClick={alertConfirm}>Estudiante</option>
          </>
        )}
        {dataNewUser.rol[0] === "ROLE_DOCENTE" && (
          <option value="ROLE_ADMIN" onClick={alertConfirm}>Administrador</option>
        )}
        {dataNewUser.rol[0] === "ROLE_ESTUDIANTE" && (
          <option value="ROLE_ADMIN" onClick={alertConfirm}>Administrador</option>
        )}
        {dataNewUser.rol[0] === "ROLE_ADMIN" && (
          <>
            <option value="ROLE_DOCENTE" onClick={alertConfirm}>Docente</option>
            <option value="ROLE_ESTUDIANTE" onClick={alertConfirm}>Estudiante</option>
          </>
        )}
      </select>
    </main>
  );
}
