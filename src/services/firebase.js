// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAsKu6VeClc0JoMlZ0GMYyexggAcN580A",
  authDomain: "jimbot-3f25a.firebaseapp.com",
  databaseURL: "https://jimbot-3f25a-default-rtdb.firebaseio.com",
  projectId: "jimbot-3f25a",
  storageBucket: "jimbot-3f25a.firebasestorage.app",
  messagingSenderId: "949987932841",
  appId: "1:949987932841:web:fc502008dad884de9b87b8",
  measurementId: "G-113ZLNRXCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };