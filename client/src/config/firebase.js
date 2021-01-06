import firebase from 'firebase/app'
import 'firebase/firebase'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDFVW8oB9jThgn0V_dBOlwlSw7xXOIGEMk",
    authDomain: "khohuai-v2.firebaseapp.com",
    projectId: "khohuai-v2",
    storageBucket: "khohuai-v2.appspot.com",
    messagingSenderId: "644654390402",
    appId: "1:644654390402:web:7d6bb217c4a6daff64e89b"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;