import React, { useEffect } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select/dist/declarations/src/Select";
import SelectSingleInput from "../../components/form/SelectSingleInput";
import { addBuilding, getComplexesInput } from "../../firestore/controllers/BuildingsController";
import BuildingsShortType from "../../models/BuildingsShortType";
import InputType from "../../models/InputType";
import PageTitle from "../../models/PageTitle";

const CreateBuildingsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {

  const history = useHistory();

  const complex = useRef<Select<InputType[]>>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const address = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle({
      name: "Formulario de creación de edificios",
      description:
        "Ingrese la información requerida para la creación del edificio.",
    });
  }, [ setTitle ]);

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const buildingData: BuildingsShortType = {
      name: name.current!.value,
      address: address.current!.value,
      // @ts-ignore
      complex: complex.current!.getValue()[0]?.value
    };

    addBuilding(
      // @ts-ignore
      complex.current!.getValue()[0]?.value,
      buildingData
    );

    history.push("/buildings");
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
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="complex"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complejo
                  </label>
                  <div className="mt-1">
                    <SelectSingleInput inputRef={complex} getData={getComplexesInput}/>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      ref={name}
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección
                  </label>
                  <div className="mt-1">
                    <input
                      ref={address}
                      required
                      type="text"
                      name="address"
                      id="address"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link to="/buildings">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBuildingsPage;
