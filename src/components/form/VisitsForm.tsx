import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { storeVisit } from "../../firestore/firestoreHelpers";
import Select from "react-select/dist/declarations/src/Select";
import {
  createAuthorizedVisitorDirectory,
  getUnits,
} from "../../firestore/controllers/VisitsController";
import AuthVisitorsList from "./AuthVisitorsList";
import UnitDataType from "../../models/UnitDataType";
import SelectUnitInput from "./SelectUnitInput";
import { ActionMeta, Options, SingleValue } from "react-select";
import UnitInputType from "../../models/UnitInputType";
import Directory from "../../models/DirectoryType";
import VisitorDataType from "../../models/VisitorDataType";
import { schema } from "../../models/VisitDataType";
import FieldErrors from "../../models/FieldErrors";
import { classNames } from "../../helpers";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import DefaultInput from "./DefaultInput";

const VisitsForm: React.FC<{ open: any; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  const [errors, setErrors] = useState<FieldErrors>({});

  const visitorName = useRef<HTMLInputElement>(null);
  const visitorID = useRef<HTMLInputElement>(null);
  const vehicleModel = useRef<HTMLInputElement>(null);
  const vehiclePlate = useRef<HTMLInputElement>(null);
  const unit = useRef<Select<UnitDataType[]>>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);

  const [openAuthList, setOpenAuthList] = useState<boolean>(false);
  const [authorizedVisitors, setAuthorizedVisitors] = useState<
    Directory<VisitorDataType>
  >({});

  const changeUnitHandler = (
    newValue: SingleValue<UnitInputType>,
    actionMeta: ActionMeta<UnitInputType>
  ) => {
    if (openAuthList) {
      if (newValue?.authorizedVisitors.length !== 0) {
        const directory: any = createAuthorizedVisitorDirectory(
          newValue?.authorizedVisitors
        );

        setAuthorizedVisitors(directory);
        setOpenAuthList(true);
      } else {
        setAuthorizedVisitors({});
        setOpenAuthList(false);
      }
    } else {
      if (newValue?.authorizedVisitors.length !== 0) {
        const directory: any = createAuthorizedVisitorDirectory(
          newValue?.authorizedVisitors
        );

        setAuthorizedVisitors(directory);
        setOpenAuthList(true);
      }
    }
  };

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const visitData: {
      entryTimestamp: Date;
      visitorName: string;
      visitorID: string;
      unit: Options<UnitDataType[]>;
      vehicleModel: string;
      vehiclePlate: string;
      notes: string;
      visitors: string;
    } = {
      entryTimestamp: new Date(),
      visitorName: visitorName.current!.value,
      visitorID: visitorID.current!.value,
      unit: unit.current!.getValue(),
      vehicleModel: vehicleModel.current!.value,
      vehiclePlate: vehiclePlate.current!.value,
      notes: notes.current!.value,
      visitors: quantity.current!.value,
    };

    schema
      .validate(visitData, { abortEarly: false })
      .catch((err) => {
        let fieldErrors: FieldErrors = {};

        err.errors.forEach((error: string) => {
          const fieldName = error.split(" ")[0];
          fieldErrors[fieldName] = { hasError: true, errorMessage: error };
        });
        setErrors(fieldErrors);
      })
      .then((data) => {
        if (data) {
          storeVisit(visitData);
          setOpenAuthList(false);
          setOpen(false);
        }
      });
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-8" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <AuthVisitorsList
        open={openAuthList}
        setOpen={setOpenAuthList}
        authorizedVisitors={authorizedVisitors}
        visitorName={visitorName}
        visitorID={visitorID}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          {/* <div className="fixed inset-0 overflow-hidden"> */}
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
                              onClick={() => {
                                setOpenAuthList(false);
                                setOpen(false);
                              }}
                            >
                              <span className="sr-only">Cerrar panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
                        {/* Unit selection */}
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="resident"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Unidad{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <SelectUnitInput
                              inputRef={unit}
                              getData={getUnits}
                              changeUnitHandler={changeUnitHandler}
                            />
                          </div>
                        </div>

                        {/* Visitor name input */}
                        <DefaultInput
                          inputName="visitorName"
                          labelText="Nombre del visitante"
                          inputRef={visitorName}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Visitor ID input */}
                        <DefaultInput
                          inputName="visitorID"
                          labelText="Identificación del visitante"
                          inputRef={visitorID}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Vehicle model input */}
                        <DefaultInput
                          inputName="vehicleModel"
                          labelText="Vehiculo"
                          inputRef={vehicleModel}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Vehicle plate input */}
                        <DefaultInput
                          inputName="vehiclePlate"
                          labelText="Tablilla"
                          inputRef={vehiclePlate}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Visitors quantity input */}
                        <DefaultInput
                          inputName="quantity"
                          labelText="Acompañantes"
                          inputRef={quantity}
                          inputType="text"
                          errors={errors}
                        />

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
                          onClick={() => {
                            setOpenAuthList(false);
                            setOpen(false);
                          }}
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
          {/* </div> */}
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default VisitsForm;
