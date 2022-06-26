import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  PlusIcon,
  MinusSmIcon as MinusSmIconSolid,
} from "@heroicons/react/solid";
import PageTitle from "../../models/PageTitle";
import ResidentDataType from "../../models/ResidentDataType";
import { addResident } from "../../firestore/controllers/ResidentsController";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import { getComplexesInput } from "../../firestore/controllers/BuildingsController";
import Select from "react-select/dist/declarations/src/Select";
import InputType from "../../models/InputType";

const CreateResidentPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const history = useHistory();
  const [emergencyInputFields, setEmergencyInputFields] = useState<
    { name: string; phone: string }[]
  >([{ name: "", phone: "" }]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const workRef = useRef<HTMLInputElement | null>(null);
  const mobileRef = useRef<HTMLInputElement | null>(null);
  const homeRef = useRef<HTMLInputElement | null>(null);
  const complex = useRef<Select<InputType[]>>(null);

  const handleFormChange: (index: number, event: React.ChangeEvent) => void = (
    index,
    event
  ) => {
    let data: { name: string; phone: string }[] = [...emergencyInputFields];
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    data[index][event.target.name] = target.value;
    setEmergencyInputFields(data);
  };

  const addFields: () => void = () => {
    let newField: { name: string; phone: string } = { name: "", phone: "" };
    setEmergencyInputFields([...emergencyInputFields, newField]);
  };

  const removeFields: (index: number) => void = (index) => {
    let data = [...emergencyInputFields];
    data.splice(index, 1);
    setEmergencyInputFields(data);
  };

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const residentData: ResidentDataType = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      // @ts-ignore
      complex: complex.current!.getValue()[0]?.value,
      contact: {
        work: workRef.current!.value,
        mobile: mobileRef.current!.value,
        home: homeRef.current!.value,
        emergency: emergencyInputFields,
      },
    };

    addResident(residentData);

    history.push("/directory");
  };

  useEffect(() => {
    setTitle({
      name: "Formulario para la creación de residentes",
      description:
        "Ingrese los datos requeridos para la creación del residente.",
    });
  }, [setTitle]);

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="space-y-8 divide-y divide-gray-200 py-6 px-12"
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Imagen
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cambiar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Información Personal
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Verifique e ingrese la informacion personal del residente.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="complex"
                  className="block text-sm font-medium text-gray-700"
                >
                  Complejo
                </label>
                <div className="mt-1">
                  <SelectSingleInput
                    inputRef={complex}
                    getData={getComplexesInput}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electronico
                </label>
                <div className="mt-1">
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="col-span-6 grid gap-y-6 gap-x-4 grid-cols-6">
                <div className="col-span-2">
                  <label
                    htmlFor="home"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telefono
                  </label>
                  <div className="mt-1">
                    <input
                      ref={homeRef}
                      type="tel"
                      name="home"
                      id="home"
                      pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                      placeholder="Ejemplo: (787) 555-5555"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="mobil"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobil
                  </label>
                  <div className="mt-1">
                    <input
                      ref={mobileRef}
                      type="tel"
                      name="mobil"
                      id="mobil"
                      pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                      placeholder="Ejemplo: (787) 555-5555"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="work"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trabajo
                  </label>
                  <div className="mt-1">
                    <input
                      ref={workRef}
                      type="tel"
                      name="work"
                      id="work"
                      pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                      placeholder="Ejemplo: (787) 555-5555"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Contactos de emergencia
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Agregue contactos de emergencia para este residente.
              </p>
            </div>
            <div className="mt-6">
              {emergencyInputFields.map((input, index) => {
                return (
                  <div
                    key={index}
                    className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7"
                  >
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="emergencyname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(event) => handleFormChange(index, event)}
                          defaultValue={input?.name}
                          type="text"
                          name="name"
                          id="emergencyname"
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="emergencyphone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Telefono
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(event) => handleFormChange(index, event)}
                          defaultValue={input?.phone}
                          id="emergencypgone"
                          name="phone"
                          type="tel"
                          pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                          placeholder="Ejemplo: (787) 555-5555"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1 flex justify-center items-end w-full pb-2">
                      <button
                        onClick={() => removeFields(index)}
                        type="button"
                        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <MinusSmIconSolid
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="text-center">
                <div className="mt-6">
                  <button
                    onClick={addFields}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Agregar un contacto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => history.push("/directory")}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateResidentPage;
