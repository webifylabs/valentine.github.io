// Firebase Configuration
// Replace these values with your own Firebase project credentials
// Get them from: Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC5-t9geIEJTt70nbllOYD19VecPdfGUjg",
  authDomain: "valentine-wishes-e44ae.firebaseapp.com",
  projectId: "valentine-wishes-e44ae",
  storageBucket: "valentine-wishes-e44ae.firebasestorage.app",
  messagingSenderId: "531040697605",
  appId: "1:531040697605:web:143c5f15f5caeafbc74b6c",
  measurementId: "G-4YK4QH1EK0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export for use in other files
export { db };
