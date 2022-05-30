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
  updateDoc,
} from "firebase/firestore";

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
    const doc = { docId: docSnap.id, ...docSnap.data() };

    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function setDocument(col, uid, data) {
  await setDoc(doc(db, col, uid), data);
}

export async function addDocument(col, data) {
  const docRef = await addDoc(collection(db, col), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function updateDocument(col, uid, data) {
  await updateDoc(doc(db, col, uid), data);

  console.log("Document updated with ID: ", uid);
}

export async function getComplexes(setOptions) {
  const collectionRef = await getDocs(collection(db, "complexes"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ id: doc.id, name: doc.data().name });
  });

  setOptions(options);
}

export async function getComplexesInput(setOptions) {
  const collectionRef = await getDocs(collection(db, "complexes"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getBuildings(setOptions) {
  const buildings = query(collectionGroup(db, "buildings"));

  const querySnapshot = await getDocs(buildings);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address
    });
  });

  setOptions(options);
}

export async function getBuilding(col, uid, setBuilding, setComplex) {
  const buildings = query(
    collectionGroup(db, col),
  );
  const querySnapshot = await getDocs(buildings);

  const building = await querySnapshot.docs.filter((doc) => doc.id === uid);
  
  setBuilding({id: building[0].id, name: building[0].data().name, address: building[0].data().address});

  const complex = await getDoc(doc(db, "complexes", building[0].ref.parent.parent.id));

  setComplex([{value: complex.id, label: complex.data().name}]);

}

export async function addBuilding(col, cuid, subcol, data) {
  //col = complexes
  //cuid = id of complex
  //subcol = subcollection "buildings"

  const docRef = await addDoc(collection(db, col, cuid, subcol), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function updateBuilding(col, cuid, subcol, buid, data) {
  //col = complexes
  //cuid = id of complex
  //subcol = subcollection "buildings"
  //buid = id of buildig to be updated

  await updateDoc(doc(db, col, cuid, subcol, buid), data);
}
