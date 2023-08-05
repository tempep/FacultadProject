import React from "react";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [search, setSearch] = React.useState("");
  const [dataDocente, setDataDocente] = React.useState({});
  const [dataUser, setDataUser] = React.useState({
    nombre:"",
    email:"",
    celular:"",
    numero_identificacion:"",
    tipo_identificacion:"",
    roles:[],
    asignaturas:[]
  });
  

  return (
    <DataContext.Provider
      value={{
        dataDocente,
        setDataDocente,
        dataUser,
        setDataUser,
        search,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
