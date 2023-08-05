import React from "react";
import "styled-components";
import "../scss/layout/_tutorias.scss";
import { PersonExclamation, Trash, PencilSquare } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import SelectDocentes from "../components/SelectDocentes";
import DataTable from "react-data-table-component";
import TableTutorias from "../components/TableTutorias";

const URL_BACKEND_GET_TUTORIAS = "http://127.0.0.1:5000/tutoria/find_tutoria";
const token = window.localStorage.getItem("token");

export default function Tutorias() {
  const docentes = useLoaderData();
  const [tutoriaInfo, setTutoriaInfo] = React.useState([]);

  const handleInputChange = async (event) => {
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
      console.log(data);
    }
  };

  console.log(tutoriaInfo)

  return (
    <main className="wrapper_tutorias">
      <section className="header">
        <PersonExclamation size={80} fill="yellow" />
        <h1 className="text-5xl text-white">Consulta de tutorias</h1>
      </section>

      <section className="table">
        <div className="container_select-docentes">
          <SelectDocentes
            data={docentes.datos}
            handleInputChange={handleInputChange}
          />
        </div>
        <TableTutorias data={tutoriaInfo} />
      </section>
    </main>
  );
}
