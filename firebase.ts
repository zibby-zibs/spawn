// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsMkWuhQSd97rIa9TLedH_XNONEGo07RE",
  authDomain: "spawn-40749.firebaseapp.com",
  projectId: "spawn-40749",
  storageBucket: "spawn-40749.appspot.com",
  messagingSenderId: "24907238022",
  appId: "1:24907238022:web:00fc7ddccf4f5af0c29f07"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db }