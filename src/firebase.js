import firebase from "firebase/app";
import "firebase/auth";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAfPXX7juNUAcLtMWa2ray1YqyMcd_TPYY",
    authDomain: "ecommerce-4ddd3.firebaseapp.com",
    projectId: "ecommerce-4ddd3",
    storageBucket: "ecommerce-4ddd3.appspot.com",
    messagingSenderId: "1055303207460",
    appId: "1:1055303207460:web:55c7ea3ca162d56af4e6b1",
    measurementId: "G-1RZ87TYNBY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //export

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();