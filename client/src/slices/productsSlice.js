import { apiSlice } from './apiSlice.js';
import { createSlice } from '@reduxjs/toolkit';
import {
  PRODUCTS_URL,
  UPLOAD_IMAGE_URL,
  CLONE_IMAGE_URL,
} from '../utils/constants.js';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

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
      providesTags: ['Product'],
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
    createVariant: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/create-variant/${data.id}`,
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    editVariant: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/edit-variant/${data.id}`,
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteVariant: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/delete-variant/${data.id}`,
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
  useCreateVariantMutation,
  useEditVariantMutation,
  useDeleteVariantMutation,
} = productsApiSlice;
