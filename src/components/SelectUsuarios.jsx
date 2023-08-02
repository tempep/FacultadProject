import React from "react";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";
import { useLoaderData } from "react-router-dom";

const token = window.localStorage.getItem("token");
const URL_BACKEND_FIND_USER = "http://localhost:5000/usuario/find_usuario";

export default function SelectUsuarios({ setFunction }) {
  const { search, setDataUser } = React.useContext(DataContext);
  const users = useLoaderData();

  function handleChangeSelect(event) {
    const { value } = event.target;
    console.log(value);
    fetch(`${URL_BACKEND_FIND_USER}/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDataUser(data.datos))
      .catch((error) => console.log(error));
  }


  let arrayResult = [];
  if (!search) {
    arrayResult = users.datos;
  } else {
    arrayResult = users.datos.filter((res) =>
      res.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <select
        name="selectUsuarios"
        id="select_usuarios"
        className="select_usuarios"
        onChange={handleChangeSelect}
      >
        <option selected value="">
          Seleccionar un usuario
        </option>
        {arrayResult?.map((usuario, index) => (
          <option value={usuario.numero_identificacion} key={index}>
            {usuario.nombre}
          </option>
        ))}
      </select>
      <FilterInput />
    </>
  );
}
