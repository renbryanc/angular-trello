
const firebase = require('firebase');
require('firebase/auth');

let config = {
  apiKey: "AIzaSyAyQFZ-5DI_3Lgl3hz03T0NEpcb8b2U4gM",
  authDomain: "angular-trello.firebaseapp.com",
  databaseURL: "https://angular-trello.firebaseio.com",
  projectId: "angular-trello",
  storageBucket: "angular-trello.appspot.com",
  messagingSenderId: "602560963313"
};
module.exports = firebase.initializeApp(config);
