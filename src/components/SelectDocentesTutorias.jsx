import React from "react";
import FilterInput from "./FilterInput";
import { DataContext } from "../contexts/DataContext";

const URL_BACKEND_FIND_USER = "http://127.0.0.1:5000/usuario/find_usuario";
const token = window.localStorage.getItem("token");

export default function SelectDocentesTutorias({ data, setInfoDocente }) {
  const { search } = React.useContext(DataContext);

  const handleChange = async (event) => {
    const response = await fetch(`${URL_BACKEND_FIND_USER}/${event.target.value}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(response.status === 401){
      window.location.href = "/my/logout";
    }else{
      const data = await response.json();
      setInfoDocente(data.datos);
    }
  }

  let arrayResult = [];
  if (!search) {
    arrayResult = data;
  } else {
    arrayResult = data.filter((docente) =>
      docente.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <select
        name="docente_id"
        id="docente_id"
        className="docentes_tutorias"
        onChange={handleChange}
        required
      >
        <option value="">Docentes</option>
        {arrayResult?.map((docente, index) => (
          <option value={docente.numero_identificacion} key={index}>
            {docente.nombre}
          </option>
        ))}
      </select>
      <FilterInput title="nombre"/>
    </>
  );
}
