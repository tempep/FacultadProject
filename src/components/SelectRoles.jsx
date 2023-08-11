import React from "react";
import { toast } from "react-hot-toast";

export default function SelectRoles({
  defaultValue,
  setFunction,
  dataFunction,
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
    setFunction(prevState => {
      const roles = prevState?.roles?.map(rol => rol?.toString());
      console.log(roles);
      roles.push(selectedRol);
      return {
        ...prevState,
        roles
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
      value={defaultValue?.roles}
      disabled={dataFunction?.roles?.length === 2 && true}
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
          {dataFunction?.roles?.length === 0 && (
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
          {dataFunction?.roles[0] === "ROLE_DOCENTE" && (
            <option value="ROLE_ADMIN" onClick={alertConfirm}>
              Administrador
            </option>
          )}
          {dataFunction?.roles[0] === "ROLE_ESTUDIANTE" && (
            <option value="ROLE_ADMIN" onClick={alertConfirm}>
              Administrador
            </option>
          )}
          {dataFunction?.roles[0] === "ROLE_ADMIN" && (
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
