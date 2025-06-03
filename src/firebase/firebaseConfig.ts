// src/firebase/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQIXq--dvC1-0KopFWuASCAYcKH3LUFC",
  authDomain: "hatirlaticiapp-8100d.firebaseapp.com",
  projectId: "hatirlaticiapp-8100d",
  storageBucket: "hatirlaticiapp-8100d.appspot.com",
  messagingSenderId: "845052293821",
  appId: "1:845052293821:web:04e3d78184cb8d5d5497d4",
  measurementId: "G-5HZQYX930V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
