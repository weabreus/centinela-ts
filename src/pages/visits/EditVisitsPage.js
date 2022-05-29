import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VisitorInput from "../../components/form/VisitorInput";
import VisitorVehicleInput from "../../components/form/VisitorVehicleInput";
import moment from "moment";
import { useEffect } from "react";
import {
  getDocument,
  getVisitorVehicles,
  setDocument,
} from "../../firestore/firestoreHelpers";
import { useState } from "react";
import UnitInput from "../../components/form/UnitInput";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import db from "../../firestore/FirestoreConfig";
import { useHistory } from "react-router-dom";

export default function EditVisitsPage() {
  let history = useHistory();
  let { id } = useParams();
  const [visit, setVisit] = useState([]);
  const [visitor, setVisitor] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [unit, setUnit] = useState({});

  const [vehicles, setVehicles] = useState([]);

  const visitorRef = useRef();
  const vehicleRef = useRef();
  const unitRef = useRef();
  const entryRef = useRef();
  const exitRef = useRef();
  const notesRef = useRef();
  const quantityRef = useRef();

  function visitorChangeHandle(visitor) {
    getVisitorVehicles(visitor, setVehicles);
  }

  useEffect(() => {
    const getInputs = async () => {
      // get visit
      const visitDocRef = doc(db, "visits", id);
      const visitDocSnap = await getDoc(visitDocRef);

      if (visitDocSnap.exists()) {
        const visitDoc = [{ docId: visitDocSnap.id, ...visitDocSnap.data() }];
        setVisit(visitDoc);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // get visitor
      const visitorDocRef = doc(db, "visitors", visitDocSnap.data().visitor);
      const visitorDocSnap = await getDoc(visitorDocRef);

      if (visitorDocSnap.exists()) {
        const visitorDoc = [
          { value: visitorDocSnap.id, label: visitorDocSnap.data().name },
        ];
        setVisitor(visitorDoc);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // get vehicle
      const vehicleDocRef = doc(db, "vehicles", visitDocSnap.data().vehicle);
      const vehicleDocSnap = await getDoc(vehicleDocRef);

      if (vehicleDocSnap.exists()) {
        const vehicleDoc = {
          docId: vehicleDocSnap.id,
          ...vehicleDocSnap.data(),
        };
        setVehicle([
          {
            value: vehicleDoc.docId,
            label: `(${vehicleDoc.plate}) ${vehicleDoc.make} ${vehicleDoc.model} ${vehicleDoc.year}`,
          },
        ]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // get unit
      const unitsColRef = query(collectionGroup(db, "units"));
      const querySnapshot = await getDocs(unitsColRef);
      const unitsList = querySnapshot.docs.map((doc) => {
        return { value: doc.id, label: doc.data().number };
      });

      const unitDoc = unitsList.filter(
        (unit) => unit.value === visitDocSnap.data().unit
      );

      setUnit(unitDoc);
    };
    getInputs();
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const visitData = {
      visitor: visitorRef.current.getValue()[0].value,
      vehicle: vehicleRef.current.getValue()[0].value,
      unit: unitRef.current.getValue()[0].value,
      entryTimestamp: entryRef.current.value,
      exitTimestamp: exitRef.current.value,
      notes: notesRef.current.value,
      visitors: quantityRef.current.value,
    };

    setDocument("visits", visit[0]?.docId, visitData);
    history.push("/visits")
    
  }

  return (
    <div className="py-6 px-12">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Editar visita
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Llene los campos requeridos para editar la visita.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="visitor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visitante
                </label>
                <div className="mt-1">
                  <VisitorInput
                    visitor={visitorRef}
                    initial={visitor}
                    visitorChangeHandle={visitorChangeHandle}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="vehicle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehiculo
                </label>
                <div className="mt-1">
                  <VisitorVehicleInput
                    vehicle={vehicleRef}
                    initial={vehicle}
                    options={vehicles}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="unit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidad
                </label>
                <div className="mt-1">
                  <UnitInput unit={unitRef} initial={unit} />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Acompañantes
                </label>
                <div className="mt-1">
                  <input
                    defaultValue={visit[0]?.visitors}
                    min="0"
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ref={quantityRef}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Tiempos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Modifique los tiempos de entra y salida.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="entry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entrada
                </label>
                <div className="mt-1">
                  <input
                    ref={entryRef}
                    type="datetime-local"
                    name="entry"
                    id="entry"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={moment(visit.entryTimestamp).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="exit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salida
                </label>
                <div className="mt-1">
                  <input
                    ref={exitRef}
                    type="datetime-local"
                    name="exit"
                    id="exit"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={moment(visit.exitTimestamp).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    ref={notesRef}
                    id="notes"
                    name="notes"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={visit[0]?.notes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link to="/visits">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            </Link>

            <button
              onClick={submitHandler}
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
