import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Select from "react-select";
import { getBuilding, getBuildingInput } from "../../firestore/firestoreHelpers";

// Taer todos los edificios de firestore @Lucho2027
const options = [
  { value: "buildingid1", label: "Building Name 1" },
  { value: "buildingid2", label: "Building Name 2" },
  { value: "buildingid3", label: "Building Name 3" },
];



export default function BuildingInput({building, initial}) {
  const [options, setOptions] = useState([]);
  const [initialBuilding, setBuilding] = useState(initial);

  useEffect(() => {
    getBuildingInput(setOptions);
  }, []);

  useEffect(() => {
    setBuilding(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialBuilding)}
        defaultValue={initialBuilding}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={building}
      />
    </div>
  );
}
