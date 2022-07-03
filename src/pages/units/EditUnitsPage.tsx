import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select/dist/declarations/src/Select";
import SelectMultipleInput from "../../components/form/SelectMultipleInput";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import { getBuildingInput, getResidentPetsInput, getResidentsInput, getResidentVehiclesInput, getUnit, getVisitorsInput, updateUnit } from "../../firestore/controllers/UnitsController";
import InputType from "../../models/InputType";
import PageTitle from "../../models/PageTitle";
import UnitDataType from "../../models/UnitDataType";

const EditUnitsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const history = useHistory();

  const { pathComplex, pathBuilding, id } = useParams<{
    pathComplex: string;
    pathBuilding: string;
    id: string;
  }>();

  const [unit, setUnit] = useState<UnitDataType | null>(null);
  const path = `complexes/${pathComplex}/buildings/${pathBuilding}/units/${id}`;

  useEffect(() => {
    setTitle({
      name: "Formulario de edición de unidades",
      description:
        "Ingrese la información requerida para la edición de la unidad.",
    });

    const getData = async () => {
      getUnit(path, setUnit);
    };
    getData();
  }, [path, setTitle]);

  const number = useRef<HTMLInputElement | null>(null);
  const building = useRef<Select<InputType[]>>();
  const residents = useRef<Select<InputType[]>>();
  const vehicles = useRef<Select<InputType[]>>();
  const visitors = useRef<Select<InputType[]>>();
  const pets = useRef<Select<InputType[]>>();

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

    updateUnit(path, unitData);

    history.push("/units");
  }
  return (
    <>
      <div className="py-6 px-12">
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
                    <SelectSingleInput
                      inputRef={building}
                      initial={unit?.building}
                      getData={getBuildingInput}
                      isDisabled={true}
                    />
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
                      value={unit?.number}
                      ref={number}
                      required
                      type="text"
                      name="number"
                      id="number"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
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
                    <SelectMultipleInput
                      inputRef={residents}
                      initial={unit?.residents}
                      getData={getResidentsInput}
                    />
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
                    <SelectMultipleInput
                      inputRef={vehicles}
                      initial={unit?.vehicles}
                      getData={getResidentVehiclesInput}
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="visitors"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Visitantes Autorizados
                  </label>
                  <div className="mt-1">
                    <SelectMultipleInput
                      inputRef={visitors}
                      initial={unit?.authorizedVisitors}
                      getData={getVisitorsInput}
                    />
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
                    <SelectMultipleInput inputRef={pets} initial={unit?.pets} getData={getResidentPetsInput} />
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
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default EditUnitsPage;
