import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/payments`,
    credentials: 'include',
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // Fetch payment history by user email
    getPaymentsByEmail: builder.query({
      query: (email) => ({
        url: `/user-payments/${email}`,
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),
  }),
});

export const {
  useGetPaymentsByEmailQuery,
} = paymentApi;

export default paymentApi;
