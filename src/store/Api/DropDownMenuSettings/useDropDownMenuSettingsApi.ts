import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axiosConfig';

export const useDropDownMenuSettingsApi = createApi({
    reducerPath: 'useDropDownMenuSettingsApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['useDropDownMenuSettingsApi'],
    endpoints: builder => ({
        // get data by key
        getDropDownMenuSettingsData: builder.query({
            query: (key: string) => ({
                url: `/master-data/${key}`,
                method: 'GET',
            }),
            providesTags: ['useDropDownMenuSettingsApi'],
        }),

        // add data
        addDropDownMenuSettingsData: builder.mutation({
            query: ({ key, data }: { key: string; data: any }) => ({
                url: `/master-data/${key}`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useDropDownMenuSettingsApi'],
        }),

        // update data
        updateDropDownMenuSettingsData: builder.mutation({
            query: ({ key, masterData, data }: { key: string; masterData: string; data: any }) => ({
                url: `/master-data/${key}/${masterData}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['useDropDownMenuSettingsApi'],
        }),

        // delete data
        deleteDropDownMenuSettingsData: builder.mutation({
            query: ({ key, masterData }: { key: string; masterData: string }) => ({
                url: `/master-data/${key}/${masterData}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['useDropDownMenuSettingsApi'],
        }),
    }),
});

export const {
    useGetDropDownMenuSettingsDataQuery,
    useAddDropDownMenuSettingsDataMutation,
    useUpdateDropDownMenuSettingsDataMutation,
    useDeleteDropDownMenuSettingsDataMutation,
} = useDropDownMenuSettingsApi;
