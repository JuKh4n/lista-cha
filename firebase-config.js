// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzQSqbRcIyhnDhCo0wPMM3IRFYPJbBrB8",
  authDomain: "lista-cha.firebaseapp.com",
  databaseURL: "https://lista-cha-default-rtdb.firebaseio.com",
  projectId: "lista-cha",
  storageBucket: "lista-cha.firebasestorage.app",
  messagingSenderId: "662121713326",
  appId: "1:662121713326:web:e5a2d5291085dcfb0ae73f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
