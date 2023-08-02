import React from "react";
import "../scss/layout/_edit-user.scss";
import SelectUsuarios from "../components/SelectUsuarios";
import { DataContext } from "../contexts/DataContext";
import { toast } from "react-hot-toast";
import SelectAsignaturas from "../components/SelectAsignaturas";
import {
  PersonFillGear,
  PersonAdd,
  Person,
  Envelope,
  Key,
  Phone,
  CardText,
  CardList,
  Fingerprint,
  PersonBoundingBox
} from "react-bootstrap-icons";
import SelectRoles from "../components/SelectRoles";
import SelectCarreras from "../components/SelectCarreras";
import { useLoaderData } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

const token = window.localStorage.getItem("token");
const URL_BACKEND_UPDATE_USER = "http://localhost:5000/admin/actualizarUsuario";

export default function EditUser() {
  const users = useLoaderData();
  const {dataUser, setDataUser}=React.useContext(DataContext);

  console.log(users);

  async function fetchingData() {
    const toastId = toast.loading("Creando usuario...");
    fetch(URL_BACKEND_UPDATE_USER, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 400 || data.status_code === 401) {
          console.error(data);
          throw new Error(data.message);
        } else {
          toast.dismiss(toastId);
          toast.success("Usuario creado exitosamente!");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        toast.error(err.message);
      })
      .finally(() => {
        toast.dismiss(toastId);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await MySwal.fire({
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      title: "Pregunta",
      text: "¿Desea crear el usuario?",
      icon: "question",
      showDenyButton: true,
      showConfirmButton: true,
    }).then((confirm) => confirm.isConfirmed && fetchingData());
  }

  function handleNumbers(event) {
    var keyCode = event.key;
    if (keyCode !== "Tab" && isNaN(event.key) && keyCode !== "Backspace") {
      event.preventDefault();
    }
  }

  /* const isStudent = () => {
    const res = dataNewUser.rol.includes("ROLE_ESTUDIANTE");
    return res;
  };

  const isTeacher = () => {
    const res = dataNewUser.rol.includes("ROLE_DOCENTE");
    return res;
  }; */

  console.log(dataUser);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDataUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <main className="wrapper_edit-user">
      <section className="title">
        <PersonFillGear size={80} color="yellow" />
        <h1>Edición de usuarios</h1>
      </section>
      <section className="container_select-form">
        <div className="container_select-icon">
          <PersonBoundingBox size={60} color="yellow"/>
        <SelectUsuarios setFunction={setDataUser} />
        </div>
        <form onSubmit={handleSubmit} id="formEditUser">
          <div className="row1">
            <i className="icon">
              <Person size={25} />
            </i>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={dataUser.nombre}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              required
            />
          </div>
          <div className="row2">
            <i className="icon">
              <Envelope size={25} />
            </i>
            <input
              type="email"
              name="email"
              id="email"
              value={dataUser.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="row3">
            <div className="celular">
              <i className="icon">
                <Phone size={25} />
              </i>
              <input
                type="tel"
                name="celular"
                id="celular"
                value={dataUser.celular}
                onChange={handleInputChange}
                placeholder="Celular"
                onKeyDown={handleNumbers}
                maxLength={10}
                required
              />
            </div>
            <div className="numero_identificacion">
              <i className="icon">
                <CardText size={25} />
              </i>
              <input
                type="text"
                name="numero_identificacion"
                id="numero_identificacion"
                value={dataUser.numero_identificacion}
                onChange={handleInputChange}
                placeholder="Número de identificación"
                onKeyDown={handleNumbers}
                maxLength={12}
                required
              />
            </div>
          </div>
          <div className="row4">
            <div className="container_tipo_identificacion">
              <i className="icon">
                <CardList size={25} />
              </i>
              <select
                name="tipo_identificacion"
                className="tipo_identificacion"
                value={dataUser.tipo_identificacion}
                onChange={handleInputChange}
              >
                <option value="" hidden>
                  Tipo de identificación
                </option>
                <option value="cc">Cedúla de ciudadania</option>
                <option value="ti">Tarjeta de identidad</option>
                <option value="pas">Pasaporte</option>
                <option value="ce">Cedúla de extranjería</option>
              </select>
            </div>
            <div className="container_roles">
            <i className="icon">
            <Fingerprint size={25} />
            </i>
            <SelectRoles
            defaultValue={dataUser.roles}
            setDataNewUser={setDataUser}
            dataNewUser={dataUser}
            />
          </div>
          </div>
          {/* <div className="row5">
          {isStudent() && (
            <SelectCarreras
            handleInputChange={handleInputChange}
            data={dataLoaded.carreras}
            />
            )}
            {isTeacher() && (
              <>
              <SelectAsignaturas
              data={dataLoaded.asignaturas}
              setDataNewUser={setDataNewUser}
                dataNewUser={dataNewUser}
                />
                <SelectCarreras
                isTeacher={isTeacher()}
                handleInputChange={handleInputChange}
                data={dataLoaded.carreras}
                />
                </>
                )}
              </div> */}
          <button id="btnSubmit">Aceptar</button>
        </form>
      </section>
    </main>
  );
}
