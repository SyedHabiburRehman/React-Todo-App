import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import * as firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyBnsrmzr-S5gaVz-pqyHek6OxM0Rfz6pHI",
    authDomain: "to-do-app-ae496.firebaseapp.com",
    databaseURL: "https://to-do-app-ae496.firebaseio.com",
    storageBucket: "to-do-app-ae496.appspot.com",
    messagingSenderId: "297812979577"
  };
  firebase.initializeApp(config);


ReactDOM.render(
   <MuiThemeProvider >
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);
