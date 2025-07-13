// File: firebase-init.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// If using other Firebase services like Auth, Firestore, etc., import them here
// e.g., import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANBt_Iu5eow5eQ8racvqtXDbqV1cP8b6Y",
  authDomain: "miru-coffee.firebaseapp.com",
  projectId: "miru-coffee",
  storageBucket: "miru-coffee.firebasestorage.app",
  messagingSenderId: "478375119822",
  appId: "1:478375119822:web:b29ca2b1686b2ab59af99f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export app for use in other scripts if needed
export default app;
