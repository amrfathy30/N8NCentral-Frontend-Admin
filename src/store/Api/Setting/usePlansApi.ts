import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axiosConfig';
import type { Plan } from '../../../types/setting';

export const usePlansApi = createApi({
    reducerPath: 'usePlansApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['usePlansApi'],
    endpoints: builder => ({
        // get data
        getPlansData: builder.query<Plan, void>({
            query: () => ({
                url: `/plans`,
                method: 'GET',
            }),
            providesTags: ['usePlansApi'],
        }),

        // get plan by key
        getPlansById: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `/plans/${id}`,
                method: 'GET',
            }),
            providesTags: ['usePlansApi'],
        }),

        // add data
        addPlansData: builder.mutation({
            query: ({ data }: { data: any }) => ({
                url: `/plans`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['usePlansApi'],
        }),

        // update data
        updatePlansData: builder.mutation({
            query: ({ id, data }: { id: string; data: any }) => ({
                url: `/plans/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['usePlansApi'],
        }),

        // delete data
        // deletePlansData: builder.mutation({
        //     query: ({ id }: { id: string }) => ({
        //         url: `/plans/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['usePlansApi'],
        // }),
    }),
});

export const {
    useGetPlansDataQuery,
    useGetPlansByIdQuery,
    useAddPlansDataMutation,
    useUpdatePlansDataMutation,
    // useDeletePlansDataMutation,
} = usePlansApi;
