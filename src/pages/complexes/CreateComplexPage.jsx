import { useEffect } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { addDocument } from "../../firestore/firestoreHelpers";

export default function CreateComplexPage({setTitle}) {
  const history = useHistory();
  const name = useRef();

  useEffect(() => {
    setTitle({
      name: "Formulario para la creación de complejos",
      description: "Ingrese la información requerida para la creación del complejo.",
    });
  }, []);
  
  function submitHandler(event) {
    event.preventDefault();

    const complexData = {
      name: name.current.value,
    };

    addDocument("complexes", complexData)

    history.push("/complexes");

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

              <div className="mt-6 grid grid-cols-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número
                  </label>
                  <div className="mt-1">
                    <input
                      ref={name}
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:pl-4 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link to="/complexes">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
