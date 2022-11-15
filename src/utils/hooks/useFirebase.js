import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHTlDnSq523cRI897tskKu7vBqoW-8EEs",
  authDomain: "targreen-1cf5e.firebaseapp.com",
  databaseURL:
    "https://targreen-1cf5e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "targreen-1cf5e",
  storageBucket: "targreen-1cf5e.appspot.com",
  messagingSenderId: "60603569813",
  appId: "1:60603569813:web:50df4fb9c77f3f23c7ed9c",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();

// console.log(`analytics: ${JSON.stringify(analytics)}`);
// console.log(`database: ${JSON.stringify(database)}`);
