import { HomeIcon, PhoneIcon } from "@heroicons/react/outline";
import React from "react";
import Select from "react-select/dist/declarations/src/Select";
import ResidentInputDataType from "../../models/ResidentInputDataType";
import UnitInputType from "../../models/UnitInputType";

const UnitInformation: React.FC<{
  unitResidents: ResidentInputDataType[];
  unit: React.RefObject<Select<UnitInputType>>;
}> = ({ unitResidents, unit }) => {
  return (
    <div className="space-y-6 pb-6">
      <div>
        <div className="mt-4 flex items-start justify-between w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <div>
            <h2 className="text-lg font-medium text-white">
              <span className="sr-only">Detalles para </span>
              <span className="font-bold">
                {unit.current?.getValue().at(0)?.label}
              </span>
            </h2>
          </div>
          <span className="ml-4 flex h-8 w-8 items-center justify-center text-white focus:outline-none">
            <HomeIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Unidad</span>
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">Residentes</h3>
        <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
          {unit.current
            ?.getValue()
            .at(0)
            ?.residents.map((resident) => {
              return (
                <div 
                key={JSON.stringify(resident.value)}
                className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">{resident.label}</dt>
                  <dd className="text-gray-900 flex inline-flex"><PhoneIcon className="h-6 w-6 pr-2"/> {resident.mobile}</dd>
                </div>
              );
            })}
        </dl>
      </div>
    </div>
  );
};

export default UnitInformation;
