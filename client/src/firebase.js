// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-app-fbb56.firebaseapp.com",
  projectId: "my-app-fbb56",
  storageBucket: "my-app-fbb56.appspot.com",
  messagingSenderId: "346640543321",
  appId: "1:346640543321:web:9c694c3a0fc7c5b78a8b48",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
