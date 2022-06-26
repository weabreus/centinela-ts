import React, { useRef } from "react";

import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import PageTitle from "../../models/PageTitle";
import InputType from "../../models/InputType";
import Select from "react-select/dist/declarations/src/Select";
import VisitorDataType from "../../models/VisitorDataType";
import { addVisitor } from "../../firestore/controllers/VisitorsController";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import { getComplexesInput } from "../../firestore/controllers/BuildingsController";

const CreateVisitorPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {

  const history = useHistory();

  const complex = useRef<Select<InputType[]>>(null)
  const nameRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef<HTMLInputElement | null>(null);

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();
    const visitorData: VisitorDataType = {
      name: nameRef.current!.value,
      identification: idRef.current!.value,
      complexInput: complex.current?.getValue()
    };

    addVisitor(visitorData);

    history.push("/visitors");
  };

  useEffect(() => {
    setTitle({
      name: "Formulario para la creación de visitantes",
      description:
        "Ingrese los datos requeridos para la creación del visitante.",
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
                Verifique e ingrese la informacion personal del visitante.
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
                  htmlFor="identification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documento de identificación
                </label>
                <div className="mt-1">
                  <input
                    ref={idRef}
                    id="identification"
                    name="identification"
                    type="text"
                    autoComplete="identification"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => history.push("/visitors")}
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

export default CreateVisitorPage;