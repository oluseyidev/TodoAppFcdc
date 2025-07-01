// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByYU9l2NISjg3UMT-bKOSW4NPso1DEItk",
    authDomain: "todoapp-cd6e5.firebaseapp.com",
    projectId: "todoapp-cd6e5",
    storageBucket: "todoapp-cd6e5.firebasestorage.app",
    messagingSenderId: "11259188295",
    appId: "1:11259188295:web:f8e69819cca8fe94944d62",
    measurementId: "G-BZT7L5KYBQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
