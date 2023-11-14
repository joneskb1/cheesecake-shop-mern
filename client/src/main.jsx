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
// error with img uploads, would need disk on render to store
// put login guard on both nav cart & footer cart
// sign up overflow at top
// check mobile - search not working & admin mobile nav height incorrect
// add render i.p to atlas instead of all i.p?

// Potential features
// fancy emails
// shipping/tracking
// admin mutate users rtk & ui
// dynamic carousel cards
