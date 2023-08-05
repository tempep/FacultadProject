import React from "react";
import { DataContext } from "../contexts/DataContext";

export default function FilterInput({title}){
    const { setSearch } = React.useContext(DataContext);

    return (
        <input
          type="search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Filtrar por ${title}`}
          className="col-span-3 block mt-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
    )
}