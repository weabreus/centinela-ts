import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TablePagination from "../../components/pagination/TablePagination";

// Para traer esta data de firebase @Lucho2027
const data = [
  {
    id: "qyGp2fBgvOtwthSlF6tt",
    name: "Complejo 1",
  },
  {
    id: "qyGp2fBgvOtwthSlF6ta",
    name: "Complejo 2",
  },
  {
    id: "qyGp2fBgvOtwthSlF6td",
    name: "Complejo 3",
  },

];

let PageSize = 10;

export default function BuildingsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="p-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Complejos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los complejos registrados.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/createcomplex"}>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Agregar Complejo
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
                      className=" w-10/12 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nombre
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
                  {currentTableData.map((complex) => (
                    <tr key={complex.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {complex.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"/editcomplex/" + complex.id}>
                        <span className="text-indigo-600 hover:text-indigo-900">
                          Editar<span className="sr-only">, {complex.id}</span>
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
}
