import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { 
  getAuth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification,
  sendPasswordResetEmail, confirmPasswordReset, 
  signInWithPopup, GoogleAuthProvider 
} from "firebase/auth";
import { 
  getFirestore, setDoc, collection, doc, getDoc, getDocs, addDoc, deleteDoc,
  onSnapshot, query, where 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfMQruX9lFkInTTj65d6SzDYjiJnXhd1A",
  authDomain: "dineva-25544.firebaseapp.com",
  projectId: "dineva-25544",
  storageBucket: "dineva-25544.appspot.com",
  messagingSenderId: "193349534866",
  appId: "1:193349534866:web:ac2f00502950556828524b",
  measurementId: "G-VQLZQRCMJT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage();
export const provider = {
  google: new GoogleAuthProvider()
}
export { 
  setDoc, collection, doc, getDoc, getDocs, addDoc, onSnapshot, query, where, deleteDoc,
  getStorage,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, confirmPasswordReset, signInWithPopup, sendEmailVerification,
 };

export default app;