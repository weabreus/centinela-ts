import React, { useState, useEffect, useRef, useContext } from "react";
import DirectorySearch from "../../components/directory/DirectorySearch";
import PageTitle from "../../models/PageTitle";
import AuthContext from "../../store/auth-context";
import {
  getSelectedUnit,
  getUnitDirectory,
  getUnitSearchResults,
} from "../../firestore/controllers/UnitsController";
import UnitDataType from "../../models/UnitDataType";
import UnitDirectoryList from "../../components/directory/UnitDirectoryList";
import UnitProfile from "../../components/directory/UnitProfile";

const UnitsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const authCtx = useContext(AuthContext);
  const [directory, setDirectory] = useState({});
  const [unitCount, setUnitCount] = useState<number>(0);
  const [selectedUnit, setSelectedUnit] = useState<UnitDataType | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectUnitHandler: (path: string | undefined) => void = async (path) => {
      getSelectedUnit(path, setSelectedUnit);
  };

  const searchHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const getUsers: () => void = async () => {
      await getUnitSearchResults(
        searchInputRef,
        authCtx.complex,
        setDirectory,
        setUnitCount
      );
    };
    getUsers();
  };

  useEffect(() => {
    setTitle({
      name: "Directorio de unidades",
      description: "Lista de unidades registrados en el complejo.",
    });
    const getUnits = async () => {
      await getUnitDirectory(
        setDirectory,
        setUnitCount,
        setSelectedUnit,
        authCtx.complex
      );
    };
    getUnits();
  }, [setTitle, authCtx.complex]);

  return (
    <>
      <div className="h-full flex">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <UnitProfile 
              selectedUnit={selectedUnit}
            />
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              {/* Directory Search */}
              <DirectorySearch
                userCount={unitCount}
                searchHandler={searchHandler}
                searchInputRef={searchInputRef}
                directory={"unidades"}
              />
              {/* Directory list */}
              <UnitDirectoryList
                directory={directory}
                selectUnitHandler={selectUnitHandler}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitsPage;
