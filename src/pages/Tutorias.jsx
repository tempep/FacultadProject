import React from "react";
import { DataContext } from "../contexts/DataContext";
import { PersonExclamation } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import SelectDocentesTutorias from "../components/SelectDocentesTutorias";
import TableTutorias from "../components/TableTutorias";

export default function Tutorias() {
  const docentes = useLoaderData();
  const [dataDocente, setDataDocente] = React.useState({});
  const [tutoriaInfo, setTutoriaInfo] = React.useState([]);

  return (
    <main className="h-screen overflow-hidden bg-dark-blue grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 justify-items-center md:items-center md:gap-x-2">
      <section className="flex flex-col gap-y-12 items-center">
        <div className="flex flex-col gap-y-6 items-center">
          <PersonExclamation size={80} fill="yellow" />
          <h1 className="text-5xl text-white">Consulta de tutorias</h1>
        </div>
      </section>
      <section>
        <div className="relative overflow-x-auto flex flex-col justify-center items-center gap-y-4">
          <h1 className="text-3xl text-white">Información docente</h1>

          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <output>Nombre: {dataDocente?.nombre}</output>
            <output>Correo: {dataDocente?.email}</output>
            <output>Celular: {dataDocente?.celular}</output>
          </div>

          <SelectDocentesTutorias
            data={docentes.datos}
            setDataDocente={setDataDocente}
            setTutoriaInfo={setTutoriaInfo}
          />
        </div>
      </section>
      <section className="flex col-span-2 mb-64">
        <TableTutorias tutoriaInfo={tutoriaInfo} />
      </section>
    </main>
  );
}
