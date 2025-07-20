// File: js/customer-form.js

import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form  = document.getElementById("customer-form");
const msgEl = document.getElementById("form-message");

// 預設隱藏表單，待驗證後再顯示
form.style.display = "none";

let hasCustomer = false;

// 監聽登入與驗證狀態
onAuthStateChanged(auth, async (user) => {
  if (!user || !user.emailVerified) {
    // 未登入或未驗證，導回登入頁
    window.location.href = "account.html";
    return;
  }

  // 已驗證：顯示表單
  form.style.display = "block";

  // 嘗試讀取既有客戶資料
  const ref  = doc(db, "customers", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    hasCustomer = true;
    const data = snap.data();
    document.getElementById("full-name").value      = data.fullName      || "";
    document.getElementById("phone").value          = data.phone         || "";
    document.getElementById("company").value        = data.company       || "";
    document.getElementById("customer-type").value  = data.customerType  || "";
    document.getElementById("notes").value          = data.notes         || "";
  }
});

// 處理表單送出
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  // 準備要寫入的資料
  const payload = {
    uid:           user.uid,
    email:         user.email,
    fullName:      document.getElementById("full-name").value.trim(),
    phone:         document.getElementById("phone").value.trim(),
    company:       document.getElementById("company").value.trim(),
    customerType:  document.getElementById("customer-type").value,
    notes:         document.getElementById("notes").value.trim(),
    updatedAt:     serverTimestamp()
  };
  // 若首次建立，加上 createdAt
  if (!hasCustomer) {
    payload.createdAt = serverTimestamp();
  }

  try {
    await setDoc(doc(db, "customers", user.uid), payload, { merge: true });
    hasCustomer = true;
    msgEl.style.color   = "green";
    msgEl.textContent   = "✅ Customer information saved.";
  } catch (err) {
    console.error(err);
    msgEl.style.color   = "red";
    msgEl.textContent   = `❌ Error: ${err.message}`;
  }
});
