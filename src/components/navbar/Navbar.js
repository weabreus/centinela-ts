import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import VisitsForm from "../visitsForm/VisitsForm";

function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  
  return (
    <>
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
         {location.pathname === "/profile" ? "Perfil" : ""}
         {location.pathname === "/visits" ? "Visitas" : ""}
         {location.pathname === "/directory" ? "Directorio" : ""}
        </h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          onClick={() => setOpen(true)}
        >
          Crear Visita
        </button>
      </div>
    </div>

    <VisitsForm open={open} setOpen={setOpen}/>

    </>
  );
}

export default Navbar;
