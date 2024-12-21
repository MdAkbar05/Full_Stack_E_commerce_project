// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF2zip7Dy95XTH1V1f_5TsY4fjx5tkp8c",
  authDomain: "sagor-department.firebaseapp.com",
  projectId: "sagor-department",
  storageBucket: "sagor-department.appspot.com",
  messagingSenderId: "679394228719",
  appId: "1:679394228719:web:1ea73599803aeaa7b75e1a",
  measurementId: "G-1L2R15BEXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Facebook Auth instance
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
