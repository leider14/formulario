// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-yCOt8Cc0cNtCxwXrQZLrG3vvYgX5nc8",
  authDomain: "formularios-9ecc5.firebaseapp.com",
  projectId: "formularios-9ecc5",
  storageBucket: "formularios-9ecc5.firebasestorage.app",
  messagingSenderId: "358726414251",
  appId: "1:358726414251:web:fb25ed639527502eb86cee"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };