import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import UnitInput from "../../components/form/UnitInput";
import VisitorInput from "../../components/form/VisitorInput";

export default function CreateVehiclePage() {
  const [type, setType] = useState('visitor');
  const make = useRef();
  const model = useRef();
  const color = useRef();
  const plate = useRef();
  const year = useRef();
  const visitor = useRef();
  const unit = useRef();



  function submitHandler(event) {
    event.preventDefault();
    let vehicleData = {};
    if (type === "visitor") {
      vehicleData = {
        make: make.current.value,
        model: model.current.value,
        color: color.current.value,
        plate: plate.current.value,
        year: year.current.value,
        type: type,
        visitor: visitor.current.getValue(),
      };
    } else {
      vehicleData = {
        make: make.current.value,
        model: model.current.value,
        color: color.current.value,
        plate: plate.current.value,
        year: year.current.value,
        type: type,
        unit: unit.current.getValue(),
      };
    }

    //   Update vehicle data in firestore @Lucho2027

    console.log(vehicleData);
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
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Crear vehiculo
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Llene los campos requeridos para crear el vehiculo.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Marca
                  </label>
                  <div className="mt-1">
                    <input
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
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo
                  </label>
                  <div className="mt-1">
                    <select
                      onChange={(event) => setType(event.target.value)}
                      name="type"
                      id="type"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="visitor">Visitante</option>
                      <option value="resident">Residente</option>
                    </select>
                  </div>
                </div>

                {type === "visitor" && (
                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="visitor"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Visitante
                    </label>
                    <div className="mt-1">
                      <VisitorInput visitor={visitor} />
                    </div>
                  </div>
                )}

                {type === "resident" && (
                  <div className="col-span-3 sm:col-span-3">
                    <label
                      htmlFor="unit"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Unidad
                    </label>
                    <div className="mt-1">
                      <UnitInput unit={unit} />
                    </div>
                  </div>
                )}
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
}
