// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUzs12pC76Y1TgN1-MsBUM-e_dTicJYDo",
  authDomain: "prepcorn-6899d.firebaseapp.com",
  projectId: "prepcorn-6899d",
  storageBucket: "prepcorn-6899d.firebasestorage.app",
  messagingSenderId: "566688026191",
  appId: "1:566688026191:web:a883cf24c0183ac3cd643a",
  measurementId: "G-68BYKS88H9",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
