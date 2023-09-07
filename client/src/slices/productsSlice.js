import { apiSlice } from './apiSlice.js';
import {
  PRODUCTS_URL,
  UPLOAD_IMAGE_URL,
  CLONE_IMAGE_URL,
} from '../utils/constants.js';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Product'],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      // providesTags: ['Product'],
      keepUnusedDataFor: 0,
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_IMAGE_URL}`,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    cloneImage: builder.mutation({
      query: (data) => ({
        url: `${CLONE_IMAGE_URL}`,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Product'],
      keepUnusedDataFor: 0,
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: 'DELETE',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUploadImageMutation,
  useCloneImageMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
} = productsApiSlice;
