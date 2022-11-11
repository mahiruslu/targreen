import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAR8gk0yzKYaaaXt-QLpkTiZLV9YZKJ87I",
  authDomain: "targreen-1f1d9.firebaseapp.com",
  databaseURL: "https://targreen-1f1d9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "targreen-1f1d9",
  storageBucket: "targreen-1f1d9.appspot.com",
  messagingSenderId: "526744977279",
  appId: "1:526744977279:web:fb4dc742e16fbd1586a44a"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();

// console.log(`analytics: ${JSON.stringify(analytics)}`);
// console.log(`database: ${JSON.stringify(database)}`);