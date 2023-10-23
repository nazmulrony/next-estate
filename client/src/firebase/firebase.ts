// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "next-estate-1ab37.firebaseapp.com",
    projectId: "next-estate-1ab37",
    storageBucket: "next-estate-1ab37.appspot.com",
    messagingSenderId: "976762761705",
    appId: "1:976762761705:web:3cacca1baf147675cfdb78",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
