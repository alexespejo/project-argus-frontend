import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK0toJ7D9_Jlt00PDemj16hi4g33-3Diw",
  authDomain: "fir-py-c779c.firebaseapp.com",
  databaseURL: "https://fir-py-c779c-default-rtdb.firebaseio.com",
  projectId: "fir-py-c779c",
  storageBucket: "fir-py-c779c.appspot.com",
  messagingSenderId: "450959185447",
  appId: "1:450959185447:web:f56bdb0d4b8d54642e2002",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
