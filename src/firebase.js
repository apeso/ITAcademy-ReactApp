import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {getAuth,setPersistence} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCS27Ojeb67dvWud_TPH1y_Dm6Bhr3TxJU",
    authDomain: "reacttecajprojekt.firebaseapp.com",  
    databaseURL: "https://reacttecajprojekt-default-rtdb.europe-west1.firebasedatabase.app",  
    projectId: "reacttecajprojekt", 
    storageBucket: "reacttecajprojekt.appspot.com", 
    messagingSenderId: "596232974392", 
    appId: "1:596232974392:web:e7a84060a1d97c3017f6cd"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);
  const firestore= getFirestore(app);

  export {auth, firestore};
  