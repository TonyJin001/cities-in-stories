import firebase from 'firebase'
require('firebase/firestore')

var config = {
    apiKey: "AIzaSyBDP65bOhnDC7A9_xn-KG9y_v6y_RhN4Jk",
    authDomain: "cities-in-stories.firebaseapp.com",
    databaseURL: "https://cities-in-stories.firebaseio.com",
    projectId: "cities-in-stories",
    storageBucket: "cities-in-stories.appspot.com",
    messagingSenderId: "211032991033"
  };
  firebase.initializeApp(config);

  export const db = firebase.firestore()
