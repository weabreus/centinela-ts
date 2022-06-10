import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import Visit from "../../models/Visit";
import db from "../FirestoreConfig";

export async function getVisit(col, uid, setVisit) {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = new Visit(
      docSnap.id,
      docSnap.data().visitor,
      docSnap.data().vehicle,
      docSnap.data().unit,
      docSnap.data().visitors,
      docSnap.data().entryTimestamp,
      docSnap.data().exitTimestamp,
      docSnap.data().notes
    );

    setVisit(doc);

    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getVisitor(col, uid, setVisitor) {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = new Visit(
      docSnap.id,
      docSnap.data().visitor,
      docSnap.data().vehicle,
      docSnap.data().unit,
      docSnap.data().visitors,
      docSnap.data().entryTimestamp,
      docSnap.data().exitTimestamp,
      docSnap.data().notes
    );

    setVisitor(doc);

    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getUnits(setOptions) {
  const units = query(collectionGroup(db, "units"));

  const querySnapshot = await getDocs(units);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.id,
      label: doc.data().number,
      path: doc.ref.path,
    });
  });

  setOptions(options);
}

export async function getVisitorVehicles(visitorInput, setOptions) {

  const visitorRef = doc(db, "visitors", visitorInput[0]?.value);

  const visitorSnap = await getDoc(visitorRef);
 
  if (visitorSnap.exists()) {
    setOptions(visitorSnap.data().vehicles);
  } else {
    console.log("No such document!");
  }
}

export async function setDocument(col, uid, data) {
  await setDoc(doc(db, col, uid), data);
}