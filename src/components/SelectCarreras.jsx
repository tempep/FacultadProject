import React from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";
import { Search } from "react-bootstrap-icons";

export default function SelectCarreras({ isTeacher, handleInputChange, data }) {
  const { search } = React.useContext(DataContext);
  const [arrayCarreras, setArrayCarreras] = React.useState([]);
  console.log(data.datos);
  React.useEffect(() => {
    setArrayCarreras(data.datos);
  }, []);

  function alertConfirm() {
    const selectedCarrera = document.getElementById(
      isTeacher ? "programa" : "carrera"
    );
    const response = confirm(
      `¿Estás seguro de seleccionar ${selectedCarrera.value} como carrera?`
    );
    if (response) {
      selectedCarrera.disabled = "true";
      toast.success("Carrera asignada.", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  console.log(arrayCarreras);

  let arrayResult = [];
  if (!search) {
    arrayResult = arrayCarreras;
  } else {
    arrayResult = arrayCarreras.filter((carrera) =>
      carrera.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <select
        name={isTeacher ? "programa" : "carrera"}
        id={isTeacher ? "programa" : "carrera"}
        required
        disabled=""
        onChange={handleInputChange}
      >
        <option value="" hidden>Seleccionar carrera</option>
        {arrayResult?.map((carrera, index) => (
          <option value={carrera.id} key={index} onClick={alertConfirm}>
            {carrera.nombre}
          </option>
        ))}
      </select>
      <div className="container_input_search">
        <i className="icon">
          <Search size={25} />
        </i>
        <FilterInput />
      </div>
    </>
  );
}