import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select/dist/declarations/src/Select";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import { getComplexesInput } from "../../firestore/controllers/BuildingsController";
import {
  getUnits,
  getVehicle,
  updateVehicle,
} from "../../firestore/controllers/VehiclesController";
import InputType from "../../models/InputType";
import PageTitle from "../../models/PageTitle";
import VehiclesDataType from "../../models/VehiclesDataType";

const EditVehiclePage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<VehiclesDataType | null>(null);

  useEffect(() => {
    setTitle({
      name: "Formulario de edición de vehiculo",
      description:
        "Actualice todos los datos requeridos para la edición del vehiculo.",
    });

    const getData = async () => {
      getVehicle(id, setVehicle);
    };
    getData();
  }, [id, setTitle]);

  const complex = useRef<Select<InputType[]> | null>(null)
  const make = useRef<HTMLInputElement | null>(null);
  const model = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);
  const plate = useRef<HTMLInputElement | null>(null);
  const year = useRef<HTMLInputElement | null>(null);
  const unit = useRef<Select<InputType[]> | null>(null);

  const submitHandler: (event: React.SyntheticEvent) => void = async (event) => {
    event.preventDefault();

    let vehicleData: VehiclesDataType = {
      complexInput: complex.current?.getValue(),
      make: make.current!.value,
      model: model.current!.value,
      color: color.current!.value,
      plate: plate.current!.value,
      year: year.current!.value,
      unit: unit.current!.getValue(),
    };

    //   Update vehicle data in firestore @Lucho2027
    await updateVehicle(id, vehicleData);

    history.push("/vehicles");
  };
  return (
    <>
      <div className="py-6 px-12">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={submitHandler}
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Crear vehiculo
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Llene los campos requeridos para crear el vehiculo.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-6 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <label
                    htmlFor="complex"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complejo
                  </label>
                  <div className="mt-1">
                    <SelectSingleInput
                      inputRef={complex}
                      getData={getComplexesInput}
                      initial={vehicle?.complexInput}

                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Marca
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={vehicle?.make}
                      ref={make}
                      required
                      type="text"
                      name="make"
                      id="make"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Modelo
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={vehicle?.model}
                      ref={model}
                      required
                      type="text"
                      name="model"
                      id="model"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Color
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={vehicle?.color}
                      ref={color}
                      required
                      type="text"
                      name="color"
                      id="color"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="plate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tablilla
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={vehicle?.plate}
                      ref={plate}
                      required
                      type="text"
                      name="plate"
                      id="plate"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Año
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={vehicle?.year}
                      ref={year}
                      required
                      type="text"
                      name="year"
                      id="year"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unidad
                  </label>
                  <div className="mt-1">
                    <SelectSingleInput
                      inputRef={unit}
                      initial={vehicle?.unit}
                      getData={getUnits}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link to="/vehicles">
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

export default EditVehiclePage;
