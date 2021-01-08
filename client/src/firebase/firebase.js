import firebase from 'firebase/app';
import 'firebase/firebase';
import 'firebase/auth';
import firebaseConfig from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
//email&password login
const auth = firebaseApp.auth();
//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();
//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

export {
    firebaseApp,
    firestore,
    auth,
    googleProvider,
    facebookProvider
}