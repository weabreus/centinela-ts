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
  collectionGroup,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export async function storeVisit(data) {

  if (!data.exitTimestamp) {
    delete data.exitTimestamp;
  }
  
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
    options.push({ value: doc.id, label: doc.data().name, path: doc.ref.path });
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
  const docRef = doc(db, "visitors", visitor);
  const docSnap = await getDoc(docRef);

  const vehicles = docSnap.data().vehicles;
  console.log(vehicles);
  setOptions(vehicles);
}

export async function getUnit(path, setOptions) {
  console.log(path);
  const unitSnap = await getDoc(doc(db, path));

  if (unitSnap.exists()) {
    setOptions(unitSnap.data());
  } else {
    console.log("Document doesn't exists!");
  }
}

export async function getDocument(col, uid) {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = { id: docSnap.id, ...docSnap.data() };

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
      address: doc.data().address,
    });
  });

  setOptions(options);
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

export async function getBuilding(col, uid, setBuilding, setComplex) {
  const buildings = query(collectionGroup(db, col));
  const querySnapshot = await getDocs(buildings);

  const building = await querySnapshot.docs.filter((doc) => doc.id === uid);

  setBuilding({
    id: building[0].id,
    name: building[0].data().name,
    address: building[0].data().address,
  });

  const complex = await getDoc(
    doc(db, "complexes", building[0].ref.parent.parent.id)
  );

  setComplex([{ value: complex.id, label: complex.data().name }]);
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
  console.log(options);
  setOptions(options);
}

export async function getResidentVehicles(setOptions) {
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

export async function getResidentPets(setOptions) {
  const pets = query(collection(db, "pets"));
  const querySnapshot = await getDocs(pets);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

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
  console.log(path);
  const docRef = await addDoc(collection(db, path), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function updateUnit(path, data) {
  await updateDoc(doc(db, path), data);

  console.log("Document updated with ID: ", path);
}

export async function getVehicles(setOptions) {
  const vehicles = query(collection(db, "vehicles"));

  const querySnapshot = await getDocs(vehicles);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ id: doc.id, ...doc.data() });
  });

  setOptions(options);
}

export async function addVehicle(data) {
  const vehicleRef = await addDoc(collection(db, "vehicles"), data);

  console.log("Created document with ID: ", vehicleRef.id);

  if (data.type === "resident") {
    const unit = await getDoc(doc(db, data.unit[0].path));

    await setDoc(doc(db, data.unit[0].path), {
      vehicles: [
        ...unit.data().vehicles,
        {
          value: vehicleRef.id,
          label: `(${data.plate}) ${data.make} ${data.model} ${data.year}`,
          path: vehicleRef.path,
        },
      ],
    });

    console.log("Updated document with path: ", data.unit[0].path);
  } else {
    const visitor = await getDoc(doc(db, data.visitor[0].path));

    await setDoc(doc(db, data.visitor[0].path), {
      vehicles: [
        ...visitor.data().vehicles,
        {
          value: vehicleRef.id,
          label: `(${data.plate}) ${data.make} ${data.model} ${data.year}`,
          path: vehicleRef.path,
        },
      ],
    });

    console.log("Updated document with path: ", data.visitor[0].path);
  }
}

export async function updateVehicle(uid, data) {
  await getDoc(doc(db, "vehicles", uid)).then(async (vehicle) => {
    if (vehicle.data().type === "resident") {
      //Avoid duplicates in units vehicles array.
      await getDoc(doc(db, vehicle.data().unit[0].path)).then(async (unit) => {
        console.log(unit.data());
        unit.data().vehicles.forEach(async (veh) => {
          console.log(veh);
          if (veh.path === "vehicles/" + uid) {
            await updateDoc(doc(db, vehicle.data().unit[0].path), {
              vehicles: arrayRemove(veh),
            });
          }
        });
      });
    } else {
      // Avoid duplicates in vehicles array.
      await getDoc(doc(db, vehicle.data().visitor[0].path)).then(
        async (visitor) => {
          visitor.data().vehicles.forEach(async (veh) => {
            console.log("vehicles/" + uid);
            if (veh.path === "vehicles/" + uid) {
              await updateDoc(doc(db, vehicle.data().visitor[0].path), {
                vehicles: arrayRemove(veh),
              });
            }
          });
        }
      );
    }
  });
  await setDoc(doc(db, "vehicles", uid), data);

  console.log("Updated document with ID: ", uid);

  if (data.type === "resident") {
    await updateDoc(
      doc(db, data.unit[0].path),
      {
        vehicles: arrayUnion({
          value: uid,
          label: `(${data.plate}) ${data.make} ${data.model} ${data.year}`,
          path: "vehicles/" + uid,
        }),
      },
      { merge: true }
    );

    console.log("Updated document with path: ", data.unit[0].path);
  } else {
    await updateDoc(
      doc(db, data.visitor[0].path),
      {
        vehicles: arrayUnion({
          value: uid,
          label: `(${data.plate}) ${data.make} ${data.model} ${data.year}`,
          path: "vehicles/" + uid,
        }),
      },
      { merge: true }
    );

    console.log("Updated document with path: ", data.visitor[0].path);
  }
}

export async function getAllVisitorVehicles(setOptions) {
  const vehiclesRef = query(
    collection(db, "vehicles"),
    where("type", "==", "visitor")
  );
  const querySnapshot = await getDocs(vehiclesRef);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.id,
      label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${doc.data().year}`,
      path: "vehicles/" + doc.id,
    });
  });

  setOptions(options);
}

export async function getLoggedUser(col, uid) {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = { 
      docId: docSnap.id,
      photo: docSnap.data().photo,
      };

    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

