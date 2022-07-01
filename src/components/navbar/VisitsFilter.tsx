import { Disclosure, Transition } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/solid";
import React, { Fragment, useRef } from "react";
import NavbarDateRange from "../form/NavbarDateRange";

const VisitsFilter: React.FC<{
  startRef: React.RefObject<HTMLInputElement>;
  endRef: React.RefObject<HTMLInputElement>;
  unitRef: React.RefObject<HTMLInputElement>;
  visitorRef: React.RefObject<HTMLInputElement>;
  vehicleRef: React.RefObject<HTMLInputElement>;
  filterVisitsHandler: () => void;
}> = ({
  startRef,
  endRef,
  unitRef,
  visitorRef,
  vehicleRef,
  filterVisitsHandler,
}) => {
  const closeButton = useRef<any>();

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10 grid items-center"
    >
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div
        onBlur={(e: any) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Not triggered when swapping focus between children
            console.log("focus left self");
            closeButton.current.click();
          }
        }}
        className="col-start-1 row-start-1 py-4"
      >
        <div className="flex justify-items-end max-w-7xl">
          <div className="relative inline-block">
            <div className="flex">
              <Disclosure.Button
                ref={closeButton}
                className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
              >
                <FilterIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel as="div" className="origin-top-right absolute right-0 mt-2 w-[600px] rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="mx-auto grid grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8 pt-4 pb-8">
                  {/* Date range filter */}
                  <div className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                    <span className="text-sm font-medium text-gray-900">
                      Rango de fecha
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6 pt-2">
                    <NavbarDateRange
                      filterVisitsHandler={filterVisitsHandler}
                      inputRef={startRef}
                      label={"Fecha de inicio"}
                    />
                    <NavbarDateRange
                      filterVisitsHandler={filterVisitsHandler}
                      inputRef={endRef}
                      label={"Fecha de fin"}
                    />
                  </div>
                  {/* End Date range filter*/}

                  {/* Unit range filter */}
                  <div className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500 pt-6">
                    <span className="text-sm font-medium text-gray-900">
                      Unidad
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-10 auto-rows-min md:grid-cols-1 md:gap-x-6 pt-2">
                    <input
                      onChange={filterVisitsHandler}
                      ref={unitRef}
                      required
                      type="text"
                      name="unit-filter"
                      id="unit-filter"
                      className="ml-6 focus:ring-indigo-500 focus:border-indigo-500 block pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {/* End Unit range filter */}

                  {/* Visitor range filter */}
                  <div className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500 pt-6">
                    <span className="text-sm font-medium text-gray-900">
                      Visitante
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-10 auto-rows-min md:grid-cols-1 md:gap-x-6 pt-2">
                    <input
                      onChange={filterVisitsHandler}
                      ref={visitorRef}
                      required
                      type="text"
                      name="visitor-filter"
                      id="visitor-filter"
                      className="ml-6 focus:ring-indigo-500 focus:border-indigo-500 block pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {/* End Visitor range filter */}

                  {/* Vehicle range filter */}
                  <div className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500 pt-6">
                    <span className="text-sm font-medium text-gray-900">
                      Vehiculo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-10 auto-rows-min md:grid-cols-1 md:gap-x-6 pt-2">
                    <input
                      onChange={filterVisitsHandler}
                      ref={vehicleRef}
                      required
                      type="text"
                      name="vehicle-filter"
                      id="vehicle-filter"
                      className="ml-6 focus:ring-indigo-500 focus:border-indigo-500 block pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {/* End Vehicle range filter */}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default VisitsFilter;
