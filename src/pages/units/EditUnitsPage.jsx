import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import BuildingInput from "../../components/form/BuildingInput";
import ResidentMultipleInput from "../../components/form/ResidentMultipleInput";
import ResidentVehicleMultipleInput from "../../components/form/ResidentVehicleMultipleInput";
import UnitPetsMultipleInput from "../../components/form/UnitPetsMultipleInput";
import UnitVisitorsMultipleInput from "../../components/form/UnitVisitorsMultipleInput";
import { getUnit, updateUnit } from "../../firestore/firestoreHelpers";

export default function CreateUnitsPage({setTitle}) {
  const history = useHistory();

  const { pathComplex, pathBuilding, id } = useParams();
  const [unit, setUnit] = useState({});
  const path = `complexes/${pathComplex}/buildings/${pathBuilding}/units/${id}`;
  // Traer unidad de firestore @Lucho2027

  useEffect(() => {
    setTitle({
      name: "Formulario de edición de unidades",
      description:
        "Ingrese la información requerida para la edición de la unidad.",
    });

    const getData = async () => {
      getUnit(path, setUnit)
    }
    getData()
  }, []);

  useEffect(() => {
    console.log(unit);
  }, [unit])

  const number = useRef();
  const building = useRef();
  const residents = useRef();
  const vehicles = useRef();
  const visitors = useRef();
  const pets = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const unitData = {
      number: number.current.value,
      building: building.current.getValue(),
      residents: residents.current.getValue(),
      vehicles: vehicles.current.getValue(),
      authorizedVisitors: visitors.current.getValue(),
      pets: pets.current.getValue(),
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
                    <BuildingInput
                      building={building}
                      initial={unit.building}
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
                      value={unit.number}
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
                    <ResidentMultipleInput residents={residents} initial={unit.residents}/>
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
                    <ResidentVehicleMultipleInput vehicles={vehicles} initial={unit.vehicles}/>
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
                    <UnitVisitorsMultipleInput visitors={visitors} initial={unit.authorizedVisitors} />
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
                    <UnitPetsMultipleInput pets={pets} initial={unit.pets} />
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
}
