// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArx-adHdWB1xA0SmK30B8dq5ZyYK5C6jU",
  authDomain: "buy-busy-9489b.firebaseapp.com",
  projectId: "buy-busy-9489b",
  storageBucket: "buy-busy-9489b.appspot.com",
  messagingSenderId: "537228972090",
  appId: "1:537228972090:web:a39ab3c89a369457cd6503",
  measurementId: "G-ECSPS85E6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
