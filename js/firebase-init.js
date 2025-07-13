// File: firebase-init.js

// 初始化 Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase 設定（來自你的 Firebase 控制台）
const firebaseConfig = {
  apiKey: "AIzaSyANBt_Iu5eow5eQ8racvqtXDbqV1cP8b6Y",
  authDomain: "miru-coffee.firebaseapp.com",
  projectId: "miru-coffee",
  storageBucket: "miru-coffee.appspot.com",
  messagingSenderId: "478375119822",
  appId: "1:478375119822:web:b29ca2b1686b2ab59af99f"
};

// 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// 初始化 Auth 並導出
export const auth = getAuth(app);
export default app;
