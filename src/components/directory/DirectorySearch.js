import React from 'react';
import { FilterIcon, SearchIcon } from "@heroicons/react/solid";

function DirectorySearch(props) {
  const { userCount, searchHandler, searchInputRef } = props;

  return (
    <div className="px-6 pt-6 pb-4">
      <h2 className="text-lg font-medium text-gray-900">Directorio</h2>
      <p className="mt-1 text-sm text-gray-600">
        Entre los {userCount} usuarios del directorio.
      </p>
      <form className="mt-6 flex space-x-4" onSubmit={searchHandler}>
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
          type="submit"
          className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Buscar</span>
        </button>
      </form>
    </div>
  );
}

export default DirectorySearch;
