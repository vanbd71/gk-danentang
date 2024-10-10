// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD50HGw2C5-GrxDgBaBROIz0l9w9gIhATA",
  authDomain: "giuaki-bf018.firebaseapp.com",
  projectId: "giuaki-bf018",
  storageBucket: "giuaki-bf018.appspot.com",
  messagingSenderId: "1005719841501",
  appId: "1:1005719841501:web:604c8d4132ce745a444934",
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
