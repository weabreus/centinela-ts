import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_AUTH,
    authDomain: "centinela-a4253.firebaseapp.com",
    projectId: "centinela-a4253",
    storageBucket: "centinela-a4253.appspot.com",
    messagingSenderId: "622794965416",
    appId: "1:622794965416:web:3eefaae3da61d33adb1d9d",
    measurementId: "G-PQCDWZ3L2G"
  };

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db: Firestore = getFirestore(app);

export default db;