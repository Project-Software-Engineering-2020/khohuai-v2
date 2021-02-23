import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
// import firebaseConfig from './config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Ie67ZkoTukkf7weWf_EKTqdBl31PLWM",
  authDomain: "hi-chon.firebaseapp.com",
  databaseURL: "https://hi-chon.firebaseio.com",
  projectId: "hi-chon",
  storageBucket: "hi-chon.appspot.com",
  messagingSenderId: "909598832056",
  appId: "1:909598832056:web:61aca099cde2da9ed18b4d",
  measurementId: "G-9H2RNWT8ZF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

//email&password login
const auth = firebaseApp.auth();

//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

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