import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useRef } from "react";
import db from "../../firestore/FirestoreConfig";
import PageTitle from "../../models/PageTitle";
import VisitDataType from "../../models/VisitDataType";
import VisitsForm from "../form/VisitsForm";
import VisitsFilter from "./VisitsFilter";

const Navbar: React.FC<{
  setVisits: React.Dispatch<VisitDataType[]>;
  title: PageTitle;
}> = ({ setVisits, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);
  const visitorRef = useRef<HTMLInputElement>(null);
  const vehicleRef = useRef<HTMLInputElement>(null);

  const filterVisitsHandler: () => void = async () => {
    const queryStartDate: string =
      startRef.current?.value === ""
        ? "1900-01-01T00:00"
        : startRef.current!.value;
    const queryEndDate: string =
      endRef.current?.value === "" ? "3000-01-01T00:00" : endRef.current!.value;

    const visitsRef = query(
      collection(db, "visits"),
      where("entryTimestamp", ">=", new Date(queryStartDate)),
      where("entryTimestamp", "<=", new Date(queryEndDate!)),
      orderBy("entryTimestamp", "desc")
    );
    const visitsSnap: QuerySnapshot = await getDocs(visitsRef);

    let options: VisitDataType[] = [];

    visitsSnap.forEach((doc) => {
      options.push({
        id: doc.id,
        visitorName: doc.data().visitorName,
        visitorID: doc.data().visitorID,
        vehicleModel: doc.data().vehicleModel,
        vehiclePlate: doc.data().vehiclePlate,
        unit: doc.data().unit,
        visitors: doc.data().visitors,
        entryTimestamp: doc.data().entryTimestamp,
        notes: doc.data().notes,
      });
    });

    if (visitorRef.current?.value !== "") {
      options = options.filter((visit) =>
        visit.visitorName.toLowerCase().includes(visitorRef.current!.value.toLowerCase())
      );
    }

    if (unitRef.current?.value !== "") {
      options = options.filter((visit) =>
        visit.unit[0].label.toLowerCase().includes(unitRef.current!.value.toLowerCase())
      );
    }

    if (vehicleRef.current?.value !== "") {
      options = options.filter((visit) =>
        (visit.vehicleModel.toLowerCase().includes(vehicleRef.current!.value.toLowerCase()) || visit.vehiclePlate.toLowerCase().includes(vehicleRef.current!.value.toLowerCase()))
      );
    }

    setVisits(options);
  };

  return (
    <>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                {title.name}
              </h1>
              <p className="mt-2 text-sm text-gray-700">{title.description}</p>
            </div>
          </h1>
        </div>
        {title.name === "Visitas" && (
 
          <VisitsFilter
            startRef={startRef}
            endRef={endRef}
            unitRef={unitRef}
            visitorRef={visitorRef}
            vehicleRef={vehicleRef}
            filterVisitsHandler={filterVisitsHandler}
          />
        )}
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 sm:order-1 sm:ml-3"
            onClick={() => setOpen(true)}
          >
            Crear Visita
          </button>
        </div>
      </div>

      <VisitsForm open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
