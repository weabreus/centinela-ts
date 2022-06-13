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
import NavbarDateRange from "../form/NavbarDateRange";
import VisitsForm from "../form/VisitsForm";

const Navbar: React.FC<{
  setVisits: React.Dispatch<VisitDataType[]>;
  title: PageTitle;
}> = ({ setVisits, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

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

    const options: VisitDataType[] = [];

    visitsSnap.forEach((doc) => {
      options.push(
        {
          id: doc.id,
          visitor: doc.data().visitor,
          vehicle: doc.data().vehicle,
          unit: doc.data().unit,
          visitors: doc.data().visitors,
          entryTimestamp: doc.data().entryTimestamp,
          exitTimestamp: doc.data().exitTimestamp,
          notes: doc.data().notes
        }
      );
    });

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
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NavbarDateRange
              filterVisitsHandler={filterVisitsHandler}
              inputRef={startRef}
              label={"Fecha de inicio"}
            />
            <NavbarDateRange
              filterVisitsHandler={filterVisitsHandler}
              inputRef={endRef}
              label={"Fecha de fin"}
            />
          </div>
        )}
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
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