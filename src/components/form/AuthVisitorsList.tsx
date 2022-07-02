/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import AuthVisitorsListResults from "./AuthVisitorsListResults";
import Directory from "../../models/DirectoryType";
import VisitorDataType from "../../models/VisitorDataType";
import UnitInformation from "./UnitInformation";
import ResidentInputDataType from "../../models/ResidentInputDataType";
import Select from "react-select/dist/declarations/src/Select";
import UnitDataType from "../../models/UnitDataType";
import UnitInputType from "../../models/UnitInputType";

const AuthVisitorsList: React.FC<{
  open: boolean;
  authorizedVisitors: Directory<VisitorDataType>;
  unitResidents: ResidentInputDataType[];
  visitorName: React.RefObject<HTMLInputElement>;
  unit: React.RefObject<Select<UnitInputType>>;
  visitorID: React.RefObject<HTMLInputElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, authorizedVisitors, unitResidents, unit, visitorName, visitorID, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-9" onClose={() => null}>
        {/* <div className="fixed inset-0" /> */}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="-translate-x-[448px]"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {" "}
                            Información de la Unidad{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <UnitInformation 
                        unitResidents={unitResidents}
                        unit={unit}
                        />
                        <AuthVisitorsListResults
                          authorizedVisitors={authorizedVisitors}
                          unit={unit}
                          visitorName={visitorName}
                          visitorID={visitorID}
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AuthVisitorsList;
