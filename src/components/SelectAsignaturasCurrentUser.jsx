import React from "react";
import { toast } from "react-hot-toast";

export default function SelectAsignaturasCurrentUser({
  dataAsignaturas,
  handleInputChange,
}) {
  const alertSelected = () => {
    toast.success("Asignatura seleccionada");
    document.getElementById("asignatura_id").disabled = true;
  };

  console.log(dataAsignaturas);

  return (
    <select
      name="asignatura_id"
      id="asignatura_id"
      onChange={handleInputChange}
      onChangeCapture={alertSelected}
      required
    >
      <option value="" hidden>
        Asignaturas del docente
      </option>
      {dataAsignaturas?.map((asignatura, index) => (
        <option value={asignatura.id} key={index}>
          {asignatura.nombre}
        </option>
      ))}
    </select>
  );
}
