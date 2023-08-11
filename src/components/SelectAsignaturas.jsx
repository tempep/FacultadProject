import React from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";
import { Search } from "react-bootstrap-icons";

export default function SelectAsignaturas({
  data,
  setFunction,
  dataFunction,
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
      setFunction(prevState => {
        let asignaturas = prevState?.asignaturas?.map((asignatura) => asignatura.id.toString());
        asignaturas?.push(event.target.value);
        console.log(asignaturas);
        return {
          ...prevState,
          ['asignaturas']:[event.target.value]
        };
      });
      toast.success(`Asignatura añadida.`, {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  console.log(dataFunction);

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
        name={dataFunction?.roles[0] === "ROLE_DOCENTE" ? "asignaturas" : ""}
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
