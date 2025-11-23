// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF1zSJD-fzFLrdHeQbsoGp33ozK7Ij61s",
  authDomain: "proyectocursonode-d8558.firebaseapp.com",
  projectId: "proyectocursonode-d8558",
  storageBucket: "proyectocursonode-d8558.firebasestorage.app",
  messagingSenderId: "574074956680",
  appId: "1:574074956680:web:cd48af9c1e672f5e53283d",
  measurementId: "G-JQDQZFH9KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { db };
