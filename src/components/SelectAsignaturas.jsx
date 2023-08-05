import React from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";
import { Search } from "react-bootstrap-icons";

export default function SelectAsignaturas({
  data,
  setDataNewUser,
  dataNewUser,
}) {
  const { search } = React.useContext(DataContext);
  const [arrayAsignaturas, setArrayAsignaturas] = React.useState([]);
  React.useEffect(() => {
    setArrayAsignaturas(() => data.datos);
  }, []);

  function addStudenToArray(event) {
    event.preventDefault();
    const response = confirm(
      `¿Deseas elegir ${
        arrayResult[arrayResult.length - 1].nombre
      } como asignatura?`
    );
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
    <>
      <select
        name={dataNewUser.rol[0] === "ROLE_DOCENTE" ? "asignaturas" : ""}
        onChange={addStudenToArray}
        id="selectAsignaturas"
        required
      >
        <option value="" hidden>Asignaturas</option>
        {arrayResult?.map((asignatura, index) => (
          <option value={asignatura.id} key={index}>
            {asignatura.nombre}
          </option>
        ))}
      </select>
      <div className="container_input_search">
        <i className="icon">
          <Search size={25} />
        </i>
        <FilterInput title="nombre"/>
      </div>
    </>
  );
}
