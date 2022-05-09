import { useState, useEffect, useRef } from "react";

import db from "../firestore/FirestoreConfig";
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";

import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from "@heroicons/react/solid";

const tabs = [{ name: "Profile", href: "#", current: true }];
let profile = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
      const newDirectory = {};
      let count = 0;
      const data = await getDocs(
        query(collection(db, "users")
          ,where("name", ">=", searchInputRef.current.value)
          ,where("name", "<=", searchInputRef.current.value + "\uf8ff"))
      );

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
              <nav
                className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                aria-label="Breadcrumb"
              >
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                >
                  <ChevronLeftIcon
                    className="-ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Directory</span>
                </a>
              </nav>

              <article className="pb-6">
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={profile.coverImageUrl}
                      alt=""
                    />
                  </div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={selectedUser.photo}
                          alt=""
                        />
                      </div>
                      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {selectedUser.name}
                          </h1>
                        </div>
                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <MailIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Message</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <PhoneIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Call</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {selectedUser.name}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                              tab.current
                                ? "border-blue-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            )}
                            aria-current={tab.current ? "page" : undefined}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {Object.keys(selectedFields).map((field) => (
                      <div key={field} className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          {field}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {selectedFields[field]}
                        </dd>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd
                        className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                        dangerouslySetInnerHTML={{ __html: profile.about }}
                      />
                    </div>
                  </dl>
                </div>
              </article>
            </main>
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Directorio
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Entre los {userCount} usuarios del directorio.
                </p>
                <form className="mt-6 flex space-x-4" onSubmit={searchHandler}>
                  <div className="flex-1 min-w-0">
                    <label htmlFor="search" className="sr-only">
                      Buscar
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Buscar"
                        ref={searchInputRef}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FilterIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Buscar</span>
                  </button>
                </form>
              </div>
              {/* Directory list */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto"
                aria-label="Directory"
              >
                {Object.keys(directory).sort().map((letter) => (
                  <div key={letter} className="relative">
                    <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>{letter}</h3>
                    </div>
                    <ul
                      role="list"
                      className="relative z-0 divide-y divide-gray-200"
                    >
                      {directory[letter].map((person) => (
                        <li
                          key={person.id}
                          onClick={() => {
                            selectUserHandler(person.id);
                          }}
                        >
                          <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={person.photo}
                                alt=""
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <a href="#" className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900">
                                  {person.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {person.title ? person.title : ""}
                                </p>
                              </a>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersPage;
