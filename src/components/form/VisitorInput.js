import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE USUARIOS
const options = [
  { value: "visitorid1", label: "Visitor Name 1" },
  { value: "visitorid2", label: "Visitor Name 2" },
  { value: "visitorid3", label: "Visitor Name 3" },
];



export default function VisitorInput({visitor}) {
  return (
    <div>
      <Select
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={visitor}
      />
    </div>
  );
}
