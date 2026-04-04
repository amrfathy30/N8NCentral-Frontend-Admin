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

        // get seller Details by id
        getSellerDetailsById: builder.query<any, { seller_id: string | number }>({
            query: ({ seller_id }: { seller_id: string }) => ({
                url: `/sellers/${seller_id}/details`,
                method: 'GET',
            }),
            providesTags: ['useSellersApi'],
        }),

        // get seller attachments
        getSellerAttachments: builder.query<any, { id: string | number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}/details?include=verification`,
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
        rejectSeller: builder.mutation<any, { id: string | number }>({
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
        unBanSeller: builder.mutation<any, { sellerId: string | number }>({
            query: ({ sellerId }: { sellerId: string }) => ({
                url: `/sellers/${sellerId}/unban`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // stop seller
        stopSeller: builder.mutation<any, { id: string | number }>({
            query: ({ id }: { id: string }) => ({
                url: `/sellers/${id}/stop`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // approve Seller Document
        approveSellerDocument: builder.mutation<
            any,
            { sellerId: string | number; documentId: string | number }
        >({
            query: ({ sellerId, documentId }: { sellerId: string; documentId: string }) => ({
                url: `/sellers/${sellerId}/verification-documents/${documentId}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['useSellersApi'],
        }),

        // reject Seller Document
        rejectSellerDocument: builder.mutation<
            any,
            { sellerId: string | number; documentId: string | number; reason?: string }
        >({
            query: ({ sellerId, documentId, reason }) => ({
                url: `/sellers/${sellerId}/verification-documents/${documentId}/reject`,
                method: 'POST',
                data: { reason },
            }),
            invalidatesTags: ['useSellersApi'],
        }),
    }),
});

export const {
    useGetSellerStatsDataQuery,
    useGetSellerDetailsByIdQuery,
    useGetAllSellerDataQuery,
    useApproveSellerMutation,
    useRejectSellerMutation,
    useBanSellerMutation,
    useUnBanSellerMutation,
    useStopSellerMutation,
    useApproveSellerDocumentMutation,
    useRejectSellerDocumentMutation,
    useGetSellerAttachmentsQuery,
} = useSellersApi;
