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
//  emails for forgotten pw's/orders
//  payment processing w/ stripe
//  usps api for shipping
//  admin mutate users rtk & ui
//  spin cake, you may like flicker, contact form, carousel links
