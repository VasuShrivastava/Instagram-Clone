import firebase from "firebase";
const firebaseApp= firebase.initializeApp({
  apiKey: "AIzaSyDIkFTR3V8KpULjmy_QTmbIGKmiECIq23w",
  authDomain: "insta-clone-c2e71.firebaseapp.com",
  databaseURL: "https://insta-clone-c2e71.firebaseio.com",
  projectId: "insta-clone-c2e71",
  storageBucket: "insta-clone-c2e71.appspot.com",
  messagingSenderId: "669755887674",
  appId: "1:669755887674:web:d9b9477eab34a43cfc2503",
  measurementId: "G-FG8N9GCV66"
});

const db= firebaseApp.firestore();
const auth= firebaseApp.auth();
const storage= firebaseApp.storage();
export {db, auth, storage};
