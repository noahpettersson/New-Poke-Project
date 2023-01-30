// Import the functions you need from the SDKs you need
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/firestore';
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore();
export default app;

const provider = new GoogleAuthProvider();


export const signInWGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
    }).catch((error)=>{console.log(error)})
};