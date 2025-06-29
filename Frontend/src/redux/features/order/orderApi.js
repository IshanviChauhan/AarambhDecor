import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/create-order",
        method: "POST",
        body: orderData,
      }),
    }),



    // Fetch orders by email
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    // Fetch order by ID
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `order/${orderId}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Order'],
      // Transform the response to handle both old and new format
      transformResponse: (response) => {
        // Handle new enhanced response format
        if (response && typeof response === 'object' && response.orders) {
          return {
            orders: response.orders,
            count: response.count,
            lastUpdated: response.lastUpdated
          };
        }
        // Handle legacy response format (direct array)
        if (Array.isArray(response)) {
          return {
            orders: response,
            count: response.length,
            lastUpdated: new Date().toISOString()
          };
        }
        // Fallback
        return {
          orders: [],
          count: 0,
          lastUpdated: new Date().toISOString()
        };
      },
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),


    
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation
} = orderApi;

export default orderApi;
