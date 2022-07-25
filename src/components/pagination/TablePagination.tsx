import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {classNames} from "../../helpers";
import { usePagination } from "./usePagination";

const TablePagination: React.FC<{
  currentTableDataSize: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}> = ({
  currentTableDataSize,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext: () => void = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious: () => void = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage: number = paginationRange![paginationRange!.length - 1];

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <span
          onClick={onPrevious}
          className={classNames(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
            { disabled: currentPage === 1 }
          )}
        >
          Previous
        </span>
        <span
          onClick={onNext}
          className={classNames(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
            { disabled: currentPage === 1 }
          )}
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">
              {pageSize * (currentPage - 1) + 1}
            </span>{" "}
            a{" "}
            <span className="font-medium">
              {/* Calculation when current data exceeds page size */}
              {currentTableDataSize === pageSize && pageSize * currentPage}
              {/* Calculation when current data is length is lower that page size */}
              {currentTableDataSize < pageSize &&
                pageSize * (currentPage - 1) + currentTableDataSize}
            </span>{" "}
            de <span className="font-medium">{totalCount}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <span
              key={"previous-pagination"}
              onClick={onPrevious}
              className={classNames(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                {
                  disabled: currentPage === 1,
                }
              )}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            {/* Current: "z-10 bg-blue-50 border-blue-500 text-blue-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {paginationRange?.map((pageNumber: number) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              // @ts-ignore
              if (pageNumber === "...") {
                return (
                  <span
                    key={"spread-pagination"}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }

              // Render our Page Pills
              if (pageNumber === currentPage) {
                return (
                  <span
                    key={`pagination-page-${pageNumber}`}
                    onClick={() => onPageChange(pageNumber)}
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {pageNumber}
                  </span>
                );
              } else {
                return (
                  <span
                    key={`pagination-page-${pageNumber}`}
                    onClick={() => onPageChange(pageNumber)}
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {pageNumber}
                  </span>
                );
              }
            })}
            <span
              key={"next-pagination"}
              onClick={onNext}
              className={classNames(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                {
                  disabled: currentPage === lastPage,
                }
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
