import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Select from "react-select";
import { getAllVisitorVehicles } from "../../firestore/firestoreHelpers";

export default function VisitorVehicleMultipleInput({ vehicles, initial }) {
  const [options, setOptions] = useState([]);
  const [initialVehicle, setVehicle] = useState([]);

  useEffect(() => {
    getAllVisitorVehicles(setOptions);
  }, []);

  useEffect(() => {
    setVehicle(initial);
  }, [initial]);
  return (
    <div>
      <Select
        key={JSON.stringify(initialVehicle)}
        isMulti
        defaultValue={initialVehicle}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={vehicles}
      />
    </div>
  );
}
