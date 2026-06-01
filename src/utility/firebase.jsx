// src/utility/firebase.js

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHbkewkZzhEssc8QJgAzgRjkFOVtwGv44",
  authDomain: "e-clone-b9678.firebaseapp.com",
  projectId: "e-clone-b9678",
  storageBucket: "e-clone-b9678.firebasestorage.app",
  messagingSenderId: "972257055830",
  appId: "1:972257055830:web:447ac745142ce9f18b57f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
