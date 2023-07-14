import React from "react";
import { DataContext } from "../contexts/DataContext";
import { PersonExclamation } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import SelectDocentesTutorias from "../components/SelectDocentesTutorias";

export default function Tutorias() {
  const docentes=useLoaderData();
  const [dataDocente, setDataDocente] = React.useState({});
  
  console.log(dataDocente);

  return (
    <main className="h-screen overflow-hidden bg-dark-blue grid grid-cols-1 md:grid-cols-2 justify-items-center md:items-center md:gap-x-2">
      <section className="flex flex-col gap-y-12 items-center">
        <div className="flex flex-col gap-y-6 items-center">
          <PersonExclamation size={80} fill="yellow" />
          <h1 className="text-5xl text-white">Consulta de tutorias</h1>
        </div>
        <SelectDocentesTutorias data={docentes.datos} setDataDocente={setDataDocente}/>
      </section>
      <section className="flex flex-col items-center gap-y-2">
        <div>
          <h1 className="text-3xl text-white border-b">Información del docente</h1>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs max-h-48 md:max-h-56 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-yellow-300 dark:border-gray-700">
          <output className="text-black">
            Nombre:<span className="text-black hover:text-white">{dataDocente.nombre}</span>
          </output>
          <output className="text-black">
            Celular:
            <span className="text-black hover:text-white">{dataDocente.celular}</span>
          </output>
          <output className="text-black">
            Correo:
            <span className="text-black hover:text-white">
              {dataDocente.email}
            </span>
          </output>
        </div>
      </section>
    </main>
  );
}
