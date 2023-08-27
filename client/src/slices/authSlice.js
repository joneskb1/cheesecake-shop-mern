import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

const initialState = {
  isLoggedIn: secureLocalStorage.getItem('loggedInLocal') ? true : null,
  isAdmin: secureLocalStorage.getItem('isAdmin') ? true : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginGlobalState(state, action) {
      state.isLoggedIn = true;
      state.isAdmin = action.payload ? action.payload : null;
      if (state.isAdmin) secureLocalStorage.setItem('isAdmin', state.isAdmin);
      secureLocalStorage.setItem('loggedInLocal', state.isLoggedIn);
    },
    logoutGlobalState(state) {
      state.isLoggedIn = null;
      state.isAdmin = null;
      secureLocalStorage.removeItem('loggedInLocal');
      secureLocalStorage.removeItem('isAdmin');
    },
  },
});

export const { loginGlobalState, logoutGlobalState } = authSlice.actions;
export default authSlice.reducer;
