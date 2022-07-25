import React, { useState, useEffect, useContext } from "react";
import Select, { Options } from "react-select";
import InputType from "../../models/InputType";
import AuthContext from "../../store/auth-context";

const SelectSingleInput: React.FC<{
  inputRef: any;
  initial?: Options<InputType>;
  options?: Options<InputType>;
  getData: (
    setOptions: React.Dispatch<React.SetStateAction<Options<InputType>>>,
    complex: string
  ) => void;
  isDisabled?: boolean;
}> = ({ inputRef, initial, getData, isDisabled }) => {

  const authCtx = useContext(AuthContext);

  const [options, setOptions] = useState<Options<InputType>>([]);
  const [initialValue, setInitialValue] = useState(initial);

  useEffect(() => {

        getData(setOptions, authCtx.complex);
    
  }, [getData, authCtx.complex]);

  useEffect(() => {
    setInitialValue(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialValue)}
        defaultValue={initialValue}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        ref={inputRef}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SelectSingleInput;
