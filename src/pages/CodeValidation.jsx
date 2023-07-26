import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const URL_BACKEND_VALIDATION = "http://127.0.0.1:5000/auth/verify";

export default function CodeValidation() {
  const [code, setCode] = React.useState(
    {codigo: "" }
    );

  async function handleSubmit(event) {
    event.preventDefault();
    const toastId = toast.loading("Validando usuario...");
    try {
      await fetch(URL_BACKEND_VALIDATION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(code),
      });
      toast.success("Usuario validado con éxito!",{id:toastId, duration:5000});
      document.getElementById("codigo").value="";
    } catch (error) {
      toast.error(error,{id:toastId, duration:5000});
      console.error(error);
    }
  }

  console.log(JSON.stringify(code));

  function handleChange(event) {
    const { name,value } = event.target;
    setCode(prevState => {
      return {
        ...prevState,[name]:value
      }
    });
  }

  return (
    <main className="h-screen bg-dark-blue overflow-hidden flex md:justify-center items-center gap-y-6 md:gap-y-12 flex-col">
      <h1 className="text-3xl md:text-5xl text-white mt-6">
        Validacion de cuentas
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8 flex flex-col gap-y-4"
      >
        <div className="relative z-0 w-full">
          <label
            htmlFor="codigo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Ingresa el codigo de validación
          </label>
          <input
            placeholder=""
            id="codigo"
            name="codigo"
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
        <button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base text-white px-8 py-4 focus:outline-none">
          Aceptar
        </button>
        <button
          className="bg-white hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base text-black px-8 py-4 focus:outline-none"
          onClick={() => <Link to="/" />}
        >
          Página principal
        </button>
      </form>
    </main>
  );
}
