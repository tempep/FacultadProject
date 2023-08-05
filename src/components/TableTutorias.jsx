import React from "react";
import DataTable from "react-data-table-component";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
const token = window.localStorage.getItem("token");

export default function TableTutorias({ data }) {
    const [isNewData, setIsNewData]=React.useState(false);

  const buttonStyle = (backgroundColor) => {
    return {
      margin: "5px",
      backgroundColor: `${backgroundColor}`,
      border: "0",
      cursor: "pointer",
      borderRadius: "5px",
      padding: "6px 6px 4px 6px",
    };
  };

  const columns = React.useMemo(
    () => [
      {
        name: "FECHA",
        selector: (row) => row.fecha,
      },
      {
        name: "HORA INICIO",
        selector: (row) => row.hora_inicio,
      },
      {
        name: "HORA FINAL",
        selector: (row) => row.hora_fin,
      },
      {
        name: "TEMA",
        selector: (row) => row.tema_desarrollar,
      },
      {
        cell: (row) => (
          <>
            <button
              style={buttonStyle("yellow")}
              onClick={() => handleEdit(row.id)}
            >
              <PencilSquare size={20} color="black" />
            </button>
            <button
              style={buttonStyle("red")}
              onClick={() => handleDelete(row.id)}
            >
              <Trash size={20} color="black" />
            </button>
          </>
        ),
      },
    ],[isNewData]);

  const ExpandedComponent = ({ data }) => {
    return (
      <>
        {data.estudiantes.map((estudiante) => (
          <>
            <span>{estudiante.nombre}</span>
            <span> - </span>
          </>
        ))}
      </>
    );
  };

  const handleDelete = async (id) => {
    const URL_BACKEND_DELETE_TUTORIA="http://localhost:5000/tutoria/delete_tutoria";
    const toastId=toast.loading("Eliminando tutoria...");
    const response = await fetch(`${URL_BACKEND_DELETE_TUTORIA}/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        method:"DELETE"
    });
    if(response.status === 401){
        window.location.href="/my/logout";
    }else{
        setIsNewData(prevState => !prevState);
        toast.success("Tutoria eliminada!", {id:toastId});
        console.log(isNewData)
    }
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  return (
    <DataTable
      title={`${
        data[0]?.docente.nombre
          ? `Tutorias de ${data[0].docente.nombre}`
          : ""
      }`}
      columns={columns}
      data={data}
      responsive="true"
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      fixedHeader
    />
  );
}
