// File: js/customer-form.js
import { auth } from "./firebase-init.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const db = getFirestore();

const form = document.getElementById("customer-form");
const message = document.getElementById("form-message");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    currentUser = user;
  } else {
    message.textContent = "❌ You must be signed in with a verified account.";
    form.style.display = "none";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) return;

  const data = {
    uid: currentUser.uid,
    email: currentUser.email,
    fullName: document.getElementById("full-name").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    customerType: document.getElementById("customer-type").value,
    notes: document.getElementById("notes").value,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "customers", currentUser.uid), data);
    message.style.color = "green";
    message.textContent = "✅ Customer information saved.";
    form.reset();
  } catch (err) {
    message.style.color = "red";
    message.textContent = `❌ Error: ${err.message}`;
  }
});
