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
    <main className="wrapper_tutoria-request">
        <section className="header">
          <WindowPlus size={80} fill="yellow" className="mt-6" />
          <h2 className="text-5xl text-white">Nueva solicitud</h2>
        </section>
      <form id="formTutoriaRequest" onSubmit={handleSubmit}>
        <section className="">
          <SelectDocentes data={dataLoader.datos} handleInputChange={handleInputChange}/>
          <textarea
            name="descripcion_solicitud"
            onChange={handleInputChange}
            rows="4"
            placeholder="Descripción de la solicitud..."
          />
        <button className="btn_solicitar">
           Solicitar 
        </button>
        </section>
      </form>
    </main>
  );
}