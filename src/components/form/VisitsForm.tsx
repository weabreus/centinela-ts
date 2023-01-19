import React, { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { storeVisit } from "../../firestore/firestoreHelpers";
import Select from "react-select/dist/declarations/src/Select";
import {
  createAuthorizedVisitorDirectory,
  getUnits,
} from "../../firestore/controllers/VisitsController";
import AuthVisitorsList from "./AuthVisitorsList";
import SelectUnitInput from "./SelectUnitInput";
import { ActionMeta, Options, SingleValue } from "react-select";
import UnitInputType from "../../models/UnitInputType";
import Directory from "../../models/DirectoryType";
import VisitorDataType from "../../models/VisitorDataType";
import { schema } from "../../models/VisitDataType";
import FieldErrors from "../../models/FieldErrors";
import DefaultInput from "./DefaultInput";
import AuthContext from "../../store/auth-context";
import ResidentInputDataType from "../../models/ResidentInputDataType";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import db from "../../firestore/FirestoreConfig";
import UserDataType from "../../models/UserDataType";
import DefaultSelectInput from "./DefaultSelectInput";

const VisitsForm: React.FC<{ open: any; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  const authCtx = useContext(AuthContext);

  const [errors, setErrors] = useState<FieldErrors>({});

  const residentName = useRef<HTMLInputElement>(null);
  const visitorName = useRef<HTMLInputElement>(null);
  const visitorID = useRef<HTMLInputElement>(null);
  const vehicleMake = useRef<HTMLInputElement>(null);
  const vehicleModel = useRef<HTMLInputElement>(null);
  const vehicleColor = useRef<HTMLInputElement>(null);
  const vehiclePlate = useRef<HTMLInputElement>(null);
  const unit = useRef<Select<UnitInputType>>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);
  const type = useRef<HTMLSelectElement>(null);

  const [openAuthList, setOpenAuthList] = useState<boolean>(false);
  const [authorizedVisitors, setAuthorizedVisitors] = useState<
    Directory<VisitorDataType>
  >({});
  const [unitResidents, setUnitResidents] = useState<ResidentInputDataType[]>(
    []
  );

  const changeUnitHandler = (
    newValue: SingleValue<UnitInputType>,
    actionMeta: ActionMeta<UnitInputType>
  ) => {
    if (openAuthList) {
      if (newValue?.authorizedVisitors.length !== 0) {
        const directory: any = createAuthorizedVisitorDirectory(
          newValue?.authorizedVisitors,
          "visitor"
        );

        const residents = newValue?.residents;

        setAuthorizedVisitors(directory);
        setUnitResidents(residents!);
        setOpenAuthList(true);
      } else {
        const residents = newValue?.residents;

        setAuthorizedVisitors({});
        setUnitResidents(residents!);
        setOpenAuthList(false);
      }
    } else {
      if (newValue?.authorizedVisitors.length !== 0) {
        const directory: any = createAuthorizedVisitorDirectory(
          newValue?.authorizedVisitors,
          "visitor"
        );

        const residents = newValue?.residents;

        setAuthorizedVisitors(directory);
        setUnitResidents(residents!);
        setOpenAuthList(true);
      }
    }
  };

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const userRef: DocumentReference<DocumentData> = doc(
      db,
      "users",
      authCtx.id
    );

    const userData = await getDoc(userRef).then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } else {
        const user: UserDataType = {
          address: doc.data()?.address,
          areacode: doc.data()?.areacode,
          country: doc.data()?.country,
          email: doc.data()?.email,
          municipality: doc.data()?.municipality,
          name: doc.data()?.name,
          organization: doc.data()?.organization,
          phone: doc.data()?.phone,
          title: doc.data()?.title,
          role: doc.data()?.role,
          complex: doc.data()?.complex,
        };

        return user;
      }
    });

    const visitData: {
      entryTimestamp: Date;
      residentName: string;
      visitorName: string;
      visitorID: string;
      unit: Options<UnitInputType>;
      vehicleMake: string;
      vehicleModel: string;
      vehicleColor: string;
      vehiclePlate: string;
      notes: string;
      visitors: string;
      complex: string;
      type: string;
      creator: UserDataType;
    } = {
      entryTimestamp: new Date(),
      residentName: residentName.current!.value,
      visitorName: visitorName.current!.value,
      visitorID: visitorID.current!.value,
      unit: unit.current!.getValue(),
      vehicleMake: vehicleMake.current!.value,
      vehicleModel: vehicleModel.current!.value,
      vehicleColor: vehicleColor.current!.value,
      vehiclePlate: vehiclePlate.current!.value,
      notes: notes.current!.value,
      visitors: quantity.current!.value,
      complex: authCtx.complex,
      type: type.current!.value,
      creator: userData!,
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
        unitResidents={unitResidents}
        unit={unit}
        residentName={residentName}
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
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

                        {/* Type selection */}
                        {/* <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="type"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {" "}
                              Tipo{" "}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select
                              required
                              name="type"
                              id="type"
                              ref={type}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value=""></option>
                              <option value="visita">Visita</option>
                              <option value="servicio">Servicio</option>
                              <option value="delivery">Delivery</option>
                              <option value="otro">Otro</option>
                            </select>
                            
                          </div>
                        </div> */}
                        <DefaultSelectInput 
                          inputName="type"
                          labelText="Tipo"
                          inputRef={type}
                          options={
                            [
                              {value: "visita", label: "Visita"},
                              {value: "servicio", label: "Servicio"},
                              {value: "delivery", label: "Delivery"},
                              {value: "otro", label: "Otro"},

                            ]
                          }
                          errors={errors}
                        />

                        {/* Resident who authorized entry */}
                        <DefaultInput
                          inputName="residentName"
                          labelText="Autorizado por"
                          inputRef={residentName}
                          inputType="text"
                          errors={errors}
                        />

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

                        {/* Vehicle make input */}
                        <DefaultInput
                          inputName="vehicleMake"
                          labelText="Marca del Vehiculo"
                          inputRef={vehicleMake}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Vehicle model input */}
                        <DefaultInput
                          inputName="vehicleModel"
                          labelText="Modelo del Vehiculo"
                          inputRef={vehicleModel}
                          inputType="text"
                          errors={errors}
                        />

                        {/* Vehicle color input */}
                        <DefaultInput
                          inputName="vehicleColor"
                          labelText="Color del Vehiculo"
                          inputRef={vehicleColor}
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
                              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={() => {
                            setOpenAuthList(false);
                            setOpen(false);
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
