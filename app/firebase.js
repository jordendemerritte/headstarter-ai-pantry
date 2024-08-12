// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJkKrPx6qhr_V9SHrcRf6A85RUtCb_R7Y",
  authDomain: "expense-tracker-25a86.firebaseapp.com",
  projectId: "expense-tracker-25a86",
  storageBucket: "expense-tracker-25a86.appspot.com",
  messagingSenderId: "107912633315",
  appId: "1:107912633315:web:48e6b28392337776f35ed6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);