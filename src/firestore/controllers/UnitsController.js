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

export async function getUnitsList(setOptions, complex) {
  const units = query(
    collectionGroup(db, "units"),
    where("complex", "==", complex)
  );
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
  const complex = building[0]?.data().complex;

  data["complex"] = complex;

  const docRef = await addDoc(collection(db, path), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function updateUnit(path, data) {
  await updateDoc(doc(db, path), data);

  console.log("Document updated with ID: ", path);
}

export async function getBuildingInput(setOptions, complex) {
  const buildings = query(
    collectionGroup(db, "buildings"),
    where("complex", "==", complex)
  );
  const querySnapshot = await getDocs(buildings);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

export async function getResidentsInput(setOptions, complex) {
  const collectionRef = await getDocs(
    query(collection(db, "residents"), where("complex", "==", complex))
  );

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name, mobile: doc.data().contact.mobile});
  });

  setOptions(options);
}

export async function getResidentVehiclesInput(setOptions, complex) {
  const vehicles = query(
    collection(db, "vehicles"),
    where("complex", "==", complex)
  );
  const querySnapshot = await getDocs(vehicles);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.id,
      label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${
        doc.data().year
      }`,
      path: doc.ref.path,
    });
  });

  setOptions(options);
}

export async function getVisitorsInput(setOptions, complex) {
  const collectionRef = await getDocs(
    query(collection(db, "visitors"), where("complex", "==", complex))
  );

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({
      value: doc.id,
      label: doc.data().name,
      path: doc.ref.path,
      identification: doc.data().identification,
      type: doc.data().type
    });
  });

  setOptions(options);
}

export async function getResidentPetsInput(setOptions, complex) {
  const pets = query(collection(db, "pets"), where("complex", "==", complex));
  const querySnapshot = await getDocs(pets);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}
