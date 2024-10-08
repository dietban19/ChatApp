import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_API_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const det = firebaseConfig;
export const auth = getAuth(app);
const storage = getStorage(app);
export const datadb = firebaseConfig;

export default app;
