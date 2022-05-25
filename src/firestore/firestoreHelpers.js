// File with functions to retrieve and store data from Firestore
import db from "./FirestoreConfig";
import { collection, doc, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export async function storeVisit(data) {
  console.log(db);
//   const collectionRef = collection(db, "visits");
//   console.log(collectionRef);

  //   const docRef = await addDoc(collectionRef, {
  //     entryTimestamp: data.entry,
  //     exitTimestamp: data.exit,
  //     visitor: data.visitor,
  //     resident: data.resident,
  //     vehicle: data.vehicle,
  //     notes: data.notes,
  //   });

  //   console.log("Document written with ID: ", docRef.id);
}
