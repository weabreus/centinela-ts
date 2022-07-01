import React, { useEffect } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select/dist/declarations/src/Select";

import SelectMultipleInput from "../../components/form/SelectMultipleInput";
import SelectSingleInput from "../../components/form/SelectSingleInput";

import { addUnit, getBuildingInput, getResidentPetsInput, getResidentsInput, getResidentVehiclesInput, getVisitorsInput } from "../../firestore/controllers/UnitsController";
import InputType from "../../models/InputType";
import PageTitle from "../../models/PageTitle";
import UnitDataType from "../../models/UnitDataType";

const CreateUnitsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {

  

  const history = useHistory();

  const number = useRef<HTMLInputElement | null>(null);
  const building = useRef<Select<InputType[]>>();
  const residents = useRef<Select<InputType[]>>();
  const vehicles = useRef<Select<InputType[]>>();
  const visitors = useRef<Select<InputType[]>>();
  const pets = useRef<Select<InputType[]>>();

  useEffect(() => {
    setTitle({
      name: "Formulario de creción de unidades",
      description:
        "Ingrese la información requerida para la creación de la unidad.",
    });
  }, [setTitle]);

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const unitData: UnitDataType = {
      number: number.current!.value,
      building: building.current!.getValue(),
      residents: residents.current!.getValue(),
      vehicles: vehicles.current!.getValue(),
      authorizedVisitors: visitors.current!.getValue(),
      pets: pets.current!.getValue(),
    };

    addUnit(unitData);

    history.push("/units");
  }

  return (
    <>
      <div className="overflow-y-scroll min-h-[calc(100vh_-_89px)] py-6 px-12">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={submitHandler}
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="building"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Edificio
                  </label>
                  <div className="mt-1">
                    <SelectSingleInput inputRef={building} getData={getBuildingInput} />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número
                  </label>
                  <div className="mt-1">
                    <input
                      ref={number}
                      required
                      type="text"
                      name="number"
                      id="number"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="residents"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Residentes
                  </label>
                  <div className="mt-1">
                    <SelectMultipleInput inputRef={residents} getData={getResidentsInput}/>
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="vehicles"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Vehiculos
                  </label>
                  <div className="mt-1">
                    <SelectMultipleInput inputRef={vehicles} getData={getResidentVehiclesInput} />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="vehicles"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Visitantes Autorizados
                  </label>
                  <div className="mt-1">
                    <SelectMultipleInput inputRef={visitors} getData={getVisitorsInput}/>
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="vehicles"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mascotas
                  </label>
                  <div className="mt-1">
                    <SelectMultipleInput inputRef={pets} getData={getResidentPetsInput} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link to="/units">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUnitsPage;
