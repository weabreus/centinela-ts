import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE VEHICULOS DEL COMPLEJO

const options = [
  { value: "Vehicleid1", label: "Vehicle Name 1" },
  { value: "Vehicleid2", label: "Vehicle Name 2" },
  { value: "Vehicleid3", label: "Vehicle Name 3" },
];

export default function VehicleInput({ vehicles, initial }) {
  return (
    <div>
      <Select
        isMulti
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={vehicles}
      />
    </div>
  );
}
