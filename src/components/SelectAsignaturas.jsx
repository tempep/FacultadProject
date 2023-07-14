import React from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";

export default function SelectAsignaturas({ data, setDataNewUser, dataNewUser }) {
  const { search } = React.useContext(DataContext);
  const [arrayAsignaturas, setArrayAsignaturas] = React.useState([]);
  React.useEffect(() => {
     setArrayAsignaturas(() => data.datos);
  }, []);
  
  function addStudenToArray(event) {
    event.preventDefault();
    const response = confirm(
      `¿Deseas elegir ${arrayResult[arrayResult.length-1].nombre} como asignatura?`);
    if (response) {
      setDataNewUser((prevState) => {
        const asignaturas = prevState.asignaturas.concat(
          document.getElementById("selectAsignaturas").value
        );
        return {
          ...prevState,
          asignaturas,
        };
      });
      toast.success(`Asignatura añadida.`, {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  console.log(arrayAsignaturas);
  
  let arrayResult = [];
  if (!search) {
    arrayResult = arrayAsignaturas;
  } else {
    arrayResult = arrayAsignaturas.datos.filter((asignatura) =>
    asignatura.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <main>
      <select
        name={dataNewUser.rol[0] === "ROLE_DOCENTE" ? "asignaturas" : ""}
        onChange={addStudenToArray}
        id="selectAsignaturas"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Elegir asignatura</option>
        {arrayResult?.map((asignatura, index) => (
          <option value={asignatura.id} key={index}>
            {asignatura.nombre}
          </option>
        ))}
      </select>
        <FilterInput />
    </main>
  );
}
