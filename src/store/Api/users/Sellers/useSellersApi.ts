import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../../utils/axiosConfig';

export const useSellersApi = createApi({
    reducerPath: 'useSellersApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['useSellersApi'],
    endpoints: builder => ({
        // get stats data
        getSellerStatsData: builder.query<any, void>({
            query: () => ({
                url: `/sellers/stats`,
                method: 'GET',
            }),
            providesTags: ['useSellersApi'],
        }),

        // get all seller data
        getAllSellerData: builder.query<
            any,
            { status: string; search?: string; per_page: number; page: number }
        >({
            query: ({ status, search, per_page, page }) => ({
                url: `/sellers?status=${status}${search ? `&search=${search}` : ''}&per_page=${per_page}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['useSellersApi'],
        }),

        // get seller by id
        getSellerById: builder.query<any, { id: string }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}`,
                method: 'GET',
            }),
            providesTags: ['useSellersApi'],
        }),
    }),
});

export const { useGetSellerStatsDataQuery, useGetSellerByIdQuery, useGetAllSellerDataQuery } =
    useSellersApi;
