import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDbxkcg3qcbedw2gmdPnUnyxFxB5NgaNns",
    authDomain: "socialape-f4e77.firebaseapp.com",
    projectId: "socialape-f4e77",
    storageBucket: "socialape-f4e77.appspot.com",
    messagingSenderId: "375526920200",
    appId: "1:375526920200:web:13d3fe8308b3e9a8fc41bd",
    measurementId: "G-03JLZGQDXD"
  });

  const storage = firebase.storage();

  export {storage, app as default};
