import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE MASCOTAS @Lucho2027

const options = [
  { value: "petid1", label: "Pet Name 1" },
  { value: "petid2", label: "Pet Name 2" },
  { value: "petid3", label: "Pet Name 3" },
];

export default function UnitPetsMultipleInput({ pets, initial }) {
  return (
    <div>
      <Select
        isMulti
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={pets}
      />
    </div>
  );
}
