import React, { useState, useEffect, useContext } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import db from "../../firestore/FirestoreConfig";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  collectionGroup,
  orderBy,
  where,
} from "firebase/firestore";
import moment from "moment";
import PageTitle from "../../models/PageTitle";
import UnitShortType from "../../models/UnitShortType";
import VisitDataType from "../../models/VisitDataType";
import AuthContext from "../../store/auth-context";
import { capitalizeFirstLetter } from "../../helpers";

const VisitsPage: React.FC<{
  visits: VisitDataType[];
  setVisits: React.Dispatch<React.SetStateAction<VisitDataType[]>>;
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ visits, setVisits, setTitle }) => {
  const authCtx = useContext(AuthContext);

  const [units, setUnits] = useState<UnitShortType[]>([]);

  useEffect(() => {
    setTitle({
      name: "Visitas",
      description: "Lista de visitas recientes al complejo.",
    });
    const getVisits = async () => {
      const queryDate = new Date();
      console.log(new Date(queryDate.setDate(queryDate.getDate() - 1)))
      const visitsCollectionRef = query(
        collection(db, "visits"),
        where("complex", "==", authCtx.complex),
        where("entryTimestamp", ">=", new Date(queryDate.setDate(queryDate.getDate() - 1))),
        orderBy("entryTimestamp", "desc")
      );
      const data = await getDocs(visitsCollectionRef);
      const tempVisits: VisitDataType[] = data.docs.map((doc) => {
        return {
          id: doc.id,
          visitorName: doc.data().visitorName,
          visitorID: doc.data().visitorID,
          vehicleModel: doc.data().vehicleModel,
          vehiclePlate: doc.data().vehiclePlate,
          unit: doc.data().unit,
          visitors: doc.data().visitors,
          entryTimestamp: doc.data().entryTimestamp,
          notes: doc.data().notes,
          type: doc.data()?.type
        };
      });

      const unitCollectionRef = query(
        collectionGroup(db, "units"),
        where("complex", "==", authCtx.complex)
      );
      const unitData = await getDocs(unitCollectionRef);
      const tempUnits: UnitShortType[] = unitData.docs.map((doc) => {
        return { number: doc.data().number, id: doc.id };
      });

      setVisits(tempVisits);
      setUnits(tempUnits);
    };
    getVisits();
  }, [setTitle, setVisits, authCtx.complex]);

  useEffect(() => {
    const queryDate = new Date();

    onSnapshot(
      query(
        collection(db, "visits"),
        where("complex", "==", authCtx.complex),
        where("entryTimestamp", ">=", new Date(queryDate.setDate(queryDate.getDate() - 1))),
        orderBy("entryTimestamp", "desc")
      ),
      (snap) => {
        const snapVisits: VisitDataType[] = [];
        snap.forEach((doc) => {
          snapVisits.push({
            id: doc.id,
            visitorName: doc.data().visitorName,
            visitorID: doc.data().visitorID,
            vehicleModel: doc.data().vehicleModel,
            vehiclePlate: doc.data().vehiclePlate,
            unit: doc.data().unit,
            visitors: doc.data().visitors,
            entryTimestamp: doc.data().entryTimestamp,
            notes: doc.data().notes,
            type: doc.data().type
          });
        });
        setVisits(snapVisits);
      }
    );
  }, [setVisits, authCtx.complex]);

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
              <span className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                <span className="flex items-center truncate space-x-3">
                  <span
                    className="w-2.5 h-2.5 flex-shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <span className="font-medium truncate text-sm leading-6">
                    {visit.visitorName}
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
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
                <th
                  scope="col"
                  className="text-center w-3/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="lg:pl-2">Nombre / ID</span>
                </th>
                <th
                  scope="col"
                  className="text-center w-1/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="lg:pl-2">Tipo</span>
                </th>
                <th
                  scope="col"
                  className="text-center w-3/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="lg:pl-2">Fecha</span>
                </th>
                <th
                  scope="col"
                  className="text-center w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  H. Entrada
                </th>
                <th
                  scope="col"
                  className="text-center w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dest.
                </th>
                <th
                  scope="col"
                  className="text-center w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Veh.
                </th>
                <th
                  scope="col"
                  className="text-center w-1/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Visitantes
                </th>
                <th
                  scope="col"
                  className="text-center w-1/12 pr-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
                />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {visits.map((visit) => (
                <tr key={visit.id}>
                  <td className="text-center px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span>{visit.visitorName} ({visit?.visitorID})</span>
                  </td>
                  <td className="text-center px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-500">
                    <span>{capitalizeFirstLetter(visit?.type)}</span>
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {moment.unix(visit.entryTimestamp.seconds).format("L")}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {moment.unix(visit.entryTimestamp.seconds).format("LT")}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {
                      // @ts-ignore
                      units.filter((unit) => unit.id === visit.unit[0].value)[0]
                        ?.number
                    }
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {`(${visit.vehiclePlate}) ${visit.vehicleModel}`}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {visit.visitors}
                  </td>
                  {/* <td className="text-center px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={"/editvisit/" + visit.id}>
                      <span className="text-blue-600 hover:text-blue-900">
                        Editar
                      </span>
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitsPage;
