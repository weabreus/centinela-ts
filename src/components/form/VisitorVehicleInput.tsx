import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../models/Input";

const VehicleInput: React.FC<{
  vehicle: any,
  options: Input[],
  initial?: Input[]
}> = ({vehicle, options, initial}) => {
  
  const [initialVehicle, setVehicle] = useState(initial);

  useEffect(() => {
    setVehicle(initial);
  }, [initial]);

  return (
    <div>
      <Select
        key={JSON.stringify(initialVehicle)}
        defaultValue={initialVehicle}
        options={options}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        ref={vehicle}
      />
    </div>
  );
}

export default VehicleInput;