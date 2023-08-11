import {useState} from "react";
import "styled-components";
import "../scss/layout/_tutorias.scss";
import { PersonExclamation } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import SelectDocentes from "../components/SelectDocentes";
import TableTutorias from "../components/TableTutorias";
import { toast } from "react-hot-toast";

const URL_BACKEND_GET_TUTORIAS = "http://127.0.0.1:5000/tutoria/find_tutoria";
const token = window.localStorage.getItem("token");

export default function Tutorias() {
  const dataLoader = useLoaderData();
  const [tutoriaInfo, setTutoriaInfo] = useState([]);

  const handleInputChange = async (event) => {
    const toastId=toast.loading("Obteniendo tutorias...");
    const response = await fetch(
      `${URL_BACKEND_GET_TUTORIAS}/${event.target.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      window.location.href = "/my/logout";
      throw new Error(data.message);
    } else {
      const data = await response.json();
      setTutoriaInfo(data.datos);
      toast.dismiss(toastId);
    }
  };

  return (
    <main className="wrapper_tutorias">
      <section className="header">
        <PersonExclamation size={80} fill="yellow" />
        <h1 className="text-5xl text-white">Consulta de tutorias</h1>
      </section>

      <section className="table">
        <div className="container_select-docentes">
          <SelectDocentes
            data={dataLoader.docentes}
            handleInputChange={handleInputChange}
          />
        </div>
        <TableTutorias data={tutoriaInfo} dataLoader={dataLoader}/>
      </section>
    </main>
  );
}
