// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "screenshare-ebd3a.firebaseapp.com",
  projectId: "screenshare-ebd3a",
  storageBucket: import.meta.env.VITE_FIREABSE_STORAGEBUCKET,
  messagingSenderId: "155715376054",
  appId: import.meta.env.VITE_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;