import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import db from "../FirestoreConfig";

export async function addComplex(data) {
  const docRef = await addDoc(collection(db, "complexes"), data);

  console.log("Document written with ID: ", docRef.id);
}

export async function getComplex(uid, setComplex) {
    const docRef = doc(db, "complexes", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const doc = { id: docSnap.id, name: docSnap.data().name };

      setComplex(doc);

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

export async function getComplexes(setOptions) {
  const collectionRef = await getDocs(collection(db, "complexes"));

  const options = [];

  collectionRef.forEach((doc) => {
    options.push({ id: doc.id, name: doc.data().name });
  });

  setOptions(options);
}

export async function updateComplex(uid, data) {
    await updateDoc(doc(db, "complexes", uid), data);
  
    console.log("Document updated with ID: ", uid);
  }
