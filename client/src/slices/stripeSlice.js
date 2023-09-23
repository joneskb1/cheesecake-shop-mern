import { apiSlice } from './apiSlice.js';
import { STRIPE_URL } from '../utils/constants.js';

// change to plural: users
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
