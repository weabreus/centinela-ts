import React from "react";

import Select from "react-select";

// Taer todos los edificios de firestore @Lucho2027
const options = [
  { value: "buildingid1", label: "Building Name 1" },
  { value: "buildingid2", label: "Building Name 2" },
  { value: "buildingid3", label: "Building Name 3" },
];



export default function BuildingInput({building, initial}) {
  return (
    <div>
      <Select
      defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={building}
      />
    </div>
  );
}
