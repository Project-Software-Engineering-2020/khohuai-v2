const firebase = require('firebase');
const firebaseAdmin = require("firebase-admin");


// const config = require('./config');
// const firebaseAdmin = require("firebase-admin");

// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "hi-chon",
//   "private_key_id": "4cf41da28a70eea210e16bcc6eaf9fc6f7672748",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfCFsiyDs4mSKs\nxIyXm9J1PcWg6L6Y6yNXGDRAyCskEco3okZrY8PDpvmK4+8f5ORMf0eyj2TpBH5n\nDFYRC9iDZ2gbSdIXQ1Bob20SbC1dfg70pLOKTNSmkpusJuO2Eq/RQnL1QdZ9oxmF\n/h0i+CTvqyRkSDIdFzsA64M26xnAJwbK2qEvnuCQ+Y6NHNZ9XfWHKLNvi/5QaKMp\nv3fS8TYTKr9Uma8Dti64gkV6flE9JQ4uiTcB2t6RcDEl/0EtRfb2n3+OuWul27L2\nGEpWHmfaek3m/dHna69rXYFRkKRWKkGA9uDOe39O9DcGxMijUjNqDTd/3xO7U+0e\nCxa7vzvDAgMBAAECggEAS0GkBvij9auZ2hIEyfXGCQ8bR4L8NtcG2T8t8v4GVEJK\n5DrZghYq3JpWemBUl040rvKIVjo/MXmb613OGLD3W2+Ct28eiT2kfldEUTR530U5\nBJIwGCE1fEHigvvARDfhlXARgHgQbVHSUTMoTJUKvZPKW95CQLvugwfwBvwIKoJO\nU0nlk2kv1eSQ0joYm59m73aGM34DH4eczg3yLr4wyXcBoUaphxUHkTTa3YasCTwJ\n6QBJo54CCQ6ep3ZCDB7czgZPmaqsN14Mv4uqVFCslI0x+YZDPQM0fcsjxcj0rlqy\nqRy9O5IFo+DeQfOL+BuUF5/9n8rCsCsZlK2h7/hjwQKBgQDOdMOI6rlVOAcPb6g6\nZrWB83VUgNfDjypGBWaVn9WRtSF+gb17GM74XSaVnQk4bjn8AY9hdKRJXLKg7hQY\nSX4N830QZW0iGYUuWtz4YQyHblgquUxj2aVG8VL3ffiQ5oJxkTo26h/ITXnu0usA\nn3JXMmlhRpNIw17TRUz+Cf6cowKBgQDFMjjdkW9veJNZHNIR173I9rPcUdkp7XDh\nFhfzcBTm5N5YUntviu45L6334AUo7Ao0x1XZ6SwiqAbw3vOCWZubvekTekX9cL+2\ntPdWFbNDZKoveM7Z7DVJvJFsE9u+SZDOehsHBJUGW6voV+RU0zNnRc/9FplKldhP\nnFeFCg62YQKBgQCVibN7f3BgDmXmw1xZeL1tc9b/LxeZGSBoeU71f0Dk+gpZpEWH\nXM/Ey0vAQG9GRWiQZNzinObGEHN95xP9B3ZbSorCjoR+l3eEvOGiskCt87m+sFpp\nVGLHQNJ0WvTol13SPnuo/OmqXpu75V+8IsFh8Sys/b5+jKwpYN/EfZ7C+wKBgB81\nZ5KJZd16c7dyvDxerIaVpLmFqpzcGzVETd4VKvmv1xCbXTW2AyXBygKkzaxATw0z\nTv8BzB5gAVk1r8w9akcnsy+F9nW51l2QHmTdYlWUJOsGb5ZFr9lPoqQ8MFbZRbWn\n1YcyznMHJxnKbzSNiGEbx2MCpJgNRwKyd5dylAmBAoGACEXqe7VP2Z9s9Q3rwGJ4\nNEFvlIeFqC6t8etgW/Ex7bxtzJypl8fwKWkehnVUEuSnERijB4IrBkf0wXEsX3Uw\nWTMV7DRStvChyPNqpSeVuyVguLx40vwt3H8rkA+LWK7UdPHX/PWWv6CJL3ZYI84f\nuMP3TxWVhzS6DbKDUVm4b+k=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-9pav9@hi-chon.iam.gserviceaccount.com",
//   "client_id": "110214467177026900937",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9pav9%40hi-chon.iam.gserviceaccount.com"
// }

// const serviceAccount = require("./hi-chon-firebase-adminsdk-9pav9-4cf41da28a.json");
// const admin = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://hi-chon.firebaseio.com"
// });

const serviceAccount = require("./khohuai-admin-firebase-adminsdk-x9a4w-782bb15df6.json");


// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
var firebaseConfig = {
  apiKey: "AIzaSyBN3QqOyoNoDiX5prLxCSKN7Q5k1i3cjGg",
  authDomain: "khohuai-admin.firebaseapp.com",
  projectId: "khohuai-admin",
  storageBucket: "khohuai-admin.appspot.com",
  messagingSenderId: "108256796724",
  appId: "1:108256796724:web:41996f0a36c1a496bf2a61",
  measurementId: "G-FX5WHX5ZPH"
};

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://khohuai-v2-default-rtdb.firebaseio.com",
  storageBucket: "gs://khohuai-v2.appspot.com"
});


const firebaseApp = firebase.initializeApp(firebaseConfig);

//firestore
const firestore = firebaseApp.firestore();

//email&password login
const auth = firebaseApp.auth();

//google login 
const googleProvider = new firebase.auth.GoogleAuthProvider();

//facebook login
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('user_birthday');

// //firebase storage
// const storage = firebase.storage();

module.exports = {
  admin,
  firebase,
    firebaseApp,
    firestore,
    auth,
    // admin,
    googleProvider,
    facebookProvider,
}
