import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSCi1FlFmutIMNnn-fOZ5j-mflJ7QSE5c",
  authDomain: "bkurash-91942.firebaseapp.com",
  projectId: "bkurash-91942",
  storageBucket: "bkurash-91942.firebasestorage.app",
  messagingSenderId: "724022526532",
  appId: "1:724022526532:web:fb6145e3dd0092a166f211",
  measurementId: "G-WXFLXZLG2G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);