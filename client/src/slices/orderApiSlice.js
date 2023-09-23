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
      invalidatesTags: ['Order'],
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
    getUserOrder: builder.query({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllOrdersAdmin: builder.query({
      query: () => ({
        url: `${ORDER_URL}/admin/all`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getOrderAdmin: builder.query({
      query: (data) => ({
        url: `${ORDER_URL}/admin/${data.id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersAdminQuery,
  useGetOrderAdminQuery,
  useGetUserOrderQuery,
} = orderApiSlice;
