import { apiSlice } from './apiSlice.js';
import { USER_URL } from '../utils/constants.js';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-user`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    verifyLoggedIn: builder.mutation({
      query: () => ({
        url: `${USER_URL}/check-login`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyLoggedInMutation,
} = userApiSlice;
