import React from "react";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
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
  const [search, setSearch] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});

  return (
    <DataContext.Provider
      value={{
        dataDocente,
        setDataDocente,
        dataUser,
        setDataUser,
        search,
        setSearch,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
