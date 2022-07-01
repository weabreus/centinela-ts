import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function getVisitorsInput(setOptions) {
  const collectionRef = await getDocs(collection(db, "visitors"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name, path: doc.ref.path });
  });

  setOptions(options);
}

export async function getSelectedVisitor(
  uid,
  setSelectedUser,
  setSelectedFields
) {
  const docRef = doc(db, "visitors", uid);
  const visitorSnap = await getDoc(docRef);

  if (visitorSnap.exists()) {
    const visitorData = { id: visitorSnap.id, ...visitorSnap.data() };

    setSelectedUser(visitorData);
    setSelectedFields({ Identificación: visitorData.identification });
  } else {
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

export async function getVisitorsSearch(
  searchInputRef,
  setDirectory,
  setVisitorCount,
  complex
) {
  let count = 0;
  const data = await getDocs(
    query(
      collection(db, "visitors"),
      where("complex", "==", complex)
      // where("name", ">=", searchInputRef.current?.value),
      // where("name", "<=", searchInputRef.current?.value + "\uf8ff")
    )
  );

  const visitors = data.docs.filter((doc) =>
    doc
      .data()
      .name.toLowerCase()
      .includes(searchInputRef.current?.value.toLowerCase())
  );

  const newDirectory = visitors.reduce((acc, doc) => {
    const firstLetter = doc.data().name.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    acc[firstLetter].push({ ...doc.data(), id: doc.id });
    count++;

    return acc;
  }, {});

  setDirectory(newDirectory);
  setVisitorCount(count);
}

export async function getVisitorsDirectory(
  setDirectory,
  setVisitorCount,
  setSelectedVisitor,
  setSelectedFields,
  complex
) {
  const newDirectory = {};
  let count = 0;
  let newSelectedUser = {};

  const usersCollectionRef = query(
    collection(db, "visitors"),
    where("complex", "==", complex)
  );
  const data = await getDocs(usersCollectionRef);

  data.docs.map((doc) => {
    if (!newDirectory.hasOwnProperty(doc.data().name.charAt(0).toUpperCase())) {
      newDirectory[doc.data().name.charAt(0).toUpperCase()] = [];

      newDirectory[doc.data().name.charAt(0).toUpperCase()].push({
        ...doc.data(),
        id: doc.id,
      });
      count++;
    } else {
      newDirectory[doc.data().name.charAt(0).toUpperCase()].push({
        ...doc.data(),
        id: doc.id,
      });
      count++;
    }

    return doc;
  }, []);

  newSelectedUser = newDirectory[Object.keys(newDirectory)[0]][0];

  setDirectory(newDirectory);
  setVisitorCount(count);
  setSelectedVisitor(newSelectedUser);
  setSelectedFields({
    Identificación: newSelectedUser.identification,
  });
}

export async function addVisitor(data) {
  data["complex"] = data.complexInput[0].value;
  const docRef = await addDoc(collection(db, "visitors"), data);

  console.log("Document written with ID: ", docRef.id);
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
      label: `(${doc.data().plate}) ${doc.data().make} ${doc.data().model} ${
        doc.data().year
      }`,
      path: "vehicles/" + doc.id,
    });
  });

  setOptions(options);
}
