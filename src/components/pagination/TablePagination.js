import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classnames from "classnames";
import { usePagination } from "./usePagination";

export default function TablePagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
      if (currentPage !== lastPage) {
        onPageChange(currentPage + 1);
      }
    
  };

  const onPrevious = () => {
      if (currentPage !== 1) {
        onPageChange(currentPage - 1);
      }  
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={onPrevious}
          className={classnames(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
            { disabled: currentPage === 1 }
          )}
        >
          Previous
        </a>
        <a
          onClick={onNext}
          className={classnames(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
            { disabled: currentPage === 1 }
          )}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">
              {pageSize * (currentPage - 1) + 1}
            </span>{" "}
            a <span className="font-medium">{pageSize * currentPage}</span> de{" "}
            <span className="font-medium">{totalCount}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              onClick={onPrevious}
              className={classnames(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                {
                  disabled: currentPage === 1,
                }
              )}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            

            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {paginationRange.map((pageNumber) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === '...') {
                return (
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                );
              }

              // Render our Page Pills
              if (pageNumber === currentPage) {
                return (
                  <a
                    onClick={() => onPageChange(pageNumber)}
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {pageNumber}
                  </a>
                );
              } else {
                return (
                  <a
                    onClick={() => onPageChange(pageNumber)}
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {pageNumber}
                  </a>
                );
              }

              
            })}
            <a
              onClick={onNext}
              className={classnames(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                {
                  disabled: currentPage === lastPage,
                }
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
