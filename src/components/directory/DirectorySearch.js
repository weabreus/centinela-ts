import React from 'react';
import { useHistory } from "react-router-dom";
import { PlusIcon, SearchIcon } from "@heroicons/react/solid";

function DirectorySearch(props) {
  const history = useHistory();
  const { userCount, searchHandler, searchInputRef } = props;

  return (
    <div className="px-6 pt-6 pb-4">
      <form className="mt-2 flex space-x-4" onSubmit={searchHandler}>
        <div className="flex-1 min-w-0">
          <label htmlFor="search" className="sr-only">
            Buscar
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar"
              ref={searchInputRef}
            />
          </div>
        </div>
        <button
          onClick={() => history.push("/createresident")}
          type="submit"
          className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Agregar</span>
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Busque entre los {userCount} residentes del directorio.
      </p>
    </div>
  );
}

export default DirectorySearch;
