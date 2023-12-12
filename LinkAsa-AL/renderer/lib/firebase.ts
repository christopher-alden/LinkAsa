import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYi6MI1DfC9lHTDnJKWh5UR-AzQE3bnkc",
  authDomain: "linkasa-d28fc.firebaseapp.com",
  projectId: "linkasa-d28fc",
  storageBucket: "linkasa-d28fc.appspot.com",
  messagingSenderId: "759030673901",
  appId: "1:759030673901:web:016483d0626a99727a77e4",
  measurementId: "G-QXE4Q0EG5E"
};


const clientApp = initializeApp(firebaseConfig);
const clientAuth = getAuth(clientApp)
const clientDb = getFirestore(clientApp);


export { clientApp, clientDb, clientAuth };