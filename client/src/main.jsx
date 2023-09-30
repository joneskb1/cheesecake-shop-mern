import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.js';

import './index.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//TO DO
// need to move img uploads out of client folder
// update stripe success and cancel url
// add stripe to cors?
// update forgot password url
// add render i.p to atlas instead of all i.p

// Potential features
// fancy emails
// shipping/tracking
// admin mutate users rtk & ui
// dynamic carousel cards
