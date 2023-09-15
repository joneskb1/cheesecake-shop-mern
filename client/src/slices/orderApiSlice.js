import { apiSlice } from './apiSlice.js';
import { ORDER_URL } from '../utils/constants.js';

// change to plural: users
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApiSlice;
