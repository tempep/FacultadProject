import React from "react";
import { toast } from "react-hot-toast";
import { Calendar2CheckFill } from "react-bootstrap-icons";
import ListAddedStudents from "../components/ListAddedStudents";
import SuggestedStudents from "../components/SuggestedStudents";
import SelectAsignaturasCurrentUser from "../components/SelectAsignaturasCurrentUser";
import SelectDocentesTutorias from "../components/SelectDocentesTutorias";
import { useLoaderData } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";

const URL_BACKEND_NEWTUTORIA = "http://127.0.0.1:5000/tutoria/create_tutoria";

export default function NewTutoria() {
  const { dataDocente, setDataDocente } = React.useContext(DataContext);
  const dataLoader = useLoaderData();
  const token = window.localStorage.getItem("token");
  const objStored = window.localStorage.getItem("userInfo");
  const userInfo = JSON.parse(objStored);
  const [newTutoria, setNewTutoria] = React.useState({
    docente_id: userInfo.numero_identificacion,
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    estudiante: "",
    estudiantes: [],
    asignatura_id: "",
    tema_desarrollar: "",
  });

  console.log(newTutoria);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTutoria((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleKeyDown(event) {
    var keyCode = event.key;
    if (keyCode !== "Tab" && isNaN(event.key) && keyCode !== "Backspace") {
      event.preventDefault();
    }
  }

  //Manejamos el input del estudiante
  //para añadir cada estudiante ingresado a un array;
  function addStudenToArray(event) {
    event.preventDefault();
    if (document.getElementById("sugerido").value === "") {
      toast.error("Debe seleccionar un estudiante.", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      setNewTutoria((prevState) => {
        const estudianteValue = document.getElementById("sugerido").value;
        const estudiantes = prevState.estudiantes.concat(estudianteValue);
        return {
          ...prevState,
          estudiantes,
        };
      });
      toast.success("Añadido.", {
        duration: 3000,
        position: "top-center",
      });
      document.getElementById("estudianteTutoria").value = "";
    }
  }

  //Enviamos la información de la tutoria al servidor con la siguiente funcion;
  async function handleSubmit(event) {
    event.preventDefault();
    if (newTutoria.estudiantes.length === 0) {
      toast.error("Debe agregar al menos un estudiante a la tutoria.");
    } else {
      const toastId = toast.loading("Creando tutoria...");
      const response = await fetch(URL_BACKEND_NEWTUTORIA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTutoria),
      });
      const data = await response.json();
      if (data.status_code == 401) {
        toast.error(data.msg, { id: toastId, duration: 5000 });
        window.location.href = "/my/logout";
      } else if (data.status_code == 400) {
        toast.error(data.message, { id: toastId, duration: 5000 });
      } else {
        toast.success("Tutoria creada!", { id: toastId, duration: 5000 });
        document.getElementById("formNewTutoria").reset();
        setNewTutoria({
          docente_id: "",
          fecha: "",
          hora_inicio: "",
          hora_fin: "",
          estudiante: "",
          estudiantes: [],
          asignatura_id: "",
          tema_desarrollar: "",
        });
      }
    }
  }

  return (
    <main className="h-screen bg-dark-blue overflow-hidden grid grid-cols-1 md:grid-cols-2 md:items-center">
      <section className="grid justify-items-center gap-y-8">
        <Calendar2CheckFill size={80} fill="yellow" />
        <h1 className="text-white text-5xl md:mb-8 mt-4">Agendar tutoria</h1>
        <ListAddedStudents newTutoria={newTutoria} />
      </section>
      <section className="grid justify-items-center md:gap-y-12">
        <h2 className="text-3xl text-white border-b">
          Información de la tutoria
        </h2>
        <form onSubmit={handleSubmit} className="md:w-1/2" id="formNewTutoria">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="fecha"
              id="dateTutoria"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=""
              required
            />
            <label
              htmlFor="dateTutoria"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha
            </label>
          </div>
          <div className="grid grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="time"
                name="hora_inicio"
                id="horaInicio"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                min="07:00"
                max="22:00"
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="horaInicio"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Inicio
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="time"
                name="hora_fin"
                id="horaFinal"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                min={newTutoria.startTime}
                max="22:00"
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="horaFinal"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Finalización
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="estudiante"
                id="estudianteTutoria"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onKeyDown={handleKeyDown}
                maxLength={12}
                onChange={handleInputChange}
              />
              <label
                htmlFor="estudianteTutoria"
                className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Identificación del estudiante
              </label>
            </div>
            <SuggestedStudents estudiante={newTutoria.estudiante} />
          </div>
          {dataLoader.isAdministrator ? (
            <div className="grid grid-cols-1 md:gap-6">
              <SelectDocentesTutorias
                data={dataLoader.docentes.datos}
                setDataDocente={setDataDocente}
                handleInputChange={handleInputChange}
              />
              <div className="grid grid-cols-2 justify-center items-center md:gap-6">
                <SelectAsignaturasCurrentUser
                  userInfo={dataDocente}
                  handleInputChange={handleInputChange}
                />
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="tema_desarrollar"
                    id="tema_desarrollar"
                    onChange={handleInputChange}
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label
                    htmlFor="tema_desarrollar"
                    className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tema a desarrollar
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 justify-center items-center md:gap-6">
              <SelectAsignaturasCurrentUser
                userInfo={userInfo}
                handleInputChange={handleInputChange}
              />
              <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="tema_desarrollar"
                    id="tema_desarrollar"
                    onChange={handleInputChange}
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label
                    htmlFor="tema_desarrollar"
                    className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tema a desarrollar
                  </label>
                </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-x-2">
            <button
              onClick={addStudenToArray}
              className="focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm md:px-5 px-4 py-2.5 bg-yellow-300 hover:bg-yellow-400 text-black border-gray-700"
            >
              Agregar
            </button>
            <button
              onClick={handleSubmit}
              className="col-span-2 text-white focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base md:px-5 px-16 py-2.5 bg-blue-700 hover:bg-blue-800 border-gray-700"
            >
              Crear
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
