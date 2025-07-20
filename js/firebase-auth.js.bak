// File: js/firebase-auth.js
import { auth } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const forgotPasswordLink = document.getElementById("forgot-password");
const resendVerificationLink = document.getElementById("send-verification-link");
const createAccountLink = document.getElementById("create-account-link");
const signOutButton = document.getElementById("sign-out");
const message = document.getElementById("account-message");

// 🔐 登入處理
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
    } catch (err) {
      message.textContent = `❌ Login failed: ${err.message}`;
    }
  });
}

// 🧾 註冊新帳號（點擊 "Create Account"）
if (createAccountLink) {
  createAccountLink.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      message.textContent = "⚠️ Please enter both email and password to register.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      message.textContent = "📧 Account created. Please check your email to verify your address.";
    } catch (error) {
      message.textContent = `❌ Registration failed: ${error.message}`;
    }
  });
}

// 🔁 補寄驗證信
if (resendVerificationLink) {
  resendVerificationLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        message.textContent = "📧 Verification email sent again.";
      } catch (error) {
        message.textContent = `❌ Error: ${error.message}`;
      }
    }
  });
}

// 🔐 忘記密碼
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (!email) {
      message.textContent = "⚠️ Please enter your email to reset password.";
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      message.textContent = "📧 Password reset email sent.";
    } catch (error) {
      message.textContent = `❌ Error: ${error.message}`;
    }
  });
}

// 🚪 登出
if (signOutButton) {
  signOutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      location.reload();
    } catch (error) {
      message.textContent = `❌ ${error.message}`;
    }
  });
}

// 🧭 自動偵測登入狀態
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    message.textContent = `✅ Logged in as ${user.email}`;
    if (loginForm) loginForm.style.display = "none";
    if (signOutButton) signOutButton.style.display = "inline-block";
    if (resendVerificationLink) resendVerificationLink.style.display = "none";
  }
});
