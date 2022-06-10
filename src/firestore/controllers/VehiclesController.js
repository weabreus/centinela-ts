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
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function getVehicles(setOptions) {
  const vehicles = query(collection(db, "vehicles"));

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

export async function addVehicle(data) {
  const vehicleRef = await addDoc(collection(db, "vehicles"), data);

  console.log("Created document with ID: ", vehicleRef.id);

  if (data.type === "resident") {
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
  } else {
    const visitor = await getDoc(doc(db, data.visitor[0].path));

    await updateDoc(doc(db, data.visitor[0].path), {
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
