// File: js/subscription-form.js

import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 表單與訊息顯示元素
const form  = document.getElementById("subscription-form");
const msgEl = document.getElementById("subscription-message");

// 對應到 HTML 中的欄位
const fullNameField = document.getElementById("fullName");
const emailField    = document.getElementById("email");
const phoneField    = document.getElementById("phone");
const deliveryField = document.getElementById("delivery");
const streetField   = document.getElementById("street");
const cityField     = document.getElementById("city");
const stateField    = document.getElementById("state");
const zipField      = document.getElementById("zip");
const notesField    = document.getElementById("notes");

// 預設隱藏表單，待驗證後再顯示
form.style.display = "none";

let hasSubscription = false;

// 監聽登入&驗證狀態
onAuthStateChanged(auth, async user => {
  if (!user || !user.emailVerified) {
    // 未登入或未驗證，自動跳轉到登入頁
    window.location.href = "account.html";
    return;
  }

  // 已驗證：顯示表單
  form.style.display = "block";
  msgEl.textContent = "";

  // 預填 email 欄位
  emailField.value = user.email;

  // 嘗試讀取既有訂閱
  const ref  = doc(db, "subscriptions", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    hasSubscription = true;
    const data = snap.data();
    fullNameField.value = data.fullName || "";
    phoneField.value    = data.phone    || "";
    deliveryField.value = data.delivery || "Every 2 Weeks";
    streetField.value   = data.street   || "";
    cityField.value     = data.city     || "";
    stateField.value    = data.state    || "";
    zipField.value      = data.zip      || "";
    notesField.value    = data.notes    || "";
  } else {
    hasSubscription = false;
  }
});

// 處理表單送出
form.addEventListener("submit", async e => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "subscriptions", user.uid);

  // 準備要寫入的資料
  const payload = {
    userId:    user.uid,
    fullName:  fullNameField.value.trim(),
    email:     emailField.value.trim(),
    phone:     phoneField.value.trim(),
    delivery:  deliveryField.value,
    street:    streetField.value.trim(),
    city:      cityField.value.trim(),
    state:     stateField.value.trim(),
    zip:       zipField.value.trim(),
    notes:     notesField.value.trim(),
    updatedAt: serverTimestamp()
  };
  // 若首次建立，加入 createdAt
  if (!hasSubscription) {
    payload.createdAt = serverTimestamp();
  }

  try {
    await setDoc(ref, payload, { merge: true });
    hasSubscription = true;
    msgEl.textContent = "✅ Subscription info saved.";
  } catch (err) {
    console.error(err);
    msgEl.textContent = "❌ Error: " + err.message;
  }
});
