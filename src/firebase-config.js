// Check the version of Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAOeJT1HeBS7KtV-tN5N7FxMJV4K6gqcwo",
  authDomain: "project-tracker-7df16.firebaseapp.com",
  databaseURL: "https://project-tracker-7df16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tracker-7df16",
  storageBucket: "project-tracker-7df16.appspot.com",
  messagingSenderId: "913906801328",
  appId: "1:913906801328:web:2cf4384872069e93bbf975",
  measurementId: "G-NK96XLZP51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
