// File: js/auth.js
import app from './firebase-init.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const auth = getAuth(app);

// 登入事件
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    // 可導向其他頁面，例如 subscriptions.html
    window.location.href = "subscriptions.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// 忘記密碼
document.getElementById('forgot-password').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email) {
    alert("Please enter your email address first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    alert("Error: " + error.message);
  }
});
