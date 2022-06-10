import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function getUnitsList(setOptions) {
  const units = query(collectionGroup(db, "units"));
  const querySnapshot = await getDocs(units);

  const buildings = {};
  const buildingsQuery = query(collectionGroup(db, "buildings"));
  const buildingsSnap = await getDocs(buildingsQuery);
  buildingsSnap.forEach((doc) => {
    buildings[doc.id] = doc.data().name;
  });

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      id: doc.id,
      building: buildings[doc.ref.parent.parent.id],
      number: doc.data().number,
      residents: doc.data().residents?.length ? doc.data().residents.length : 0,
      vehicles: doc.data().vehicles?.length ? doc.data().vehicles.length : 0,
      visitors: doc.data().authorizedVisitors?.length
        ? doc.data().authorizedVisitors.length
        : 0,
      path: doc.ref.path,
    });
  });
  setOptions(options);
}

export async function getUnit(path, setOptions) {
  const unitSnap = await getDoc(doc(db, path));

  if (unitSnap.exists()) {
    setOptions(unitSnap.data());
  } else {
    console.log("Document doesn't exists!");
  }
}

// Find a better way to create nested documents @stained9000
export async function addUnit(data) {
  //col = complexes
  //cuid = id of complex
  //subcol = subcollection "buildings"
  const buildings = query(collectionGroup(db, "buildings"));
  const querySnapshot = await getDocs(buildings);

  const building = await querySnapshot.docs.filter(
    (doc) => doc.id === data.building[0].value
  );

  const path = `${building[0].ref.path}/units`;

  const docRef = await addDoc(collection(db, path), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function updateUnit(path, data) {
  await updateDoc(doc(db, path), data);

  console.log("Document updated with ID: ", path);
}

export async function getBuildingInput(setOptions) {
  const buildings = query(collectionGroup(db, "buildings"));
  const querySnapshot = await getDocs(buildings);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getResidentsInput(setOptions) {
  const collectionRef = await getDocs(collection(db, "residents"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getResidentVehiclesInput(setOptions) {
  const vehicles = query(
    collection(db, "vehicles"),
    where("type", "==", "resident")
  );
  const querySnapshot = await getDocs(vehicles);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.id,
      label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${
        doc.data().year
      }`,
    });
  });

  setOptions(options);
}

export async function getVisitorsInput(setOptions) {
  const collectionRef = await getDocs(collection(db, "visitors"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name, path: doc.ref.path });
  });

  setOptions(options);
}

export async function getResidentPetsInput(setOptions) {
  const pets = query(collection(db, "pets"));
  const querySnapshot = await getDocs(pets);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}
