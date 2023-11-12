import { apiSlice } from './apiSlice.js';
import { ORDER_URL } from '../utils/constants.js';

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
    getShippingRate: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/shipping-rate`,
        method: 'POST',
        body: data,
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
  useGetShippingRateMutation,
} = orderApiSlice;
