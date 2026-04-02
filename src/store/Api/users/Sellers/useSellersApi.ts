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
        getSellerById: builder.query<any, { id: string| number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}`,
                method: 'GET',
            }),
            providesTags: ['useSellersApi'],
        }),

        // approve seller
        approveSeller: builder.mutation<any, { id: string | number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // reject seller
        rejectSeller: builder.mutation<any, { id: string| number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}/reject`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // ban seller
        banSeller: builder.mutation<any, { id: string | number; reason: string }>({
            query: ({ id, reason }) => ({
                url: `/sellers/${id}/ban`,
                method: 'POST',
                data: { reason },
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // unBan seller
        unBanSeller: builder.mutation<any, { sellerId: string| number }>({
            query: ({ sellerId }: { sellerId: string }) => ({
                url: `/sellers/${sellerId}/unban`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // stop seller
        stopSeller: builder.mutation<any, { id: string| number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}/stop`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),
    }),
});

export const {
    useGetSellerStatsDataQuery,
    useGetSellerByIdQuery,
    useGetAllSellerDataQuery,
    useApproveSellerMutation,
    useRejectSellerMutation,
    useBanSellerMutation,
    useUnBanSellerMutation,
    useStopSellerMutation,
} = useSellersApi;
