import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import * as serviceWorker from './serviceWorker';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHg8J96ji4BrcnVDrPUNE2E-7qCTfdxdY",
    authDomain: "ecocidadao-649f9.firebaseapp.com",
    databaseURL: "https://ecocidadao-649f9.firebaseio.com",
    projectId: "ecocidadao-649f9",
    storageBucket: "ecocidadao-649f9.appspot.com",
    messagingSenderId: "388339454018"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
