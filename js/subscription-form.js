// File: js/subscription-form.js

import { auth, db } from "./firebase-init.js";
import {
  onAuthStateChanged,
  // note: we don’t need signOut here
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Elements
const form           = document.getElementById("subscription-form");
const msgEl          = document.getElementById("subscription-message");
const fullNameField  = document.getElementById("fullName");
const emailField     = document.getElementById("email");
const phoneField     = document.getElementById("phone");
const deliveryField  = document.getElementById("delivery");
const streetField    = document.getElementById("street");
const cityField      = document.getElementById("city");
const stateField     = document.getElementById("state");
const zipField       = document.getElementById("zip");
const notesField     = document.getElementById("notes");

// Track whether user already has a subscription
let subscriptionExists = false;

// Hide form until we confirm auth state
form.style.display = "none";
msgEl.textContent  = "";

// 1️⃣ Check auth on load
onAuthStateChanged(auth, async user => {
  if (!user || !user.emailVerified) {
    // Not signed in or email not verified → redirect to account page
    window.location.href = "account.html";
    return;
  }

  // Signed in and verified → show form
  form.style.display = "block";
  msgEl.textContent  = "";
  emailField.value   = user.email;

  // Pre-fill existing subscription if any
  try {
    const ref  = doc(db, "subscriptions", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      subscriptionExists = true;
      const data = snap.data();
      fullNameField.value = data.fullName || "";
      phoneField.value    = data.phone    || "";
      deliveryField.value = data.delivery || "Every 2 Weeks";
      streetField.value   = data.street   || "";
      cityField.value     = data.city     || "";
      stateField.value    = data.state    || "";
      zipField.value      = data.zip      || "";
      notesField.value    = data.notes    || "";
    }
  } catch (error) {
    console.error("Error loading subscription:", error);
    msgEl.style.color   = "red";
    msgEl.textContent   = "❌ Failed to load your subscription.";
  }
});

// 2️⃣ Handle form submission
form.addEventListener("submit", async e => {
  e.preventDefault();
  msgEl.textContent = "";
  msgEl.style.color = "";

  const user = auth.currentUser;
  if (!user || !user.emailVerified) {
    window.location.href = "account.html";
    return;
  }

  // Gather payload
  const payload = {
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
  if (!subscriptionExists) {
    payload.createdAt = serverTimestamp();
  }

  // Write to Firestore
  try {
    const ref = doc(db, "subscriptions", user.uid);
    await setDoc(ref, payload, { merge: true });
    subscriptionExists   = true;
    msgEl.style.color    = "green";
    msgEl.textContent    = "✅ Subscription saved.";
  } catch (error) {
    console.error("Error saving subscription:", error);
    msgEl.style.color    = "red";
    msgEl.textContent    = `❌ ${error.message}`;
  }
});
