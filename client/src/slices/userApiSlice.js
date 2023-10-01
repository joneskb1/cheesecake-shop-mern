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
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update-password`,
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `${USER_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/reset-password/${data.token}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyLoggedInMutation,
  useUpdatePasswordMutation,
  useUpdateAccountMutation,
  useGetUserQuery,
} = userApiSlice;
