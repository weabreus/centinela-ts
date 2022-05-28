import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getUnits } from "../../firestore/firestoreHelpers";

export default function UnitInput({unit, initial}) {

  const [options, setOptions] = useState([]);

  useEffect(() => {getUnits(setOptions);}, [])

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
