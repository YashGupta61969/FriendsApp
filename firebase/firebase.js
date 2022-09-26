import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// private configs. hidden in .env.
const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_API,
  authDomain:  process.env.REACT_APP_AUTH_DOMAIL,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE,
  messagingSenderId:  process.env.REACT_APP_SENDER,
  appId:process.env.REACT_APP_APP_ID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
export const db = getFirestore(app)

// initialize Auth
export const auth = getAuth()