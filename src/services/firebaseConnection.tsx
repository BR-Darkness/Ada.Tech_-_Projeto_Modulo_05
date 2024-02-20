import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAwOXzHUhQJJBiqWBHyedh0JEgm0loQ8T0",
    authDomain: "marvel-heroes-7676f.firebaseapp.com",
    projectId: "marvel-heroes-7676f",
    storageBucket: "marvel-heroes-7676f.appspot.com",
    messagingSenderId: "358955976802",
    appId: "1:358955976802:web:5fd7e720d969fd14cca93b",
    measurementId: "G-HYWMP7J3BT"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth };