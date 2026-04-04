import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axiosConfig';

export const useServicesApi = createApi({
    reducerPath: 'useServicesApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['useServicesApi'],
    endpoints: builder => ({
        // get All services
        getAllServicesData: builder.query<any, any>({
            query: params => ({
                url: `/services`,
                method: 'GET',
                params,
            }),
            providesTags: ['useServicesApi'],
        }),

        // get All services Categories
        getAllServicesCategories: builder.query<any, any>({
            query: params => ({
                url: `/service-categories`,
                method: 'GET',
                params,
            }),
            providesTags: ['useServicesApi'],
        }),
        
        // get services Stats
        getServicesStatsData: builder.query<any, void>({
            query: () => ({
                url: `/services/stats`,
                method: 'GET',
            }),
            providesTags: ['useServicesApi'],
        }),

        // get service by id
        getServiceById: builder.query({
            query: ({ service }: { service: string }) => ({
                url: `/services/${service}`,
                method: 'GET',
            }),
            providesTags: ['useServicesApi'],
        }),

        // reject data
        rejectService: builder.mutation({
            query: ({ service, reason }: { service: string, reason?: { ar: string; en: string } }) => ({
                url: `/services/${service}/reject`,
                method: 'POST',
                data: { reason }
            }),
            invalidatesTags: ['useServicesApi'],
        }),
        
        // stop data
        stopService: builder.mutation({
            query: ({ service }: { service: string }) => ({
                url: `/services/${service}/stop`,
                method: 'POST',
            }),
            invalidatesTags: ['useServicesApi'],
        }),

        // reactivate data
        reactivateService: builder.mutation({
            query: ({ service }: { service: string }) => ({
                url: `/services/${service}/reactivate`,
                method: 'POST',
            }),
            invalidatesTags: ['useServicesApi'],
        }),

        // approve data
        approveService: builder.mutation({
            query: ({ service }: { service: string }) => ({
                url: `/services/${service}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['useServicesApi'],
        }),
    }),
});

export const {
    useGetAllServicesDataQuery,
    useGetServicesStatsDataQuery,
    useGetServiceByIdQuery,
    useRejectServiceMutation,
    useApproveServiceMutation,
    useReactivateServiceMutation,
    useStopServiceMutation,
} = useServicesApi;
