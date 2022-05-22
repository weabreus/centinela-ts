import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import VisitorInput from "../../components/form/VisitorInput";
import VisitorVehicleInput from "../../components/form/VisitorVehicleInput";
import ResidentInput from "../../components/form/ResidentInput";
import moment from "moment";

export default function EditVisitsPage() {
  let { id } = useParams();

  // Traer de firestore @Lucho2027
  let visit = {
    docId: id,
    entryTimestamp: 1652068800,
    exitTimestamp: 1652068800,
    id: "licencia",
    resident: "bslESBlpwkOGTowUEJWHBbB9Fiw1",
    vehicle: "idVehiculo",
    visitor: "Ow6q4J9KH9Z5VLQMRmp9GWbZecn1",
    visitors: 1,
    notes: "notes",
  };
  const visitor = useRef();
  const vehicle = useRef();
  const resident = useRef();
  const entry = useRef();
  const exit = useRef();
  const notes = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const visitData = {
      visitor: visitor.current.getValue()[0].value,
      vehicle: vehicle.current.getValue()[0].value,
      resident: resident.current.getValue()[0].value,
      entry: entry.current.value,
      exit: exit.current.value,
      notes: notes.current.value,
    };

    //   Update visit data in firestore @Lucho2027

    console.log(visitData);
  }

  return (
    <div className="py-6 px-12">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Editar visita
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Llene los campos requeridos para editar la visita.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="visitor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visitante
                </label>
                <div className="mt-1">
                  <VisitorInput visitor={visitor} initial={visit.visitor} />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="vehicle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehiculo
                </label>
                <div className="mt-1">
                  <VisitorVehicleInput
                    vehicle={vehicle}
                    visitor={visitor}
                    initial={visit.vehicle}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="resident"
                  className="block text-sm font-medium text-gray-700"
                >
                  Residente
                </label>
                <div className="mt-1">
                  <ResidentInput resident={resident} initial={visit.resident} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Tiempos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Modifique los tiempos de entra y salida.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="entry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entrada
                </label>
                <div className="mt-1">
                  <input
                    ref={entry}
                    type="datetime-local"
                    name="entry"
                    id="entry"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={moment
                      .unix(visit.entryTimestamp)
                      .format("YYYY-MM-DDTHH:mm")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="exit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salida
                </label>
                <div className="mt-1">
                  <input
                    ref={exit}
                    type="datetime-local"
                    name="exit"
                    id="exit"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={moment
                      .unix(visit.exitTimestamp)
                      .format("YYYY-MM-DDTHH:mm")}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    ref={notes}
                    id="notes"
                    name="notes"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={visit.notes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link to="/visits">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            </Link>

            <button
              onClick={submitHandler}
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
