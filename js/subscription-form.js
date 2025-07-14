// File: js/subscription-form.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import app from "./firebase-init.js";

const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("subscription-form");
const statusField = document.getElementById("status");
const frequencyField = document.getElementById("frequency");
const addressField = document.getElementById("deliveryAddress");
const notesField = document.getElementById("notes");
const message = document.getElementById("form-message");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  if (user && user.emailVerified) {
    currentUser = user;
    const ref = doc(db, "subscriptions", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      frequencyField.value = data.frequency || "2weeks";
      addressField.value = data.deliveryAddress || "";
      notesField.value = data.notes || "";
      statusField.textContent = `Current status: ${data.status || "Active"}`;
    }
  } else {
    message.textContent = "⚠️ Please log in and verify your email first.";
    form.style.display = "none";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const ref = doc(db, "subscriptions", currentUser.uid);
  try {
    await setDoc(ref, {
      email: currentUser.email,
      frequency: frequencyField.value,
      deliveryAddress: addressField.value,
      notes: notesField.value,
      status: "Active"
    });
    message.textContent = "✅ Subscription info saved.";
  } catch (err) {
    message.textContent = `❌ Error: ${err.message}`;
  }
});
