import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { classNames } from "../../helpers";
import FieldErrors from "../../models/FieldErrors";

const DefaultInput: React.FC<{
  inputName: string;
  labelText: string;
  inputRef: React.RefObject<HTMLInputElement>;
  inputType: string;
  errors: FieldErrors;
}> = ({ inputName, labelText, inputRef, inputType, errors }) => {
  const [inputErrorState, setInputErrorState] = useState<FieldErrors>(errors);

  useEffect(() => {
    setInputErrorState(errors);
  }, [errors]);

  return (
    <div id={JSON.stringify(inputName)} className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
      <div>
        <label
          htmlFor={inputName}
          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
        >
          {" "}
          {labelText}{" "}
        </label>
      </div>
      <div className="col-span-2">
        <div className="mt-1 relative rounded-md shadow-sm sm:col-span-2">
          <input
            onChange={() => {
                setInputErrorState({})
                
            }}
            type={inputType}
            name={inputName}
            id={inputName}
            className={classNames(
              inputErrorState[inputName]
                ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                : "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            )}
            ref={inputRef}
            required
          />

          {inputErrorState[inputName] && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {inputErrorState[inputName] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {inputErrorState[inputName].errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default DefaultInput;
