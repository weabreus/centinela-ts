import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE VISITANTES @Lucho2027

const options = [
  { value: "visitorid1", label: "Visitor Name 1" },
  { value: "visitorid2", label: "Visitor Name 2" },
  { value: "visitorid3", label: "Visitor Name 3" },
];

export default function VisitorInput({ visitors, initial }) {
  return (
    <div>
      <Select
        isMulti
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={visitors}
      />
    </div>
  );
}
