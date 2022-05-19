import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE VEHICULOS PERTENECIENTES AL VISITANTE SELECCIONADO


const options = [
  { value: "Vehicleid1", label: "Vehicle Name 1" },
  { value: "Vehicleid2", label: "Vehicle Name 2" },
  { value: "Vehicleid3", label: "Vehicle Name 3" },
];



export default function VehicleInput({vehicle, visitor}) {
  // const selectedVisitor = visitor.current.getValue()[0].value;
  // La variable anterior contendria el valor del usuario seleccionado en el select de visitantes.

  return (
    <div>
      <Select
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={vehicle}
      />
    </div>
  );
}
