import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TablePagination from "../../components/pagination/TablePagination";
import { getVehicles } from "../../firestore/controllers/VehiclesController";
import PageTitle from "../../models/PageTitle";
import VehiclesDataType from "../../models/VehiclesDataType";

let PageSize = 10;

const VehiclesPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<VehiclesDataType[]>([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  useEffect(() => {
    setTitle({
      name: "Vehiculos",
      description: "Lista de todas los vehiculos registrados en el complejo.",
    });

    const getData = async () => {
      getVehicles(setData);
    };
    getData();
  }, [setTitle]);

  return (
    <div className="p-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/createvehicle"}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Agregar Vehiculo
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className=" w-1/6 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Marca
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Modelo
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Tablilla
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Año
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className=" w-1/6 relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentTableData.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="text-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {vehicle.make}
                      </td>
                      <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vehicle.model}
                      </td>
                      <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vehicle.color}
                      </td>
                      <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vehicle.plate}
                      </td>
                      <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vehicle.year}
                      </td>
                      <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vehicle.type}
                      </td>
                      <td className="text-right relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <Link to={"/editvehicle/" + vehicle.id}>
                          <span className="text-indigo-600 hover:text-indigo-900">
                            Editar
                            <span className="sr-only">, {vehicle.id}</span>
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TablePagination
                currentTableDataSize={currentTableData.length}
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
