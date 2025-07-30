import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdIr-TCQJcV7E4AdeYTJgoSZsEvu2BZj8",
  authDomain: "my-wishlist-44734.firebaseapp.com",
  databaseURL: "https://my-wishlist-44734-default-rtdb.firebaseio.com",
  projectId: "my-wishlist-44734",
  storageBucket: "my-wishlist-44734.firebasestorage.app",
  messagingSenderId: "810601711877",
  appId: "1:810601711877:web:611ac14c46b817fa400f6c",
  measurementId: "G-9V3TD9XX4S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);