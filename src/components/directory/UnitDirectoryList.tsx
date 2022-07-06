import { HomeIcon } from '@heroicons/react/outline';
import React from 'react';
import Directory from '../../models/DirectoryType';
import UnitDataType from '../../models/UnitDataType';


const UnitDirectoryList: React.FC<{directory: Directory<UnitDataType>, selectUnitHandler: (path: string) => void}> = (props) => {
    const { directory, selectUnitHandler } = props;
  return (
    <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
      {Object.keys(directory)
        .sort()
        .map((letter) => (
          <div key={letter} className="relative">
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
              <h3>{letter}</h3>
            </div>
            <ul className="relative z-0 divide-y divide-gray-200">
              {directory[letter].map((unit: UnitDataType) => (
                <li
                  key={unit.id}
                  onClick={() => {
                    console.log(unit)
                    selectUnitHandler(unit.path ?? "");
                  }}
                >
                  <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <div className="flex-shrink-0">
                      {/* <img
                        className="h-10 w-10 rounded-full"
                        src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt=""
                      /> */}
                      <HomeIcon className='h-10 w-10 p-2 rounded-full bg-gray-100 text-gray-500'/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span  className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {unit.number}
                        </p>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </nav>
  );
}

export default UnitDirectoryList;
