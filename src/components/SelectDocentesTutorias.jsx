import React from "react";
import FilterInput from "./FilterInput";
import { toast } from "react-hot-toast";

const URL_BACKEND_DOCENTE = "http://127.0.0.1:5000/usuario/find_usuario";
const URL_BACKEND_GET_TUTORIAS = "http://127.0.0.1:5000/tutoria/find_tutoria";
const token = window.localStorage.getItem("token");

export default function SelectDocentesTutorias({
  data,
  setDataDocente,
  handleInputChange,
  setTutoriaInfo
}) {
  const [search, setSearch] = React.useState("");
  const [arrayDocente, setArrayDocente] = React.useState([]);

  React.useEffect(() => {
    setArrayDocente(data);
  }, []);

  const getTutorias = async (event) => {
    const response = await fetch(
      `${URL_BACKEND_GET_TUTORIAS}/${event.target.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      window.location.href = "/my/logout";
      throw new Error(data.message);
    } else {
      const data = await response.json();
      return data.datos;
    }
  };

  async function handleChange(event) {
    const toastId = toast.loading("Obteniendo información...");
    try {
      const response = await fetch(
        `${URL_BACKEND_DOCENTE}/${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const resTutorias = await getTutorias(event);
      setTutoriaInfo(resTutorias);
      console.log(resTutorias);
      setDataDocente(data.datos);
      toast.success("Información obtenida!", { id: toastId, duration: 5000 });
    } catch (error) {
      toast.error(error, { id: toastId, duration: 5000 });
      console.error(error.message);
    }
  }

  let arrayResult = [];
  if (!search) {
    arrayResult = arrayDocente;
  } else {
    arrayResult = arrayDocente.filter((docente) =>
      docente.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <main className="flex justify-center items-center gap-x-2">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="docente_id"
        id="docente_id"
        onChange={handleChange}
        onChangeCapture={handleInputChange}
        required
      >
        <option value="">Docentes</option>
        {arrayResult?.map((docente, index) => (
          <option value={docente.numero_identificacion} key={index}>
            {docente.nombre}
          </option>
        ))}
      </select>
      <FilterInput />
    </main>
  );
}
