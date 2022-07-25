import React, { useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import VisitorVehicleInput from "../../components/form/VisitorVehicleInput";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import {
  getUnits,
  getVisit,
  getVisitorVehicles,
  setDocument,
} from "../../firestore/controllers/VisitsController";
import Visit from "../../models/Visit";
import VisitorSingleInput from "../../components/form/VisitorSingleInput";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import Select from "react-select/dist/declarations/src/Select";
import PageTitle from "../../models/PageTitle";

const EditVisitsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {

  let history = useHistory();

  let { id } = useParams<{ id: string }>();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [vehicles, setVehicles] = useState([]);

  const visitor = useRef<Select>(null);
  const vehicle = useRef<Select>(null);
  const unit = useRef<Select>(null);
  const entry = useRef<HTMLInputElement>(null);
  const exit = useRef<HTMLInputElement>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);

  const visitorChangeHandle: (event: {
    value: string;
    label: string;
  }) => void = (event) => {
    getVisitorVehicles(event.value, setVehicles);
  };

  useEffect(() => {
    setTitle({
      name: "Formulario para edición de visitas",
      description:
        "Ingrese la información requerida para la edición de la visita.",
    });
    const getInputs: () => void = async () => {
      // get visit
      await getVisit(
        "visits",
        id,
        setVisit
      ).then((doc) => {
        getVisitorVehicles( doc?.visitor, setVehicles)
        return doc;
      });

    };
    getInputs();
  }, [id, setTitle]);

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const visitData: {
      entryTimestamp: Date;
      exitTimestamp: Date;
      visitor: any;
      unit: any;
      vehicle: any;
      notes: string;
      visitors: string;
    } = {
      entryTimestamp: new Date(entry.current!.value),
      exitTimestamp: new Date(exit.current!.value),
      visitor: visitor.current!.getValue(),
      unit: unit.current!.getValue(),
      vehicle: vehicle.current!.getValue(),
      notes: notes.current!.value,
      visitors: quantity.current!.value,
    };

    console.log(visitData);

    setDocument("visits", visit?.id, visitData);
    history.push("/")
  };

  return (
    <div className="py-6 px-12">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="visitor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visitante
                </label>
                <div className="mt-1">
                  <VisitorSingleInput
                    visitor={visitor}
                    initial={visit?.visitor}
                    visitorChangeHandle={visitorChangeHandle}
                  />
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
                    initial={visit?.vehicle}
                    options={vehicles}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="unit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidad
                </label>
                <div className="mt-1">
                  <SelectSingleInput
                    inputRef={unit}
                    initial={visit?.unit}
                    getData={getUnits}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Acompañantes
                </label>
                <div className="mt-1">
                  <input
                    defaultValue={visit?.visitors}
                    min="0"
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    ref={quantity}
                  />
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue={
                      visit
                        ? moment
                            .unix(visit?.entryTimestamp.seconds)
                            .format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue={
                      (visit && visit.exitTimestamp) ? moment
                            .unix(visit?.exitTimestamp.seconds)
                            .format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
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
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={visit?.notes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link to="/">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
            </Link>

            <button
              onClick={submitHandler}
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVisitsPage;
