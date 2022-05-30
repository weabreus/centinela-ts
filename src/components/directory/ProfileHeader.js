import React from "react";
import { PencilAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function ProfileHeader(props) {
  const { selectedUser, profile } = props;

  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={profile.coverImageUrl}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={
                selectedUser.photo
                  ? selectedUser.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {selectedUser.name}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MailIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Mensaje</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PhoneIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>LLamar</span>
              </button>
              <Link to={"/editresident/" + selectedUser.id}>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilAltIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
            {selectedUser.name}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
