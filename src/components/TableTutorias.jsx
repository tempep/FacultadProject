import React from "react";
import { PencilSquare, Plus, Trash3Fill, FilePdf, FilePdfFill } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";

const URL_BACKEND_DELETE_TUTORIA =
  "http://127.0.0.1:5000/tutoria/delete_tutoria";
const URL_BACKEND_EDIT_TUTORIA = "";
const URL_BACKEND_REPORT = "http://127.0.0.1:5000/reports/reports_tutoria";

export default function TableTutorias({ tutoriaInfo }) {

  function showStudents() {
    toast.custom(
      (t) => (
        <div
          className={`bg-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <ul>
            {tutoriaInfo[0].estudiantes.map((estudiante, index) => (
              <li key={index}>{estudiante.nombre}</li>
            ))}
          </ul>
        </div>
      ),
      {
        duration: 30000,
        position: "top-center",
        style: {
          backgroundColor: "fff",
          border: "1px solid #713200",
        },
      }
    );
  }

  async function handleReport(id){
    const toastId=toast.loading("Obteniendo reporte...");
    try {
        const newWindow = window.open(`http://127.0.0.1:5000/reports/reports_tutoria/${id}`, '_blank');
        newWindow.focus();
        toast.dismiss(toastId);
    } catch (error) {
        toast.error(error, {id:toastId, duration:5000})
        console.error(error);        
    }
  }

  async function handleDelete(id) {
    const token = window.localStorage.getItem("token");
    const toastId = toast.loading("Eliminando...");
    try {
      const response = await fetch(`${URL_BACKEND_DELETE_TUTORIA}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Tutoria eliminada!", { id: toastId, duration: 3000 });
    } catch (error) {
      toast.error(error, { id: toastId, duration: 5000 });
      console.error(error);
    }
  }


  return (
    <main>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Funciones
              </th>
              <th scope="col" className="px-6 py-3">
                Docente
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Hora inicio - fin
              </th>
              <th scope="col" className="px-6 py-3">
                Asignatura
              </th>
              <th scope="col" className="px-6 py-3">
                Tema desarrollado
              </th>
              <th scope="col" className="px-6 py-3">
                Estudiantes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" className="px-6 py-4 flex gap-x-6">
                <button onClick={() => handleDelete(tutoriaInfo[0]?.id)}>
                  <Trash3Fill size={25} fill="red" />
                </button>
                <button className="mt-1">
                  <PencilSquare size={25} fill="yellow" />
                </button>
                <button onClick={() => handleReport(tutoriaInfo[0].id)}>
                    <FilePdfFill size={25} color="white"/>
                </button>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {tutoriaInfo[0]?.docente.nombre}
              </th>
              <td className="px-6 py-4">{tutoriaInfo[0]?.fecha}</td>
              <td className="px-6 py-4">
                {tutoriaInfo[0]?.hora_inicio} - {tutoriaInfo[0]?.hora_fin}
              </td>
              <td className="px-6 py-4">{tutoriaInfo[0]?.asignatura.nombre}</td>
              <td className="px-6 py-4">{tutoriaInfo[0]?.tema_desarrollar}</td>
              <td className="px-6 py-4 flex justify-center items-center gap-x-2">
                {tutoriaInfo[0]?.estudiantes[0].nombre}{" "}
                {tutoriaInfo[0]?.estudiantes.length > 1 && (
                  <button onClick={showStudents}>
                    <Plus size={35} fill="white" />
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
