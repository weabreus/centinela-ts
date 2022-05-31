import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getResidents } from "../../firestore/firestoreHelpers";

export default function ResidentInput({residents, initial}) {
  const [options, setOptions] = useState([]);
  const [initialResident, setResident] = useState(initial);

  useEffect(() => {
    getResidents(setOptions);
  }, []);

  useEffect(() => {
    setResident(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialResident)}
        isMulti
        defaultValue={initialResident}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={residents}
      />
    </div>
  );
}
