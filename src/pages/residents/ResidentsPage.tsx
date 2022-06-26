import React, { useState, useEffect, useRef, useContext } from "react";
import Breadcrumb from "../../components/directory/Breadcrumb";
import ProfileTabs from "../../components/directory/ProfileTabs";
import ProfileHeader from "../../components/directory/ProfileHeader";
import ProfileFields from "../../components/directory/ProfileFields";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectorySearch from "../../components/directory/DirectorySearch";
import PageTitle from "../../models/PageTitle";
import {
  getResidentDirectory,
  getResidentSearchResults,
  getSelectedResident,
} from "../../firestore/controllers/ResidentsController";
import ResidentDataType from "../../models/ResidentDataType";
import AuthContext from "../../store/auth-context";

const UsersPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {
  const authCtx = useContext(AuthContext);
  const [directory, setDirectory] = useState({});
  const [residentCount, setResidentCount] = useState<number>(0);
  const [selectedResident, setSelectedResident] =
    useState<ResidentDataType | null>(null);
  const [selectedFields, setSelectedFields] = useState(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectUserHandler: (key: string) => void = (key) => {
    const getUser = async () => {
      getSelectedResident(key, setSelectedResident, setSelectedFields);
    };
    getUser();
  };

  const searchHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const getUsers: () => void = async () => {
      await getResidentSearchResults(
        searchInputRef,
        authCtx.complex,
        setDirectory,
        setResidentCount
      );
    };
    getUsers();
  };

  useEffect(() => {
    setTitle({
      name: "Directorio de residentes",
      description: "Lista de residentes registrados en el complejo.",
    });
    const getUsers = async () => {
      await getResidentDirectory(
        setDirectory,
        setResidentCount,
        setSelectedResident,
        setSelectedFields,
        authCtx.complex
      );
    };
    getUsers();
  }, [setTitle, authCtx.complex]);

  return (
    <>
      <div className="h-full flex">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <Breadcrumb />

              <article className="pb-6">
                {/* Profile header */}
                <ProfileHeader selectedUser={selectedResident} />

                {/* Tabs */}
                <ProfileTabs />

                {/* Profile Fields */}
                <ProfileFields
                  selectedUser={selectedResident}
                  selectedFields={selectedFields}
                />
              </article>
            </main>
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              {/* Directory Search */}
              <DirectorySearch
                userCount={residentCount}
                searchHandler={searchHandler}
                searchInputRef={searchInputRef}
                directory={"residentes"}
              />
              {/* Directory list */}
              <DirectoryList
                directory={directory}
                selectUserHandler={selectUserHandler}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
