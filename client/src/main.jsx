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
// DURR 1) finish rtk user routes and ui
// DURR 2) products controller/db, rtk, ui
// DURR 3) orders controller/db, rtk, ui
// DURR 4) cart slice, ui, storage
// DURR 5) emails for forgotten pw's/orders
// DURR 6) payment processing w/ stripe
// DURR 7) usps api for shipping
// DURR 8) admin mutate users rtk & ui
