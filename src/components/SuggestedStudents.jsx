import React from "react";
import { toast } from "react-hot-toast";
const URL_BACKEND_ESTUDIANTES =
  "http://127.0.0.1:5000/usuario/users_estudiante";

export default function SuggestedStudents(estudianteValue) {
  const [arrayEstudiantes, setArrayEstudiantes] = React.useState([]);
  const token = window.localStorage.getItem("token");
  async function getEstudiantes() {
    try {
      const response = await fetch(URL_BACKEND_ESTUDIANTES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        window.location.href = "/my/logout";
        throw new Error("Token has expired");
      } else {
        const data = await response.json();
        setArrayEstudiantes(data.datos);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }
  React.useEffect(() => {
    getEstudiantes();
  }, []);

  let arrayResult = [];
  if (!estudianteValue.estudiante) {
    arrayResult = arrayEstudiantes;
  } else {
    arrayResult = arrayEstudiantes.filter((estudiante) =>
      estudiante.numero_identificacion.includes(estudianteValue.estudiante)
    );
  }

  return (
    <main>
      <select
        className="mt-2 col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="sugerido"
        id="sugerido"
      >
        <option value="">Estudiantes</option>
        {arrayResult?.map((estudiante, index) => (
            <option value={estudiante.numero_identificacion} key={index}>
              {estudiante.nombre} - {estudiante.numero_identificacion}
            </option>
        ))}
      </select>
    </main>
  );
}
