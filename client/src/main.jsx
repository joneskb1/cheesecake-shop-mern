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
// ask before deleting product
// error being thrown when adding product:  http://localhost:5173/src/assets/uploads/clones/small/-170w.undefined?timestamp=1694033265322 404 (Not Found)
//  orders controller/db, rtk, ui
//  cart slice, ui, storage
//  emails for forgotten pw's/orders
//  payment processing w/ stripe
//  usps api for shipping
//  admin mutate users rtk & ui
