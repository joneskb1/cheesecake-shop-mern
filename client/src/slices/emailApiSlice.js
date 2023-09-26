import { apiSlice } from './apiSlice';
import { EMAIL_URL } from '../utils/constants';

export const emailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data) => ({
        url: `${EMAIL_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendMailMutation } = emailApiSlice;
