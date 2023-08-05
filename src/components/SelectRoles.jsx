import React from "react";
import { toast } from "react-hot-toast";

export default function SelectRoles({
  defaultValue,
  setDataNewUser,
  dataNewUser,
}) {
  function alertConfirm() {
    const selectedRol = document.getElementById("roles").value;
    const response = confirm(
      `¿Estás seguro de seleccionar ${selectedRol} como rol?`
    );
    if (response) {
      addRolToArray(selectedRol);
      document.getElementById("roles").required = false;
    }
  }

  function addRolToArray(selectedRol) {
    setDataNewUser((prevState) => {
      console.log(prevState);
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

  return (
    <select
      name="roles"
      id="roles"
      className="select_roles"
      value={defaultValue?.rol}
      disabled={dataNewUser?.rol?.length === 2 && true}
      required
    >
      <option value="" hidden>
        Roles
      </option>
      {window.location.href === "http://localhost:5173/my/edit-user" ? (
        <>
          <option value="ROLE_ADMIN" onClick={alertConfirm}>
            Administrador
          </option>
          <option value="ROLE_DOCENTE" onClick={alertConfirm}>
            Docente
          </option>
          <option value="ROLE_ESTUDIANTE" onClick={alertConfirm}>
            Estudiante
          </option>
        </>
      ) : (
        <>
          {dataNewUser?.rol.length === 0 && (
            <>
              <option value="ROLE_ADMIN" onClick={alertConfirm}>
                Administrador
              </option>
              <option value="ROLE_DOCENTE" onClick={alertConfirm}>
                Docente
              </option>
              <option value="ROLE_ESTUDIANTE" onClick={alertConfirm}>
                Estudiante
              </option>
            </>
          )}
          {dataNewUser?.rol[0] === "ROLE_DOCENTE" && (
            <option value="ROLE_ADMIN" onClick={alertConfirm}>
              Administrador
            </option>
          )}
          {dataNewUser?.rol[0] === "ROLE_ESTUDIANTE" && (
            <option value="ROLE_ADMIN" onClick={alertConfirm}>
              Administrador
            </option>
          )}
          {dataNewUser?.rol[0] === "ROLE_ADMIN" && (
            <>
              <option value="ROLE_DOCENTE" onClick={alertConfirm}>
                Docente
              </option>
              <option value="ROLE_ESTUDIANTE" onClick={alertConfirm}>
                Estudiante
              </option>
            </>
          )}
        </>
      )}
    </select>
  );
}
