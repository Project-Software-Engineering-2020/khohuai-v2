import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
// import firebaseConfig from './config';

const firebaseConfig = {
    apiKey: "AIzaSyDFVW8oB9jThgn0V_dBOlwlSw7xXOIGEMk",
    authDomain: "khohuai-v2.firebaseapp.com",
    projectId: "khohuai-v2",
    storageBucket: "khohuai-v2.appspot.com",
    messagingSenderId: "644654390402",
    appId: "1:644654390402:web:7d6bb217c4a6daff64e89b"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
//email&password login
const auth = firebaseApp.auth();
//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();
//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');
//firebase storage
const storage = firebase.storage();

export {
    firebaseApp,
    firestore,
    auth,
    googleProvider,
    facebookProvider,
    storage
}