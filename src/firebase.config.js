// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrl9yI6SwL_GXk7i2NrPCo8TToYofcqPo",
  authDomain: "realtor-app-react-d3233.firebaseapp.com",
  projectId: "realtor-app-react-d3233",
  storageBucket: "realtor-app-react-d3233.appspot.com",
  messagingSenderId: "385966211007",
  appId: "1:385966211007:web:3d9c0cfd5649ba7457eb0a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()