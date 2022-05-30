import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";

import { getVisitors } from "../../firestore/firestoreHelpers";

 

export default function VisitorInput({
  visitor,
  initial,
  visitorChangeHandle,
}) {
  const [options, setOptions] = useState([]);
  const [initialVisitor, setVisitor] = useState(initial);

  useEffect(() => {
    getVisitors(setOptions);
  }, []);

  useEffect(() => {
    setVisitor(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialVisitor)}
        onChange={visitorChangeHandle}
        defaultValue={initialVisitor}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={visitor}
      />
    </div>
  );
}
