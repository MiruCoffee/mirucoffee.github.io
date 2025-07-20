// File: firebase-init.js

// 1. 匯入所需的 Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. 你的 Firebase 專案設定（從控制台複製）
const firebaseConfig = {
  apiKey: "AIzaSyANBt_Iu5eow5eQ8racvqtXDbqV1cP8b6Y",
  authDomain: "miru-coffee.firebaseapp.com",
  projectId: "miru-coffee",
  storageBucket: "miru-coffee.appspot.com",
  messagingSenderId: "478375119822",
  appId: "1:478375119822:web:b29ca2b1686b2ab59af99f"
};

// 3. 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// 4. 初始化各項服務
const auth = getAuth(app);
const db   = getFirestore(app);

// 5. 匯出給外部使用
export { app, auth, db };
