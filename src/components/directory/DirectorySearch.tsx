import React, { LegacyRef } from "react";
import { useHistory } from "react-router-dom";
import { PlusIcon, SearchIcon } from "@heroicons/react/solid";
import DirectoryType from "../../models/DirectoryTypes";



const DirectorySearch: React.FC<{
  userCount: number;
  searchHandler: (event: React.SyntheticEvent) => void;
  searchInputRef: LegacyRef<HTMLInputElement>;
  directory: DirectoryType;
}> = ({ userCount, searchHandler, searchInputRef, directory }) => {
  
  const history = useHistory();

  return (
    <div className="px-6 pt-6 pb-4">
      <div className="mt-2 flex space-x-4">
        <form className="flex-1 min-w-0">
          <div>
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
                onChange={searchHandler}
                type="search"
                name="search"
                id="search"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Buscar"
                ref={searchInputRef}
              />
            </div>
          </div>
        </form>
        <button
          onClick={() => {
            if (directory === "visitantes") {
              return history.push("/createvisitor");
            } else if (directory === "residentes") {
              return history.push("/createresident");
            } else {
              return history.push("/createunit");
            }
          }
            
          }
          type="submit"
          className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Agregar</span>
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Busque entre los {userCount} {directory} del directorio.
      </p>
    </div>
  );
};

export default DirectorySearch;
