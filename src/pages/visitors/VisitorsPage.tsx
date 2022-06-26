import React, { useState, useEffect, useRef, useContext } from "react";

import Breadcrumb from "../../components/directory/Breadcrumb";
import ProfileTabs from "../../components/directory/ProfileTabs";
import ProfileHeader from "../../components/directory/ProfileHeader";
import ProfileFieldsVisitors from "../../components/directory/ProfileFieldsVisitors";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectorySearch from "../../components/directory/DirectorySearch";
import PageTitle from "../../models/PageTitle";
import {
  getSelectedVisitor,
  getVisitorsDirectory,
  getVisitorsSearch,
} from "../../firestore/controllers/VisitorsController";
import VisitorDataType from "../../models/VisitorDataType";
import AuthContext from "../../store/auth-context";

const VisitorsPage: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ setTitle }) => {

  const authCtx = useContext(AuthContext);

  const [directory, setDirectory] = useState({});
  const [userCount, setVisitorCount] = useState<number>(0);
  const [selectedUser, setSelectedVisitor] = useState<VisitorDataType | null>(null);
  const [selectedFields, setSelectedFields] = useState({});

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selectUserHandler: (key: string) => void = (key) => {
    const getUser = async () => {
      getSelectedVisitor(key, setSelectedVisitor, setSelectedFields);
    };
    getUser();
  };

  const searchHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const getUsers = async () => {
      await getVisitorsSearch(searchInputRef, setDirectory, setVisitorCount, authCtx.complex);
    };
    getUsers();
  };

  useEffect(() => {
    setTitle({
      name: "Directorio de visitantes",
      description: "Lista de visitantes registrados en el complejo.",
    });
    const getUsers = async () => {
      await getVisitorsDirectory(
        setDirectory,
        setVisitorCount,
        setSelectedVisitor,
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
                <ProfileHeader selectedUser={selectedUser} />

                {/* Tabs */}
                <ProfileTabs />

                {/* Profile Fields */}
                <ProfileFieldsVisitors
                  selectedUser={selectedUser}
                  selectedFields={selectedFields}
                />
              </article>
            </main>
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              {/* Directory Search */}
              <DirectorySearch
                userCount={userCount}
                searchHandler={searchHandler}
                searchInputRef={searchInputRef}
                directory={"visitantes"}
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

export default VisitorsPage;
