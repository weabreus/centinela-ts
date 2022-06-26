import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function getVehicles(setOptions, complex) {
  const vehicles = query(
    collection(db, "vehicles"),
    where("complex", "==", complex)
  );

  const querySnapshot = await getDocs(vehicles);

  const options = [];
  querySnapshot.forEach((doc) => {
    options.push({ id: doc.id, ...doc.data() });
  });

  setOptions(options);
}

export async function getVehicle(uid, setOptions) {
  const docRef = doc(db, "vehicles", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = { id: docSnap.id, ...docSnap.data() };

    setOptions(doc);

    return doc;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getVisitors(setOptions) {
  const collectionRef = await getDocs(collection(db, "visitors"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name, path: doc.ref.path });
  });

  setOptions(options);
}

export async function getUnits(setOptions, complex) {
  const units = query(
    collectionGroup(db, "units"),
    where("complex", "==", complex)
  );

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

export async function updateVehicle(uid, data) {
  await getDoc(doc(db, "vehicles", uid)).then(async (vehicle) => {
    //Avoid duplicates in units vehicles array.
    if (vehicle.data().unit.length > 0) {
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
    }
  });

  data["complex"] = data.complexInput[0].value;

  await setDoc(doc(db, "vehicles", uid), data);

  console.log("Updated document with ID: ", uid);

  if (data.unit.length > 0) {
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
  }
}

export async function addVehicle(data) {
  data["complex"] = data.complexInput[0].value;
  const vehicleRef = await addDoc(collection(db, "vehicles"), data);

  console.log("Created document with ID: ", vehicleRef.id);

  if (data.unit.length > 0) {
    const unit = await getDoc(doc(db, data.unit[0].path));

    await updateDoc(doc(db, data.unit[0].path), {
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
  }
}
