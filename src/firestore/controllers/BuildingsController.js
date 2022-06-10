import {
    addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import db from "../FirestoreConfig";

export async function addBuilding(cuid, data) {
  //cuid = id of complex
  const docRef = await addDoc(
    collection(db, "complexes", cuid, "buildings"),
    data
  );

  console.log("Document written with ID: ", docRef.id);
}

// Review better method @stained9000
export async function getBuildingFormData(uid, setBuilding, setComplex) {
    const buildings = query(collectionGroup(db, "buildings"));
    const querySnapshot = await getDocs(buildings);
  
    const building = querySnapshot.docs.filter((doc) => doc.id === uid);
  
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

export async function getComplexesInput(setOptions) {
  const collectionRef = await getDocs(collection(db, "complexes"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ value: doc.id, label: doc.data().name });
  });

  setOptions(options);
}

// Review method to delete building from old complex if complex changes @stained9000.
export async function updateBuilding(cuid, buid, data) {
    //col = complexes
    //cuid = id of complex
    //subcol = subcollection "buildings"
    //buid = id of buildig to be updated
  
    await updateDoc(doc(db, "complexes", cuid, "buildings", buid), data);
  }
