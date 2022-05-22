import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import BuildingInput from "../../components/form/BuildingInput";
import ResidentMultipleInput from "../../components/form/ResidentMultipleInput";
import ResidentVehicleMultipleInput from "../../components/form/ResidentVehicleMultipleInput";
import UnitPetsMultipleInput from "../../components/form/UnitPetsMultipleInput";
import UnitVisitorsMultipleInput from "../../components/form/UnitVisitorsMultipleInput";

export default function CreateUnitsPage() {
  const { id } = useParams();

  // Traer unidad de firestore @Lucho2027

  const unit = {
    id: id,
    building: [{value: "buildingid1", label: "Building Name 1"}],
    number: "B01",
    pets: [
      { value: "petid1", label: "Pet Name 1" },
      { value: "petid2", label: "Pet Name 2" },
    ],
    residents: [
      { value: "residentid1", label: "Resident Name 1" },
      { value: "residentid2", label: "Resident Name 2" },
    ],
    vehicles: [
      { value: "vehicleid1", label: "Vehicle Name 1" },
      { value: "vehicleid2", label: "Vehicle Name 2" },
    ],
    visitors: [
      { value: "visitorid1", label: "Visitor Name 1" },
      { value: "visitorid2", label: "Visitor Name 2" },
    ],
  };

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
      building: building.current.getValue()[0].value,
      residents: residents.current.getValue(),
      vehicles: vehicles.current.getValue(),
      visitors: visitors.current.getValue(),
      pets: pets.current.getValue(),
    };

    //   Update building data in firestore @Lucho2027

    console.log(unitData);
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
                  Editar Unidad
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Llene los campos requeridos para editar la unidad.
                </p>
              </div>

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
                    <UnitVisitorsMultipleInput visitors={visitors} initial={unit.visitors} />
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
