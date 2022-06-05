// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcICVKdIA9PO0-ej6WCqd_75moBinlZI4",
  authDomain: "ingregastos.firebaseapp.com",
  projectId: "ingregastos",
  storageBucket: "ingregastos.appspot.com",
  messagingSenderId: "817066220655",
  appId: "1:817066220655:web:1315bf2cc4f1995901c19a",
  measurementId: "G-GHZJWF5GBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db, analytics}