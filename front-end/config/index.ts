import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAX6RA5_Bf2nn21MzmndSdoMMhKpLVSp0",
  authDomain: "fir-ci-example.firebaseapp.com",
  databaseURL: "https://fir-ci-example.firebaseio.com",
  projectId: "firebase-ci-example",
  storageBucket: "firebase-ci-example.appspot.com",
  messagingSenderId: "1026044764369",
  appId: "1:1026044764369:web:6d265e631f384c1490a5f0",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
