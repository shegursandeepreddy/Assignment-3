import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqVn8ZDPUAsHQ0KdXp1yVITF2tKXGkDnA",
  authDomain: "dashboard-fc8bc.firebaseapp.com",
  projectId: "dashboard-fc8bc",
  storageBucket: "dashboard-fc8bc.appspot.com",
  messagingSenderId: "182903885011",
  appId: "1:182903885011:web:8c9036090add4484739826",
  measurementId: "G-32WFWD3EED"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
