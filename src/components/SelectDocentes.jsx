import React from "react";
import FilterInput from "./FilterInput";
import { DataContext } from "../contexts/DataContext";

export default function SelectDocentes({ data, handleInputChange }) {
  const { search } = React.useContext(DataContext);
  const [arrayDocente, setArrayDocente] = React.useState([]);

  React.useEffect(() => {
    setArrayDocente(data);
  }, []);

  let arrayResult = [];
  if (!search) {
    arrayResult = arrayDocente;
  } else {
    arrayResult = arrayDocente.filter((docente) =>
      docente.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <select
        name="cedula_docente"
        id="cedula_docente"
        onChange={handleInputChange}
        required
      >
        <option value="" hidden>Docentes</option>
        {arrayResult.map((docente, index) => (
          <option value={docente.numero_identificacion} key={index}>
            {docente.nombre}
          </option>
        ))}
      </select>
      <FilterInput title="nombre" />
    </>
  );
}
