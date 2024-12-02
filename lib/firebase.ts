import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "a-for-anime-app-ce02a.firebaseapp.com",
  databaseURL:
    "https://a-for-anime-app-ce02a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "a-for-anime-app-ce02a",
  storageBucket: "a-for-anime-app-ce02a.firebasestorage.app",
  messagingSenderId: "637067545117",
  appId: "1:637067545117:web:b4bf6d7fd20922236514f4",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
