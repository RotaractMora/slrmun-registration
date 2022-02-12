import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDk6yKKttA-SF9vQeK3YFshKFQyMM_2ifk",
  authDomain: "slrmun-22.firebaseapp.com",
  databaseURL:
    "https://slrmun-22-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "slrmun-22",
  storageBucket: "gs://slrmun-22.appspot.com/",
  messagingSenderId: "132337541600",
  appId: "1:132337541600:web:943db57f77409341678b85",
});

export default app;
