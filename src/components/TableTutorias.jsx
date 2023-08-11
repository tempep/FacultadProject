import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Trash, PencilSquare, FilePdf, Plus } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import useLocaleStorage from "../hooks/useLocaleStorage";
import Modal from "./Modal";
import SuggestedStudents from "./SuggestedStudents";
import SelectDocentesTutorias from "./SelectDocentesTutorias";
import SelectAsignaturasCurrentUser from "./SelectAsignaturasCurrentUser";

const token = window.localStorage.getItem("token");
const URL_BACKEND_SHOWPDF_TUTORIA =
  "http://localhost:5000/reports/reports_tutoria";

export default function TableTutorias({ data, dataLoader }) {
  const userInfo=useLocaleStorage();
  const [infoDocente, setInfoDocente]=useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [editTutoria, setEditTutoria] = useState({
    docente_id: userInfo.numero_identificacion,
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    estudiante: "",
    estudiantes: [],
    asignatura_id: "",
    tema_desarrollar: "",
  });

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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditTutoria((prevState) => {
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

  

  const buttonStyle = (backgroundColor) => {
    return {
      margin: "5px",
      backgroundColor: `${backgroundColor}`,
      border: "0",
      cursor: "pointer",
      borderRadius: "5px",
      padding: "6px 6px 4px 6px",
    };
  };

  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha,
    },
    {
      name: "HORA INICIO",
      selector: (row) => row.hora_inicio,
    },
    {
      name: "HORA FINAL",
      selector: (row) => row.hora_fin,
    },
    {
      name: "TEMA",
      selector: (row) => row.tema_desarrollar,
    },
    {
      cell: (row) => (
        <>
          {/* <button
            style={buttonStyle("yellow")}
            onClick={() => handleEdit(row)}
          >
            <PencilSquare size={20} color="black" />
          </button> */}
          <button
            style={buttonStyle("green")}
            onClick={() => handleShowPDF(row.id)}
          >
            <FilePdf size={20} color="black" />
          </button>
          <button
            style={buttonStyle("red")}
            onClick={() => handleDelete(row.id)}
          >
            <Trash size={20} color="black" />
          </button>
        </>
      ),
    },
  ];

  const ExpandedComponent = ({ data }) => {
    return (
      <>
        {data.estudiantes.map((estudiante) => (
          <>
            <span>{estudiante.nombre}</span>
            <span> - </span>
          </>
        ))}
      </>
    );
  };

  const handleShowPDF = (id) => {
    window.open(`${URL_BACKEND_SHOWPDF_TUTORIA}/${id}`, "_blank");
  };

  const handleDelete = async (id) => {
    const URL_BACKEND_DELETE_TUTORIA =
      "http://localhost:5000/tutoria/delete_tutoria";
    const toastId = toast.loading("Eliminando tutoria...");
    const response = await fetch(`${URL_BACKEND_DELETE_TUTORIA}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    if (response.status === 401) {
      window.location.href = "/my/logout";
    } else {
      toast.success("Tutoria eliminada!", { id: toastId });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleEdit = async (row) => {
    await setEditTutoria(() => row);
    setIsOpen(() => true);
    console.log(editTutoria);
  };

  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 1,
  };

  return (
    <>
      <DataTable
        title={`${
          data[0]?.docente.nombre ? `Tutorias de ${data[0].docente.nombre}` : ""
        }`}
        columns={columns}
        data={data}
        responsive="true"
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        fixedHeader
      />
      <div style={BUTTON_WRAPPER_STYLES}>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit} id="formNewTutoria">
          <div className="row1">
            <div>
              <i className="icon">Fecha</i>
              <input
                type="date"
                name="fecha"
                id="dateTutoria"
                value={editTutoria.fecha}
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
                value={editTutoria.hora_inicio}
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
                value={editTutoria.hora_fin}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row2">
              <SuggestedStudents estudiante={editTutoria.estudiante} />
              <input
                type="text"
                name="estudiante"
                id="estudianteTutoria"
                placeholder="Filtrar por documento"
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
                  setInfoDocente={setInfoDocente}
                />
              </div>
              <div className="row4">
                <SelectAsignaturasCurrentUser
                  infoDocente={infoDocente}
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
                infoDocente={infoDocente}
                handleInputChange={handleInputChange}
              />
              <div className="">
                <i></i>
                <input
                  type="text"
                  name="tema_desarrollar"
                  id="tema_desarrollar"
                  value={editTutoria.tema_desarrollar}
                  onChange={handleInputChange}
                  placeholder="Tema a desarrollar"
                />
              </div>
            </div>
          )}
            <button className="btn_crear" onClick={handleSubmit}>Crear</button>
        </form>
        </Modal>
      </div>

     
    </>
  );
}
