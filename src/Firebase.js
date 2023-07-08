import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdsO138nX0Luv-gPLgjHxI_0DsoQwdf4A",
  authDomain: "netflix-clone-40569.firebaseapp.com",
  projectId: "netflix-clone-40569",
  storageBucket: "netflix-clone-40569.appspot.com",
  messagingSenderId: "962666496672",
  appId: "1:962666496672:web:ae51125e5a07368780ffc5",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth };
export default db;
