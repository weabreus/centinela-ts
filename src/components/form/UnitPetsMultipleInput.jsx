import React, { useState, useEffect } from "react";

import Select from "react-select";

import { getResidentPets } from "../../firestore/firestoreHelpers";

export default function UnitPetsMultipleInput({ pets, initial }) {
  const [options, setOptions] = useState([]);
  const [initialPet, setPet] = useState(initial);

  useEffect(() => {
    getResidentPets(setOptions);
  }, []);

  useEffect(() => {
    setPet(initial)
  }, [initial]);

  return (
    <div>
      <Select
      key={JSON.stringify(initialPet)}
        isMulti
        defaultValue={initialPet}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={pets}
      />
    </div>
  );
}
