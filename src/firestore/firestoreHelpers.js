// File with functions to retrieve and store data from Firestore
import db from "./FirestoreConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  documentId,
  collectionGroup,
  setDoc,
} from "firebase/firestore";
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

export async function getVisitorsInitial(setOptions, visitorUid, setInitial) {
  const collectionRef = await getDocs(collection(db, "visitors"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);

  const visitor = options.filter((option) => option.value === visitorUid);

  setInitial(visitor);
}

export async function getVisitorVehicles(visitor, setOptions) {
  const docRef = doc(db, "visitors", visitor.value);
  const docSnap = await getDoc(docRef);

  const vehicles = docSnap.data().vehicles;
  const q = query(
    collection(db, "vehicles"),
    where(documentId(), "in", vehicles)
  );

  const options = [];

  const vehicleSnap = await getDocs(q);
  vehicleSnap.forEach((doc) => {
    options.push({
      value: doc.id,
      label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${
        doc.data().year
      }`,
    });
  });

  setOptions(options);
}

export async function getUnits(setOptions) {
  const units = query(collectionGroup(db, "units"));

  const querySnapshot = await getDocs(units);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().number });
  });

  setOptions(options);
}

export async function getDocument(col, uid) {

  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = { docId: docSnap.id, ...docSnap.data()};
  
    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function setDocument(col, uid, data) {

 await setDoc(doc(db, col, uid), data);
}

