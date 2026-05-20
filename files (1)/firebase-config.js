// firebase-config.js — FitTrack
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';

export const firebaseConfig = {
  apiKey: "AIzaSyDDUoIkszKgK_9Yu5wHlqZ9IifIQWnhvv0",
  authDomain: "fittrack-fb939.firebaseapp.com",
  projectId: "fittrack-fb939",
  storageBucket: "fittrack-fb939.firebasestorage.app",
  messagingSenderId: "828892951236",
  appId: "1:828892951236:web:ffe330ca7fe0cc6dae0f91",
  measurementId: "G-V5WF93CBPG"
};

export const app = initializeApp(firebaseConfig);
