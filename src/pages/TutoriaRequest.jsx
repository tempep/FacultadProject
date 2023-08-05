import React from "react";
import "../scss/layout/_tutoria-request.scss";
import { useLoaderData } from "react-router-dom";
import SelectDocentes from "../components/SelectDocentes";
import { toast } from "react-hot-toast";
import { WindowPlus } from "react-bootstrap-icons";

const URL_BACKEND_SOLICITAR = "http://127.0.0.1:5000/solicitud/hacer_solicitud";
const token = window.localStorage.getItem("token");

export default function TutoriaRequest() {
  const docentes = useLoaderData();
  const userInfo = window.localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const [dataRequest, setDataRequest] = React.useState({
    cedula_docente: "",
    descripcion_solicitud: "",
    cedula_estudiante: userInfoParsed.numero_identificacion,
  });

  console.log(docentes);
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
    const toastId = toast.loading("Solicitando...");
    fetch(URL_BACKEND_SOLICITAR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 401) {
          window.location.href = "/my/logout";
          throw new Error(data.message);
        } else if (data.status_code === 400) {
          throw new Error(data.message);
        } else {
          toast.success("Solicitud realizada!", {
            id: toastId,
            duration: 5000,
          });
          document.getElementById("formTutoriaRequest").reset();
        }
      })
      .catch((err) => {
        toast.error(err.message, { id: toastId, duration: 6000 });
        console.log(err);
      });
  }

  return (
    <main className="wrapper_tutoria-request">
      <section className="header">
        <WindowPlus size={80} fill="yellow" />
        <h1>Nueva solicitud</h1>
      </section>
      <form id="formTutoriaRequest" onSubmit={handleSubmit}>
        <h2>Información de la solicitud</h2>
        <div className="row1">
          <SelectDocentes
            data={docentes.datos}
            handleInputChange={handleInputChange}
          />
        </div>
        <textarea
          name="descripcion_solicitud"
          onChange={handleInputChange}
          rows="4"
          placeholder="Descripción de la solicitud..."
        />
        <button className="btn_solicitar">Solicitar</button>
      </form>
    </main>
  );
}
