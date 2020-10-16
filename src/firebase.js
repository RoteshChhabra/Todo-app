import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA21bHz73Z7vjShNuOUK1f-NwO6ccf6H58",
    authDomain: "todo-app-c2a83.firebaseapp.com",
    databaseURL: "https://todo-app-c2a83.firebaseio.com",
    projectId: "todo-app-c2a83",
    storageBucket: "todo-app-c2a83.appspot.com",
    messagingSenderId: "356540672709",
    appId: "1:356540672709:web:9ef13a59400991a58c9eac",
    measurementId: "G-HZVSQL48MS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const database = firebase.database();



  firebase.analytics();

  export {firebase, database as default} ;