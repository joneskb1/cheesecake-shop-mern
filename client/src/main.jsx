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

// TUH DURRRRS
// DURR pull in products on admin products page
// DURR add new product button on edit page
// DURR add variant feature
// DURR error being thrown when adding product:  http://localhost:5173/src/assets/uploads/clones/small/-170w.undefined?timestamp=1694033265322 404 (Not Found)
// DURR products controller/db, rtk, ui
// DURR  orders controller/db, rtk, ui
// DURR  cart slice, ui, storage
// DURR  emails for forgotten pw's/orders
// DURR  payment processing w/ stripe
// DURR  usps api for shipping
// DURR  admin mutate users rtk & ui
