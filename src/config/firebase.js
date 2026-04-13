import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhAAjCJ834XLvl39Wnizom6fx5lNP54Hk",
    authDomain: "twinkle-and-trend.firebaseapp.com",
    projectId: "twinkle-and-trend",
    storageBucket: "twinkle-and-trend.firebasestorage.app",
    messagingSenderId: "470381728295",
    appId: "1:470381728295:web:105c83ac0e7170dbc33402",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();