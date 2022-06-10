import { useEffect, useState } from "react";
import Select, { Options } from "react-select";
import InputType from "../../models/InputType";

const SelectMultipleInput: React.FC<{
  inputRef: any;
  initial?: Options<InputType[]>;
  getData: (
    setOptions: React.Dispatch<React.SetStateAction<Options<InputType[]>>>
  ) => void;
}> = ({ inputRef, initial, getData }) => {
  const [options, setOptions] = useState<Options<InputType[]>>([]);
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
        isMulti
        defaultValue={initialValue}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={inputRef}
      />
    </div>
  );
};

export default SelectMultipleInput;
