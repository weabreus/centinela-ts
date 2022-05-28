import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE VEHICULOS PERTENECIENTES AL VISITANTE SELECCIONADO






export default function VehicleInput({vehicle, options, initial}) {
  

  return (
    <div>
      <Select
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={vehicle}
      />
    </div>
  );
}
