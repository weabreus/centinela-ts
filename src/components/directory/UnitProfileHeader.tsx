import React from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import UnitDataType from "../../models/UnitDataType";
import { HomeIcon } from "@heroicons/react/outline";

const UnitProfileHeader: React.FC<{
  selectedUnit: UnitDataType| null;
}> = ({ selectedUnit }) => {
  return (
    <div>
      {/* Profile top banner image */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <svg className="h-32 w-full object-cover lg:h-48" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path className="text-blue-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"></path>
              <path className="text-blue-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"></path>
            </svg>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            {/* <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={
               "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            /> */}
            <HomeIcon className='h-24 w-24 p-2 rounded-full bg-gray-100 text-gray-500 ring-4 ring-white sm:h-32 sm:w-32'/>
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {selectedUnit?.number}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link to={"/editunit/" + selectedUnit?.path}>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PencilAltIcon
                    className="-ml-1 mr-2 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  Editar
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {selectedUnit?.number}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UnitProfileHeader;
