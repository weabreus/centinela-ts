import { HomeIcon } from "@heroicons/react/outline";
import { PencilIcon, PlusSmIcon } from "@heroicons/react/solid";
import React, { cloneElement } from "react";
import Select from "react-select/dist/declarations/src/Select";
import ResidentInputDataType from "../../models/ResidentInputDataType";
import UnitDataType from "../../models/UnitDataType";
import UnitInputType from "../../models/UnitInputType";

const UnitInformation: React.FC<{
  unitResidents: ResidentInputDataType[];
  unit: React.RefObject<Select<UnitInputType>>;
}> = ({ unitResidents, unit }) => {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              <span className="sr-only">Detalles para </span>
              <span className="font-bold">
                {unit.current?.getValue().at(0)?.label}
              </span>
            </h2>
          </div>
          <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <HomeIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Unidad</span>
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">Información de Residentes</h3>
        <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
          {unit.current
            ?.getValue()
            .at(0)
            ?.residents.map((resident) => {
              return (
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">{resident.label}</dt>
                  <dd className="text-gray-900">{resident.mobile}</dd>
                </div>
              );
            })}
        </dl>
      </div>
    </div>
  );
};

export default UnitInformation;
