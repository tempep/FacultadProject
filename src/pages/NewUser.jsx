import React from "react";
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

  console.log(dataNewUser)

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
    <main className="h-screen overflow-hidden bg-dark-blue grid grid-cols-1">
      <section className="flex flex-col justify-center items-center">
        <PersonAdd size={80} color="yellow" />
      </section>
      <section className="flex items-center flex-col">
        <h1 className="text-3xl text-white mb-8 border-b">
          Información del usuario
        </h1>
        <form onSubmit={handleSubmit} id="formNewUser">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="nombre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre completo
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo electrónico
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=" "
              minLength={8}
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              id="confirmPass"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              onKeyUp={validatePassword}
              placeholder=" "
              minLength={8}
              required
            />
            <label
              htmlFor="confirmPass"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirmar contraseña
            </label>
            <span id="wrongPassAlert"></span>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="celular"
                id="celular"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
                placeholder=" "
                onKeyDown={handleNumbers}
                maxLength={10}
                required
              />
              <label
                htmlFor="celular"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Celular
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="numero_identificacion"
                id="numero_identificacion"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
                placeholder=" "
                onKeyDown={handleNumbers}
                maxLength={12}
                required
              />
              <label
                htmlFor="numero_identificacion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Número de identificación
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 gap-y-2">
            <ul className="flex gap-x-1">
              <li className="float-left">
                <label htmlFor="cc" className="text-white">
                  C.C
                </label>
                <input
                  type="radio"
                  id="cc"
                  value="cc"
                  required
                  name="tipo_identificacion"
                  onChange={handleInputChange}
                  className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
              </li>
              <li className="float-left">
                <label htmlFor="ti" className="text-white">
                  T.I
                </label>
                <input
                  type="radio"
                  id="ti"
                  value="ti"
                  required
                  name="tipo_identificacion"
                  onChange={handleInputChange}
                  className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
              </li>
              <li className="float-left">
                <label htmlFor="pas" className="text-white">
                  Pas
                </label>
                <input
                  type="radio"
                  id="pas"
                  value="pas"
                  required
                  name="tipo_identificacion"
                  onChange={handleInputChange}
                  className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
              </li>
              <li className="float-left">
                <label htmlFor="ce" className="text-white">
                  C.E
                </label>
                <input
                  type="radio"
                  id="ce"
                  value="ce"
                  required
                  name="tipo_identificacion"
                  onChange={handleInputChange}
                  className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
              </li>
            </ul>
            <SelectRoles
              setDataNewUser={setDataNewUser}
              dataNewUser={dataNewUser}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 mt-2">
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
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base text-white px-8 py-4 focus:outline-none"
              id="btnSubmit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}