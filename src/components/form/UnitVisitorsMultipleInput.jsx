import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getVisitors } from "../../firestore/firestoreHelpers";

export default function VisitorInput({ visitors, initial }) {
  const [options, setOptions] = useState([]);
  const [initialVisitor, setVisitor] = useState(initial);

  useEffect(() => {
    getVisitors(setOptions);
  }, []);

  useEffect(() => {
    setVisitor(initial);
    console.log(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialVisitor)}
        isMulti
        defaultValue={initialVisitor}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={visitors}
      />
    </div>
  );
}
