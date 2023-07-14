import React from "react";
import { PersonVcard } from "react-bootstrap-icons";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const URL_BACKEND_LOGIN = "http://127.0.0.1:5000/auth/login";

export default function Login() {
  const { login } = useAuthContext();
  const [dataLogin, setDataLogin] = React.useState({
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDataLogin((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const toastId = toast.loading("Iniciando sesión...");
      const response = await fetch(URL_BACKEND_LOGIN, {
        method: "POST",
        body: JSON.stringify(dataLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status_code == 201 || data.status_code == 200) {
        toast.success("Credenciales validas!", {
          id: toastId,
          duration: 3000,
        });
        window.localStorage.setItem("token", data.token);
        login();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      console.log(error.message);
    }
  }

  return (
    <main className="h-screen overflow-hidden flex justify-center flex-col items-center bg-dark-blue">
      <h1 className="md:text-3xl text-2xl mb-8">
        <span className="text-white">Facultad</span>{" "}
        <span className="text-yellow-300">Project</span>
      </h1>
      <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center flex-col items-center">
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white">
              Inicio de sesión
            </h5>
            <PersonVcard size={90} color="white" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="usuario@unibarranquilla.edu.co"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="••••••••••"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
