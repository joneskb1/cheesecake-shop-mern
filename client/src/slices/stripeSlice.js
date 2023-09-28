import { apiSlice } from './apiSlice.js';
import { STRIPE_URL } from '../utils/constants.js';

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (data) => ({
        url: `${STRIPE_URL}/session`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useCreateSessionMutation } = stripeApiSlice;
