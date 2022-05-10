import { useState, useEffect, useRef } from "react";

import db from "../firestore/FirestoreConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import Breadcrumb from "../components/directory/Breadcrumb";
import ProfileTabs from "../components/directory/ProfileTabs";
import ProfileHeader from "../components/directory/ProfileHeader";
import ProfileFields from "../components/directory/ProfileFields";
import DirectoryList from "../components/directory/DirectoryList";
import DirectorySearch from "../components/directory/DirectorySearch";

let profile = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function UsersPage() {
  const [directory, setDirectory] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedFields, setSelectedFields] = useState({});
  const usersCollectionRef = collection(db, "users");
  const searchInputRef = useRef("");

  const selectUserHandler = (key) => {
    const getUser = async () => {
      const data = await getDoc(doc(db, "users", key));

      if (data.exists()) {
        let newSelectedUser = data.data();

        setSelectedUser(newSelectedUser);

        setSelectedFields({
          Telefono: newSelectedUser.phone,
          Email: newSelectedUser.email,
          Titulo: newSelectedUser.title,
          Organizacion: newSelectedUser.organization,
          Direccion: newSelectedUser.address,
          Municipio: newSelectedUser.municipality,
          Pais: newSelectedUser.country,
          Area: newSelectedUser.areacode,
        });
      }
    };
    getUser();
  };

  const searchHandler = (event) => {
    event.preventDefault();

    const getUsers = async () => {
      let count = 0;
      const data = await getDocs(
        query(
          collection(db, "users"),
          where("name", ">=", searchInputRef.current.value),
          where("name", "<=", searchInputRef.current.value + "\uf8ff")
        )
      );

      const newDirectory = data.docs.reduce((acc, doc) => {
        const firstLetter = doc.data().name.charAt(0).toUpperCase();

        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }

        acc[firstLetter].push({ ...doc.data(), id: doc.id });
        count++;

        return acc;
      }, {});

      setDirectory(newDirectory);
      setUserCount(count);
    };
    getUsers();
  };

  useEffect(() => {
    const getUsers = async () => {
      const newDirectory = {};
      let count = 0;
      let newSelectedUser = {};

      const data = await getDocs(usersCollectionRef);
      data.docs.map((doc) => {
        if (
          !newDirectory.hasOwnProperty(doc.data().name.charAt(0).toUpperCase())
        ) {
          newDirectory[doc.data().name.charAt(0).toUpperCase()] = [];
          newDirectory[doc.data().name.charAt(0).toUpperCase()].push({
            ...doc.data(),
            id: doc.id,
          });
          count++;
        } else {
          newDirectory[doc.data().name.charAt(0).toUpperCase()].push({
            ...doc.data(),
            id: doc.id,
          });
          count++;
        }
      });

      newSelectedUser = newDirectory[Object.keys(newDirectory)[0]][0];

      setDirectory(newDirectory);
      setUserCount(count);
      setSelectedUser(newSelectedUser);
      setSelectedFields({
        Telefono: newSelectedUser.phone,
        Email: newSelectedUser.email,
        Titulo: newSelectedUser.title,
        Organizacion: newSelectedUser.organization,
        Direccion: newSelectedUser.address,
        Municipio: newSelectedUser.municipality,
        Pais: newSelectedUser.country,
        Area: newSelectedUser.areacode,
      });
    };
    getUsers();
  }, []);

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full overflow-hidden">
            ```
          */}
      <div className="h-full flex">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <Breadcrumb />

              <article className="pb-6">
                {/* Profile header */}
                <ProfileHeader selectedUser={selectedUser} profile={profile} />

                {/* Tabs */}
                <ProfileTabs />

                {/* Profile Fields */}
                <ProfileFields selectedFields={selectedFields} />
              </article>
            </main>
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              {/* Directory Search */}
              <DirectorySearch
                userCount={userCount}
                searchHandler={searchHandler}
                searchInputRef={searchInputRef}
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
}

export default UsersPage;
