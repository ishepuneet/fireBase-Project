import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAE3GloG7jjS2M9HJ90CEA77Bad4wSq_-k",
  authDomain: "wslc-260-3b0d8.firebaseapp.com",
  projectId: "wslc-260-3b0d8",
  storageBucket: "wslc-260-3b0d8.appspot.com",
  messagingSenderId: "459385326881",
  appId: "1:459385326881:web:f11aa0a57a368d0dca8260",
  measurementId: "G-4Y0HRZF75D"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);