// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv7v29-WVanKVErtVXXdJ85FCSktlKJSs",
  authDomain: "realtor-project-clone.firebaseapp.com",
  projectId: "realtor-project-clone",
  storageBucket: "realtor-project-clone.appspot.com",
  messagingSenderId: "84015367340",
  appId: "1:84015367340:web:9ee6a22193f35c85504b09"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()