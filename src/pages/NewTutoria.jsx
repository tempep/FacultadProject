import React from "react";
import "../scss/layout/_new-tutoria.scss";
import { toast } from "react-hot-toast";
import { Calendar2CheckFill, PersonBadge, Plus } from "react-bootstrap-icons";
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
      toast.error(
        "Debe agregar al menos un estudiante a la tutoria. Para agregar un estudiante debe presionar el boton 'Agregar'",
        { duration: 7000 }
      );
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
    <main className="wrapper_new-tutoria">
      <section className="header">
        <Calendar2CheckFill size={80} fill="yellow" />
        <h1 className="text-white text-5xl md:mb-8 mt-4">Agendar tutoria</h1>
        <ListAddedStudents newTutoria={newTutoria} />
      </section>
      <section className="container_form">
        <form onSubmit={handleSubmit} id="formNewTutoria">
          <div className="row1">
            <div>
              <i className="icon">Fecha</i>
              <input
                type="date"
                name="fecha"
                id="dateTutoria"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="">
              <i className="icon">Hora inicio</i>
              <input
                type="time"
                name="hora_inicio"
                id="horaInicio"
                min="07:00"
                max="22:00"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="">
              <i className="icon">Hora final</i>
              <input
                type="time"
                name="hora_fin"
                id="horaFinal"
                min={newTutoria.startTime}
                max="22:00"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row2">
              <SuggestedStudents estudiante={newTutoria.estudiante} />
              <input
                type="text"
                name="estudiante"
                id="estudianteTutoria"
                placeholder="Filtrar"
                onKeyDown={handleKeyDown}
                maxLength={12}
                onChange={handleInputChange}
              />
              <button className="btn_add-student" onClick={addStudenToArray}>
                <Plus size={20} color="green"/>
              </button>
          </div>
          {dataLoader.isAdministrator ? (
            <>
              <div className="row3">
                <SelectDocentesTutorias
                  data={dataLoader.docentes.datos}
                  setDataDocente={setDataDocente}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="row4">
                <SelectAsignaturasCurrentUser
                  userInfo={dataDocente}
                  handleInputChange={handleInputChange}
                />
                <div className="container_input-text">
                  <i></i>
                  <input
                    type="text"
                    name="tema_desarrollar"
                    id="tema_desarrollar"
                    onChange={handleInputChange}
                    placeholder="Tema a desarrollar"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="row4">
              <SelectAsignaturasCurrentUser
                userInfo={userInfo}
                handleInputChange={handleInputChange}
              />
              <div className="">
                <i></i>
                <input
                  type="text"
                  name="tema_desarrollar"
                  id="tema_desarrollar"
                  onChange={handleInputChange}
                  placeholder="Tema a desarrollar"
                />
              </div>
            </div>
          )}
            <button className="btn_crear" onClick={handleSubmit}>Crear</button>
        </form>
      </section>
    </main>
  );
}
