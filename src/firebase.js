// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_aQeK2DsUon8D9a0EBvFaXYgvcUzRtb8",
  authDomain: "cmotors-9c9fa.firebaseapp.com",
  projectId: "cmotors-9c9fa",
  storageBucket: "cmotors-9c9fa.appspot.com",
  messagingSenderId: "439199324580",
  appId: "1:439199324580:web:1669a0f7cec0062a2f4931",
  measurementId: "G-PV4PB1PD2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
