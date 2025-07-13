// File: js/firebase-auth.js
import { auth } from "./firebase-init.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const resetPasswordLink = document.getElementById("reset-password-link");
const signOutButton = document.getElementById("sign-out");
const message = document.getElementById("account-message");
const resendVerificationLink = document.getElementById("send-verification-link");

// 登入表單送出
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          message.textContent = `✅ Logged in as ${user.email}`;
          loginForm.style.display = "none";
          signOutButton.style.display = "inline-block";
          resendVerificationLink.style.display = "none";
        } else {
          message.textContent = "⚠️ Please verify your email address.";
          resendVerificationLink.style.display = "inline-block";
        }
      })
      .catch((error) => {
        message.textContent = `❌ Login failed: ${error.message}`;
      });
  });
}

// 忘記密碼
if (resetPasswordLink) {
  resetPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (!email) {
      message.textContent = "⚠️ Please enter your email to reset password.";
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.textContent = "📧 Password reset email sent.";
      })
      .catch((error) => {
        message.textContent = `❌ Error: ${error.message}`;
      });
  });
}

// 再寄一次驗證信
if (resendVerificationLink) {
  resendVerificationLink.addEventListener("click", (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          message.textContent = "📧 Verification email sent again.";
        })
        .catch((error) => {
          message.textContent = `❌ ${error.message}`;
        });
    }
  });
}

// 登出
if (signOutButton) {
  signOutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        message.textContent = `❌ ${error.message}`;
      });
  });
}

// 自動偵測登入狀態
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    message.textContent = `✅ Logged in as ${user.email}`;
    if (loginForm) loginForm.style.display = "none";
    if (signOutButton) signOutButton.style.display = "inline-block";
  }
});
