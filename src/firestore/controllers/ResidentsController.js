import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function getSelectedResident(
  uid,
  setSelectedUser,
  setSelectedFields
) {
  const residentSnap = await getDoc(doc(db, "residents", uid));

  if (residentSnap.exists()) {
    let selectedRedisentData = { id: residentSnap.id, ...residentSnap.data() };

    setSelectedUser(selectedRedisentData);

    setSelectedFields({
      Email: selectedRedisentData.email,
      Casa: selectedRedisentData.contact.home,
      Mobil: selectedRedisentData.contact.mobile,
      Trabajo: selectedRedisentData.contact.work,
    });
  } else {
    console.log("No such document exists!");
  }
}

export async function getResidentSearchResults(
  searchInputRef,
  setDirectory,
  setResidentCount
) {
  let count = 0;
  const residentsSnap = await getDocs(
    query(
      collection(db, "residents"),
      where("name", ">=", searchInputRef.current.value),
      where("name", "<=", searchInputRef.current.value + "\uf8ff")
    )
  );

  const newDirectory = residentsSnap.docs.reduce((acc, doc) => {
    const firstLetter = doc.data().name.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    acc[firstLetter].push({ ...doc.data(), id: doc.id });
    count++;

    return acc;
  }, {});

  setDirectory(newDirectory);
  setResidentCount(count);
}

export async function getResidentDirectory(
  setDirectory,
  setResidentCount,
  setSelectedResident,
  setSelectedFields
) {
  const newDirectory = {};
  let count = 0;
  let newSelectedResident = {};

  const residentsSnap = await getDocs(collection(db, "residents"));

  residentsSnap.docs.map((doc) => {
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
  }, []);

  newSelectedResident = newDirectory[Object.keys(newDirectory)[0]][0];

  setDirectory(newDirectory);
  setResidentCount(count);
  setSelectedResident(newSelectedResident);
  setSelectedFields({
    Email: newSelectedResident.email,
    Casa: newSelectedResident.contact.home,
    Mobil: newSelectedResident.contact.mobile,
    Trabajo: newSelectedResident.contact.work,
  });
}

export async function addResident(data) {
  const docRef = await addDoc(collection(db, "residents"), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function getResident(uid, setResident, setEmergencyInputFields) {
    console.log(uid);
  const residentSnap = await getDoc(doc(db, "residents", uid));

  if (residentSnap.exists()) {
    let residentData = { id: residentSnap.id, ...residentSnap.data() };

    setResident(residentData);

    setEmergencyInputFields(residentData.contact.emergency);
  } else {
    console.log("No such document exists!");
  }
}

export async function updateResident(uid, data) {
    await updateDoc(doc(db, "residents", uid), data);
  
    console.log("Document updated with ID: ", uid);
  }
