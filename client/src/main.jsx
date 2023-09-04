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
// DURR 2) products controller/db, rtk, ui
// DURR 3) orders controller/db, rtk, ui
// DURR 4) cart slice, ui, storage
// DURR 5) emails for forgotten pw's/orders
// DURR 6) payment processing w/ stripe
// DURR 7) usps api for shipping
// DURR 8) admin mutate users rtk & ui
// DURR 9) images

// today's tuh durrs:
// need to pull in current image into edit screen
// 1) update product: if user updates name, need to find all image files with that name and update the image file names. if they update the image, need to delete all the images with the product name and replace them with the updated image. if they update name and image need to delete all old images and replace with updated one
// 2) delete product: delete all images with file names matching product name
