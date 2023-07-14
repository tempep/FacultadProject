import React from "react";
import {useLoaderData} from "react-router-dom";
import SelectDocentes from "../components/SelectDocentes";
import { toast } from "react-hot-toast";
import { WindowPlus } from "react-bootstrap-icons";

const URL_BACKEND_SOLICITAR = "http://127.0.0.1:5000/solicitud/hacer_solicitud";
const token = window.localStorage.getItem("token");

export default function TutoriaRequest() {
  const userInfo = window.localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const [dataRequest, setDataRequest] = React.useState({
    cedula_docente: "",
    descripcion_solicitud: "",
    cedula_estudiante:userInfoParsed.numero_identificacion
  });
  const dataLoader=useLoaderData();

  console.log(dataLoader);
  console.log(dataRequest);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDataRequest((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const toastId=toast.loading("Solicitando...");
    fetch(URL_BACKEND_SOLICITAR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(dataRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status_code === 401){
          window.location.href = "/my/logout";
          throw new Error (data.message);
        }else if(data.status_code === 400){
          throw new Error (data.message);
        }else{
          toast.success("Solicitud realizada!",{
            id:toastId,
            duration:5000
          });
          document.getElementById("formTutoriaRequest").reset();
        }
      })
      .catch((err) => {
        toast.error(err.message,{id:toastId, duration:6000});
        console.log(err);
      });
  }

  console.log(dataLoader.datos);

  return (
    <main className="h-screen bg-dark-blue overflow-hidden grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
        <section className="grid justify-items-center gap-y-6">
          <WindowPlus size={80} fill="yellow" className="mt-6" />
          <h2 className="text-5xl text-white">Nueva solicitud</h2>
        </section>
      <form id="formTutoriaRequest" onSubmit={handleSubmit}>
        <section className="grid justify-items-center gap-y-6">
            <h2 className="text-3xl text-white border-b">Información de la solicitud</h2>
          <SelectDocentes data={dataLoader.datos} handleInputChange={handleInputChange}/>
          <textarea
            name="descripcion_solicitud"
            onChange={handleInputChange}
            rows="4"
            className="block p-2.5 w-4/5 md:w-full text-sm rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
            placeholder="Descripción de la solicitud..."
          />
        <button className="text-white focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base md:px-5 px-16 py-2.5 bg-blue-700 hover:bg-blue-800 border-gray-700">
           Solicitar 
        </button>
        </section>
      </form>
    </main>
  );
}