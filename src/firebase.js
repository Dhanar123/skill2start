// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI41qnUBUViyCX-wrjTrHG93uX-PJ2oVY",
  authDomain: "skill2start.firebaseapp.com",
  projectId: "skill2start",
  storageBucket: "skill2start.firebasestorage.app",
  messagingSenderId: "596839886821",
  appId: "1:596839886821:web:839466b13ccb0e7806090c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // ✅ Google Auth provider added
