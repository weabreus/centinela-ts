import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getUnits } from "../../firestore/firestoreHelpers";

export default function UnitInput({unit, initial}) {

  const [options, setOptions] = useState([]);
  const [initialUnit, setUnit] = useState(initial);

  useEffect(() => {getUnits(setOptions);}, [])

  useEffect(() => {
    setUnit(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialUnit)}
        defaultValue={initialUnit}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={unit}
      />
    </div>
  );
}
