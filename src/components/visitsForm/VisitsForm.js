import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import VisitorInput from "../form/VisitorInput";
import VehicleInput from "../form/VehicleInput";
import ResidentInput from "../form/ResidentInput";

export default function VisitsForm({ open, setOpen }) {
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

    //   Store visit data in firestore (Luis)

    console.log(visitData);
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {" "}
                              Crear nueva visita{" "}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Llene los campos requeridos para crear una nueva
                              visita.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Cerrar panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
                        {/* Visitor selection */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="visitor"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Visitante{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <VisitorInput visitor={visitor} />
                          </div>
                        </div>

                        {/* Vehicle selection */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="vehicle"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Vehiculo{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <VehicleInput vehicle={vehicle} visitor={visitor} />
                          </div>
                        </div>

                        {/* Resident selection */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="resident"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Residente{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <ResidentInput resident={resident}/>
                          </div>
                        </div>

                        {/* Entry timestamp */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="entry"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Entrada{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="datetime-local"
                              name="entry"
                              id="entry"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              ref={entry}
                            />
                          </div>
                        </div>

                        {/* Exit timestamp */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="exit"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Salida{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="datetime-local"
                              name="exit"
                              id="exit"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              ref={exit}
                            />
                          </div>
                        </div>

                        {/* Visit notes */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="notes"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Notas{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="notes"
                              name="notes"
                              rows={3}
                              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              ref={notes}
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={submitHandler}
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}