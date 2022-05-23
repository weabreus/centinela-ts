import React from "react";

import Select from "react-select";

// PARA CREAR ENDPOINT DE UNIDADES @Lucho2027
const options = [
  { value: "unitid1", label: "Unit Name 1" },
  { value: "unitid2", label: "Unit Name 2" },
  { value: "unitid3", label: "Unit Name 3" },
];



export default function UnitInput({unit, initial}) {
  return (
    <div>
      <Select
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={unit}
      />
    </div>
  );
}
