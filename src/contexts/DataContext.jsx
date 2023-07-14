import React from "react";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {

  const [dataDocente, setDataDocente] = React.useState({});
  const [dataUsuario, setDataUsuario] = React.useState({});
  const [arrayUsuarios, setArrayUsuarios] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});

  return (
    <DataContext.Provider
      value={{
        dataDocente,
        setDataDocente,
        dataUsuario,
        setDataUsuario,
        setArrayUsuarios,
        arrayUsuarios,
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
