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

// To DO
// you may like flicker
// delete unused code

// extra credit
// fancy emails
// shipping/tracking
// admin mutate users rtk & ui
// dynamic carousel cards
