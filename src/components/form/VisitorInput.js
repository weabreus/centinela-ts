import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";
import { getVisitors, } from "../../firestore/firestoreHelpers";




export default function VisitorInput({visitor, initial, visitorChangeHandle}) {
  const [options, setOptions] = useState([])

  useEffect(() => {getVisitors(setOptions);}, [])
  
  return (
    <div>
      <Select
        onChange={visitorChangeHandle}
        defaultValue={initial}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={visitor}
      />
    </div>
  );
}
