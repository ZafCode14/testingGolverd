// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFJ569jdvjS_fI1W1aNV14soRbjlOsWyg",
  authDomain: "mangam-2023.firebaseapp.com",
  projectId: "mangam-2023",
  storageBucket: "mangam-2023.appspot.com",
  messagingSenderId: "902408796545",
  appId: "1:902408796545:web:ea66a0cdcc30bd5d2a5080",
  measurementId: "G-YY35XF26EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, firestore, storage };