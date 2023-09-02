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
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
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
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUploadImageMutation,
  useCloneImageMutation,
  useGetProductQuery,
} = productsApiSlice;
