// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moto-app-f2fc8.firebaseapp.com",
  projectId: "moto-app-f2fc8",
  storageBucket: "moto-app-f2fc8.appspot.com",
  messagingSenderId: "557304146214",
  appId: "1:557304146214:web:702521850d7817911c39e7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
