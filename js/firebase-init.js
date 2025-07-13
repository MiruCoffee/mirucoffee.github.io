// File: firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANBt_Iu5eow5eQ8racvqtXDbqV1cP8b6Y",
  authDomain: "miru-coffee.firebaseapp.com",
  projectId: "miru-coffee",
  storageBucket: "miru-coffee.appspot.com",
  messagingSenderId: "478375119822",
  appId: "1:478375119822:web:b29ca2b1686b2ab59af99f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
