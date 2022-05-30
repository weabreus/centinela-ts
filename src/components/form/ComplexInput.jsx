import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getComplexesInput } from "../../firestore/firestoreHelpers";

export default function ComplexInput({ complex, initial, disabled }) {
  const [options, setOptions] = useState([]);
  const [initialComplex, setComplex] = useState(initial);

  useEffect(() => {
    getComplexesInput(setOptions);
  }, []);

  useEffect(() => {
    setComplex(initial);
  }, [initial])

  return (
    <div>
      <Select
        key={JSON.stringify(initialComplex)}
        isDisabled={disabled}
        defaultValue={initialComplex}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={complex}
      />
    </div>
  );
}
