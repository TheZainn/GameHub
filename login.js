// main.js (modular dan rapi, untuk login1.html)

function showToast(message, isError = false) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    console.error("Toast container not found!");
    return;
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add(isError ? "error" : "success");

  const iconClass = isError ? "bx bx-x-circle" : "bx bx-check-circle";

  toast.innerHTML = `
    <div class="message">
      <i class="icon ${iconClass}"></i>
      <span class="text">${message}</span>
    </div>
    <i class="close bx bx-x"></i>
  `;

  toastContainer.appendChild(toast);

  const timeout = setTimeout(() => {
    toast.remove();
  }, 3000);

  toast.querySelector(".close").addEventListener("click", () => {
    toast.remove();
    clearTimeout(timeout);
  });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSQmdLK-OiGoiLU64qVmGkL6yf9sAs2NA",
  authDomain: "gamehub-e45b5.firebaseapp.com",
  projectId: "gamehub-e45b5",
  storageBucket: "gamehub-e45b5.firebasestorage.app",
  messagingSenderId: "905356266272",
  appId: "1:905356266272:web:4fa688b805ea088ffd2545"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle password
document.querySelectorAll(".eye-icon").forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pwFields = eyeIcon.closest(".input-field").parentElement.querySelectorAll(".password");
    pwFields.forEach((password) => {
      password.type = password.type === "password" ? "text" : "password";
    });
    eyeIcon.classList.toggle("bx-hide");
    eyeIcon.classList.toggle("bx-show");
  });
});

// Toggle form
document.querySelectorAll(".link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".forms").classList.toggle("show-signup");
  });
});

// Signup
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = signupForm.querySelector(".username-input").value.trim();
  const email = signupForm.querySelector("input[type='email']").value.trim();
  const passwordInputs = signupForm.querySelectorAll("input.password");

  if (passwordInputs.length < 2) return showToast("Password fields missing", true);
  const password = passwordInputs[0].value;
  const confirmPassword = passwordInputs[1].value;

  if (!username || !email || !password || !confirmPassword)
    return showToast("Please fill all fields", true);
  if (password !== confirmPassword)
    return showToast("Passwords do not match", true);

  try {
    const usernameRef = doc(db, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);
    if (usernameSnap.exists()) return showToast("Username already taken", true);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      uid: user.uid
    });
    await setDoc(usernameRef, { uid: user.uid });

    await sendEmailVerification(user);
    showToast("Signup successful! Please check your email to verify your account.");
  } catch (err) {
    showToast(err.message, true);
  }
});

// Login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector("input[type='email']").value.trim();
  const password = loginForm.querySelector("input[type='password']").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      showToast("Please verify your email before logging in.", true);
      return;
    }

    showToast("Login successful");
    window.location.href = "index-logged.html";
  } catch (err) {
    showToast("Login failed", true);
  }
});

// Google Login
document.querySelectorAll(".google").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          username: user.displayName || "",
          uid: user.uid
        });
      }
      showToast("Logged in with Google!");
      window.location.href = "index-logged-in.html";
    } catch (err) {
      showToast("Google login failed", true);
    }
  });
});

