import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {REACT_APP_APP_ID, REACT_APP_SENDER, REACT_APP_STORAGE, REACT_APP_API_KEY, REACT_APP_PROJECT_ID,REACT_APP_AUTH_DOMAIN} from '@env'


// private configs. hidden in .env.
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE,
  messagingSenderId: REACT_APP_SENDER,
  appId: REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
export const db = getFirestore(app)

// initialize Auth
export const auth = getAuth()