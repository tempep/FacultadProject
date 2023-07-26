import React from "react";
import "../scss/layout/_new-user.scss";
import { useLoaderData } from "react-router-dom";
import SelectAsignaturas from "../components/SelectAsignaturas";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PersonAdd } from "react-bootstrap-icons";
import SelectRoles from "../components/SelectRoles";
import SelectCarreras from "../components/SelectCarreras";
const MySwal = withReactContent(Swal);

const URL_BACKEND_NEW_USER = "http://127.0.0.1:5000/auth/register";
const token = window.localStorage.getItem("token");

export default function NewUser() {
  const dataLoaded = useLoaderData();
  const [dataNewUser, setDataNewUser] = React.useState({
    nombre: "",
    email: "",
    password: "",
    celular: "",
    rol: [],
    numero_identificacion: "",
    tipo_identificacion: "",
    carrera: "",
    programa: "",
    asignaturas: [],
  });

  console.log(dataNewUser);

  const isStudent = () => {
    const res = dataNewUser.rol.includes("ROLE_ESTUDIANTE");
    return res;
  };

  const isTeacher = () => {
    const res = dataNewUser.rol.includes("ROLE_DOCENTE");
    return res;
  };

  function handleNumbers(event) {
    var keyCode = event.key;
    if (keyCode !== "Tab" && isNaN(event.key) && keyCode !== "Backspace") {
      event.preventDefault();
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDataNewUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  console.log(dataNewUser);

  async function fetchingData() {
    const toastId = toast.loading("Creando usuario...");
    fetch(URL_BACKEND_NEW_USER, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataNewUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 400 || data.status_code === 401) {
          console.error(data);
          throw new Error(data.message);
        } else {
          toast.dismiss(toastId);
          toast.success("Usuario creado exitosamente!");
          setDataNewUser({
            nombre: "",
            email: "",
            password: "",
            celular: "",
            rol: [],
            numero_identificacion: "",
            tipo_identificacion: "",
            carrera: "",
            asignaturas: [],
          });
          document.getElementById("formNewUser").reset();
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
      background: "rgba(17,29,53,255)",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      title: "Pregunta",
      text: "¿Desea crear el usuario?",
      icon: "question",
      showDenyButton: true,
      showConfirmButton: true,
    }).then((confirm) => confirm.isConfirmed && fetchingData());
  }

  /*Function to confirm it's the same password */
  function validatePassword() {
    var pass = document.getElementById("password").value;
    var confirmPass = document.getElementById("confirmPass").value;
    if (pass !== confirmPass) {
      document.getElementById("wrongPassAlert").style.color = "red";
      document.getElementById("wrongPassAlert").innerHTML =
        "Debe usar la misma contraseña";
      document.getElementById("btnSubmit").disabled = true;
      document.getElementById("btnSubmit").style.opacity = 0.4;
    } else {
      document.getElementById("wrongPassAlert").style.color = "green";
      document.getElementById("wrongPassAlert").innerHTML = "Contraseña valida";
      document.getElementById("btnSubmit").disabled = false;
      document.getElementById("btnSubmit").style.opacity = 1;
    }
  }

  return (
    <main className="wrapper_new-user">
      <PersonAdd size={80} color="yellow" />
        <h1 className="">Información del usuario</h1>
        <form onSubmit={handleSubmit} id="formNewUser">
          <div className="">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className=""
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label htmlFor="nombre" className="">
              Nombre completo
            </label>
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              id="email"
              className=""
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label htmlFor="email" className="">
              Correo electrónico
            </label>
          </div>
          <div className="">
            <input
              type="password"
              name="password"
              id="password"
              className=""
              onChange={handleInputChange}
              placeholder=" "
              minLength={8}
              required
            />
            <label htmlFor="password" className="">
              Contraseña
            </label>
          </div>
          <div className="">
            <input
              type="password"
              id="confirmPass"
              className=""
              onChange={handleInputChange}
              onKeyUp={validatePassword}
              placeholder=" "
              minLength={8}
              required
            />
            <label htmlFor="confirmPass" className="">
              Confirmar contraseña
            </label>
            <span id="wrongPassAlert"></span>
          </div>
          <div className="">
            <div className="">
              <input
                type="tel"
                name="celular"
                id="celular"
                className=""
                onChange={handleInputChange}
                placeholder=" "
                onKeyDown={handleNumbers}
                maxLength={10}
                required
              />
              <label htmlFor="celular" className="">
                Celular
              </label>
            </div>
            <div className="">
              <input
                type="text"
                name="numero_identificacion"
                id="numero_identificacion"
                className=""
                onChange={handleInputChange}
                placeholder=" "
                onKeyDown={handleNumbers}
                maxLength={12}
                required
              />
              <label htmlFor="numero_identificacion" className="">
                Número de identificación
              </label>
            </div>
          </div>
          <div className="">
            <SelectRoles
              setDataNewUser={setDataNewUser}
              dataNewUser={dataNewUser}
            />
          </div>
          <div className="">
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
          </div>
          <div className="">
            <button className="" id="btnSubmit">
              Aceptar
            </button>
          </div>
        </form>
    </main>
  );
}
