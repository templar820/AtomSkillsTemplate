import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@styles/index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

 if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
             console.log('SW registered: ', registration);
           }).catch(registrationError => {
             console.log('SW registration failed: ', registrationError);
           });
       });
   }
