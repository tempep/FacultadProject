import React from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../contexts/DataContext";
import FilterInput from "./FilterInput";

export default function SelectCarreras({isTeacher,handleInputChange, data}) {
    const { search }=React.useContext(DataContext);
    const [arrayCarreras, setArrayCarreras] = React.useState([]);
    console.log(data.datos);
    React.useEffect(() => {
      setArrayCarreras(data.datos)
    }, []);

    function alertConfirm(){
      const selectedCarrera=document.getElementById(isTeacher ? "programa" : "carrera"  );
      const response=confirm(`¿Estás seguro de seleccionar ${selectedCarrera.value} como carrera?`);
      if(response){
        selectedCarrera.disabled="true";
        toast.success("Carrera asignada.", {
          duration:3000,
          position:"top-center"
        })
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
    <main>
      <select
        name={isTeacher ? "programa" : "carrera"}
        id={isTeacher ? "programa" : "carrera"}
        required
        disabled=""
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Seleccionar carrera</option>
        {arrayResult?.map((carrera, index) => (
          <option value={carrera.id} key={index} onClick={alertConfirm}>
            {carrera.nombre}
          </option>
        ))}
      </select>
      <FilterInput />
    </main>
  );
}
