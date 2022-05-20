import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE RESIDENTES
const options = [
  { value: "residentid1", label: "Resident Name 1" },
  { value: "residentid2", label: "Resident Name 2" },
  { value: "residentid3", label: "Resident Name 3" },
];



export default function ResidentInput({resident, initial}) {
  return (
    <div>
      <Select
      defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={resident}
      />
    </div>
  );
}
