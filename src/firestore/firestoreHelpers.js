// File with functions to retrieve and store data from Firestore
import db from "./FirestoreConfig";
import { collection, addDoc, getDocs, doc, getDoc, query, where, documentId, collectionGroup } from "firebase/firestore";
import moment from "moment";
import { async } from "@firebase/util";

export async function storeVisit(data) {
  const docRef = await addDoc(collection(db, "visits"), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function getResidents(setOptions) {
  const collectionRef = await getDocs(collection(db, "residents"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getVisitors(setOptions) {
  const collectionRef = await getDocs(collection(db, "visitors"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getVisitorVehicles(visitor, setOptions) {
  
  const docRef = doc(db, "visitors", visitor.value);
  const docSnap = await getDoc(docRef);

  const vehicles = docSnap.data().vehicles;
  const q = query(collection(db, "vehicles"), where(documentId(), "in", vehicles));

  const options = [];

  const vehicleSnap = await getDocs(q);
  vehicleSnap.forEach((doc) => {
    options.push({value: doc.id, label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${doc.data().year}` })
  })

  setOptions(options);
}

export async function getUnits(setOptions) {
  const units = query(collectionGroup(db, "units"));

  const querySnapshot = await getDocs(units);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({value: doc.id, label: doc.data().number});
  });

  setOptions(options);
}