import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBY7I4SRrKuoDg1Gr79chndlHd2sbSgbCc",
  authDomain: "know-your-fan-fcb57.firebaseapp.com",
  projectId: "know-your-fan-fcb57",
  storageBucket: "know-your-fan-fcb57.firebasestorage.app",
  messagingSenderId: "741621638395",
  appId: "1:741621638395:web:47495d7794d8cd0282fc5e",
  measurementId: "G-6N1CQMY4V9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };