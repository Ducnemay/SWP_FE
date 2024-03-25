// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfNy7Pg5_DiZWJ0f0bm3vqjJTd7NC-Rgc",
    authDomain: "bscswp.firebaseapp.com",
    projectId: "bscswp",
    storageBucket: "bscswp.appspot.com",
    messagingSenderId: "53221642235",
    appId: "1:53221642235:web:42c4f40de5ac8e3a75055e",
    measurementId: "G-E35DJ8F4Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);