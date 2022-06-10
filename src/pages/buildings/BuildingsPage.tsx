import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TablePagination from "../../components/pagination/TablePagination";
import { getBuildings } from "../../firestore/controllers/BuildingsController";
import BuildingsShortType from "../../models/BuildingsShortType";
import PageTitle from "../../models/PageTitle";

let PageSize = 10;

const BuildingsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>}> = ({ setTitle }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<BuildingsShortType[]>([]);

  const currentTableData: BuildingsShortType[] = useMemo(() => {
    const firstPageIndex: number = (currentPage - 1) * PageSize;
    const lastPageIndex: number = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  useEffect(() => {
    setTitle({
      name: "Edificios",
      description: "Lista de todos los edificios del complejo.",
    });

    const getData = async () => {
      getBuildings(setData);
    };
    getData();
  }, [ setTitle ]);

  return (
    <div className="p-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/createbuilding"}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Agregar Edificio
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
                      className=" w-4/12 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className=" w-6/12 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dirección
                    </th>
                    <th
                      scope="col"
                      className=" w-2/12 relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentTableData.map((building) => (
                    <tr key={building.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {building.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {building.address}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"/editbuilding/" + building.id}>
                          <span className="text-indigo-600 hover:text-indigo-900">
                            Editar
                            <span className="sr-only">, {building.id}</span>
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

export default BuildingsPage;