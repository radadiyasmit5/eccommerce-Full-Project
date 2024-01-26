import  firebase from "firebase";

// import { auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig =firebase.initializeApp( {
  apiKey: "AIzaSyC8i-HB7rHJ6ownPb97BYQ2qO3APnpOquo",
  authDomain: "eccomers-282a3.firebaseapp.com",
  projectId: "eccomers-282a3",
  storageBucket: "eccomers-282a3.appspot.com",
  messagingSenderId: "570920570529",
  appId: "1:570920570529:web:c876e7b627f1333e056ae0",
  measurementId: "G-4L2KGPD1W8"
});
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
