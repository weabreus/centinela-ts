import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import db from "../../firestore/FirestoreConfig";
import {  
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import moment from "moment";


function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [residents, setResidents] = useState([]);
  const visitsCollectionRef = collection(db, "visits");

  useEffect(() => {
    const getVisits = async () => {
      const data = await getDocs(visitsCollectionRef);
      const tempVisits = data.docs.map((doc) => {
        return {...doc.data(), docId: doc.id};
      });

      const visitorsIds = data.docs.map((doc) => doc.data().visitor);
      const usersCollectionRef = query(
        collection(db, "users"),
        where(documentId(), "in", visitorsIds)
      );
      const visitorData = await getDocs(usersCollectionRef);

      const tempVisitors = visitorData.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      const residentIds = data.docs.map((doc) => doc.data().resident);
      const residentCollectionRef = query(
        collection(db, "users"),
        where(documentId(), "in", residentIds)
      );
      const residentData = await getDocs(residentCollectionRef);
      const tempResidents = residentData.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(tempVisits);
      setVisits(tempVisits);
      setVisitors(tempVisitors);
      setResidents(tempResidents)
    };
    getVisits();
  }, []);

  return (
    <div>
      {/* Projects list (only on smallest breakpoint) */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Visitas
          </h2>
        </div>
        <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
          {visits.map((visit) => (
            <li key={visit.id}>
              <a
                href="#"
                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
              >
                <span className="flex items-center truncate space-x-3">
                  <span
                    className="w-2.5 h-2.5 flex-shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <span className="font-medium truncate text-sm leading-6">
                    {visit.visitor}
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="table-fixed min-w-full">
            <thead>
              <tr>
                <th scope="col" className="w-2/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Visitante</span>
                </th>
                <th scope="col" className="w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  H. Entrada
                </th>
                <th  scope="col" className="w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  H. Salida
                </th>
                <th scope="col" className="w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  Dest.
                </th>
                <th scope="col" className="w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  Veh.
                </th>
                <th scope="col" className="w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th scope="col" className="w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider">
                  Visitantes
                </th>
                <th scope="col" className="w-1/12 pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xxs font-medium text-gray-500 uppercase tracking-wider" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {visits.map((visit) => (
                
                <tr key={visit.docId}>
                  <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                        aria-hidden="true"
                      />
                      <a href="#" className="truncate hover:text-gray-600">
                        <span>
                          {
                            visitors.filter(
                              (visitor) => visitor.id === visit.visitor
                            )[0].name
                          }
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {moment.unix(visit.entryTimestamp.seconds).format("LT")}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {moment.unix(visit.exitTimestamp.seconds).format("LT")}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {residents.filter((resident) => resident.id === visit.resident)[0].name}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {visit.vehicle}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {visit.id}
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {visit.visitors}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={"/editvisit/" + visit.docId}>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </a>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisitsPage;
