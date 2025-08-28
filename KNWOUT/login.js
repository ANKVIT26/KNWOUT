// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwGLqWcnqQ3Lh5jXEc8P3sIQYmKW7a_XQ",
  authDomain: "weatherapp-199fc.firebaseapp.com",
  projectId: "weatherapp-199fc",
  storageBucket: "weatherapp-199fc.appspot.com",
  messagingSenderId: "916700486208",
  appId: "1:916700486208:web:150f89656dff4402659da5",
  measurementId: "G-DDQRR0D803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Login function
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Redirect to KNWOUT.html on successful login
      window.location.assign("KNWOUT.html");
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

// Signup function
window.signup = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Sign up successful!");
      // Optionally redirect or set state here
    })
    .catch((error) => {
      alert("Sign up failed: " + error.message);
    });
};
