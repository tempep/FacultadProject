import React from "react";

export default function SelectDocentes({ data, handleInputChange }) {
  const [search, setSearch] = React.useState("");
  const [arrayDocente, setArrayDocente]=React.useState([]);

  React.useEffect(() => {
    setArrayDocente(data);
  }, []);

  let arrayResult = [];
  if (!search) {
    arrayResult = arrayDocente;
  } else {
    arrayResult = arrayDocente.filter((docente) =>
      docente.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <main className="grid grid-cols-3 gap-x-2">
      <select
        className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="cedula_docente"
        id="cedula_docente"
        onChange={handleInputChange}
        required
      >
        <option value="">Seleccionar un docente</option>
        {arrayResult.map((docente, index) => (
          <option value={docente.numero_identificacion} key={index}>
            {docente.nombre}
          </option>
        ))}
      </select>
      <input
        type="search"
        onChange={(event) => setSearch(event.target.value)}
        className="block mt-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder="Buscar"
      />
    </main>
  );
}