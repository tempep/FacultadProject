import React from "react";
import { toast } from "react-hot-toast";

export default function SelectAsignaturasCurrentUser({userInfo,handleInputChange,}) {

    const alertSelected = () => {
        toast.success("Asignatura seleccionada");
        document.getElementById("asignatura_id").disabled=true;
    }

  return (
    <select
      name="asignatura_id"
      id="asignatura_id"
      className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleInputChange}
      onChangeCapture={alertSelected}
      required
    >
      <option value="">Asignaturas del docente</option>
      {userInfo.asignaturas?.map((asignatura, index) => (
        <option value={asignatura.id} key={index}>
          {asignatura.nombre}
        </option>
      ))}
    </select>
  );
}