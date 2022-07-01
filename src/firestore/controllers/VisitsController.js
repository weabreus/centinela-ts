import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
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

export async function getUnits(setOptions, complex) {
  const units = query(collectionGroup(db, "units"), where("complex", "==", complex));

  const querySnapshot = await getDocs(units);

  const options = [];

  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.id,
      label: doc.data().number,
      path: doc.ref.path,
      authorizedVisitors: doc.data().authorizedVisitors,
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

export function createAuthorizedVisitorDirectory(visitors) {
  const visitorDirectory = {};

  visitors.map((visitor) => {
    if (
      !visitorDirectory.hasOwnProperty(visitor.label.charAt(0).toUpperCase())
    ) {
      visitorDirectory[visitor.label.charAt(0).toUpperCase()] = [];

      visitorDirectory[visitor.label.charAt(0).toUpperCase()].push({
        name: visitor.label,
        identification: visitor.identification,
      });
    } else {
      visitorDirectory[visitor.label.charAt(0).toUpperCase()].push({
        id: visitor.value,
        name: visitor.label,
        identification: visitor.identification,
      });
    }

    return visitor;
  }, []);

  return visitorDirectory;
}
