import React from "react";
import { toast } from "react-hot-toast";

export default function SelectAsignaturasCurrentUser({infoDocente,handleInputChange}) {
  const alertSelected = () => {
    toast.success("Asignatura seleccionada");
    document.getElementById("asignatura_id").disabled = true;
  };

  console.log(infoDocente);

  return (
    <select
      name="asignatura_id"
      id="asignatura_id"
      onChange={handleInputChange}
      onChangeCapture={alertSelected}
      required
    >
      <option value="">Asignaturas del docente</option>
      {infoDocente?.asignaturas?.map((asignatura, index) => (
        <option value={asignatura.id} key={index}>
          {asignatura.nombre}
        </option>
      ))}
    </select>
  );
}
