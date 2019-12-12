import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const firebase = require('firebase');
require('firebase/firestore')

firebase.initializeApp({
    apiKey: "AIzaSyBJSh3ybiELv3xjKj9WA6Us89qxJcXpd0g",
    authDomain: "super-notes-29c95.firebaseapp.com",
    databaseURL: "https://super-notes-29c95.firebaseio.com",
    projectId: "super-notes-29c95",
    storageBucket: "super-notes-29c95.appspot.com",
    messagingSenderId: "975566010397",
    appId: "1:975566010397:web:e7ff11c3db765c24156ef4",
    measurementId: "G-EKVLH2WQN5"
});
firebase.analytics();

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

