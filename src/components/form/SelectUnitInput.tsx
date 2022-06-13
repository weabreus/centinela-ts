import React, { useState, useEffect } from "react";
import Select, { ActionMeta, Options, SingleValue } from "react-select";
import UnitInputType from "../../models/UnitInputType";

const SelectUnitInput: React.FC<{
  inputRef: any;
  initial?: any;
  options?: any;
  changeUnitHandler: (newValue: SingleValue<UnitInputType>, actionMeta: ActionMeta<UnitInputType>) => void;
  getData: (
    setOptions: React.Dispatch<React.SetStateAction<Options<UnitInputType[]>>>
  ) => void;
}> = ({ inputRef, initial, changeUnitHandler, getData }) => {
  const [options, setOptions] = useState<any>([]);
  const [initialValue, setInitialValue] = useState(initial);

  useEffect(() => {
        getData(setOptions);
  }, [getData]);

  useEffect(() => {
    setInitialValue(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialValue)}
        defaultValue={initialValue}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={inputRef}
        onChange={changeUnitHandler}
      />
    </div>
  );
};

export default SelectUnitInput;
