import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFUEJM38SgRxxH1fdxfsdqiPbm3lX2pAU",
  authDomain: "sinms-77bb8.firebaseapp.com",
  projectId: "sinms-77bb8",
  storageBucket: "sinms-77bb8.firebasestorage.app",
  messagingSenderId: "1016967439935",
  appId: "1:1016967439935:web:6326032ee2ebfaf4c4fa8a",
  measurementId: "G-Y4J0EP02FD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);