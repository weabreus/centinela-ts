import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import db from "../../firestore/FirestoreConfig";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  collectionGroup,
  orderBy,
} from "firebase/firestore";
import moment from "moment";
import PageTitle from "../../models/PageTitle";
import VehicleShortType from "../../models/VehicleShortType";
import Input from "../../models/Input";
import UnitShortType from "../../models/UnitShortType";
import VisitorShortType from "../../models/VisitorShortType";
import VisitDataType from "../../models/VisitDataType";

const VisitsPage: React.FC<{
  visits: VisitDataType[];
  setVisits: React.Dispatch<React.SetStateAction<VisitDataType[]>>;
  setTitle: React.Dispatch<React.SetStateAction<PageTitle>>;
}> = ({ visits, setVisits, setTitle }) => {
  const [visitors, setVisitors] = useState<VisitorShortType[]>([]);
  const [units, setUnits] = useState<UnitShortType[]>([]);
  const [vehicles, setVehicles] = useState<VehicleShortType[]>([]);

  function vehicleDescription(
    vehiclesList: VehicleShortType[],
    currentVehicle: Input[]
  ) {
    const vehicle = vehiclesList.filter((vehicle) => {
      return vehicle.id === currentVehicle[0].value;
    });

    return `${vehicle[0]?.make} ${vehicle[0]?.model} ${vehicle[0]?.year}`;
  }

  useEffect(() => {
    setTitle({
      name: "Visitas",
      description: "Lista de visitas recientes al complejo.",
    });
    const getVisits = async () => {
      const visitsCollectionRef = query(
        collection(db, "visits"),
        orderBy("entryTimestamp", "desc")
      );
      const data = await getDocs(visitsCollectionRef);
      const tempVisits: VisitDataType[] = data.docs.map((doc) => {
        return {
          id: doc.id,
          visitor: doc.data().visitor,
          vehicle: doc.data().vehicle,
          unit: doc.data().unit,
          visitors: doc.data().visitors,
          entryTimestamp: doc.data().entryTimestamp,
          exitTimestamp: doc.data().exitTimestamp,
          notes: doc.data().notes,
        };
      });

      const usersCollectionRef = query(collection(db, "visitors"));
      const visitorData = await getDocs(usersCollectionRef);

      const tempVisitors = visitorData.docs.map((doc) => {
        return { name: doc.data().name, id: doc.id };
      });

      const unitCollectionRef = query(collectionGroup(db, "units"));
      const unitData = await getDocs(unitCollectionRef);
      const tempUnits: UnitShortType[] = unitData.docs.map((doc) => {
        return { number: doc.data().number, id: doc.id };
      });

      const vehicleCollectionRef = query(collection(db, "vehicles"));
      const vehicleData = await getDocs(vehicleCollectionRef);
      const tempVehicles: VehicleShortType[] = vehicleData.docs.map((doc) => {
        return {
          make: doc.data().make,
          year: doc.data().year,
          model: doc.data().model,
          id: doc.id,
        };
      });

      setVisits(tempVisits);
      setVisitors(tempVisitors);
      setUnits(tempUnits);
      setVehicles(tempVehicles);
    };
    getVisits();
  }, [setTitle, setVisits]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "visits"), orderBy("entryTimestamp", "desc")),
      (snap) => {
        const snapVisits: VisitDataType[] = [];
        snap.forEach((doc) => {
          snapVisits.push({
            id: doc.id,
            visitor: doc.data().visitor,
            vehicle: doc.data().vehicle,
            unit: doc.data().unit,
            visitors: doc.data().visitors,
            entryTimestamp: doc.data().entryTimestamp,
            exitTimestamp: doc.data().exitTimestamp,
            notes: doc.data().notes,
          });
        });
        setVisits(snapVisits);
      }
    );
  }, [setVisits]);

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
                    {visit.visitor[0].value}
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
                  <span className="lg:pl-2">Visitante</span>
                </th>
                <th
                  scope="col"
                  className="text-center w-2/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xxs font-medium text-gray-500 uppercase tracking-wider"
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
                  H. Salida
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
                    <span>
                      {
                        visitors.filter(
                          (visitor) => visitor.id === visit.visitor[0].value
                        )[0]?.name
                      }
                    </span>
                    {/* </a> */}
                    {/* </div> */}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {moment.unix(visit.entryTimestamp.seconds).format("L")}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {moment.unix(visit.entryTimestamp.seconds).format("LT")}
                  </td>

                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {visit.exitTimestamp
                      ? moment.unix(visit.exitTimestamp.seconds).format("LT")
                      : ""}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {
                      // @ts-ignore
                      units.filter((unit) => unit.id === visit.unit[0].value)[0]
                        ?.number
                    }
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {vehicleDescription(vehicles, visit.vehicle)}
                  </td>
                  <td className="text-center hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {visit.visitors}
                  </td>
                  <td className="text-center px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={"/editvisit/" + visit.id}>
                      <span className="text-indigo-600 hover:text-indigo-900">
                        Editar
                      </span>
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
};

export default VisitsPage;
