import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../utils/axiosConfig';

export const useServiceCategoriesApi = createApi({
    reducerPath: 'useServiceCategoriesApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['useServiceCategoriesApi'],
    endpoints: builder => ({
        // get All services Categories
        getAllServicesCategories: builder.query<any, any>({
            query: params => ({
                url: `/service-categories?per_page=${params.per_page}`,
                method: 'GET',
            }),
            providesTags: ['useServiceCategoriesApi'],
        }),

        // create service category
        createServiceCategory: builder.mutation({
            query: (data: any) => ({
                url: `/service-categories`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['useServiceCategoriesApi'],
        }),

        // update service category
        updateServiceCategory: builder.mutation({
            query: ({ id, data }: { id: string; data: any }) => ({
                url: `/service-categories/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['useServiceCategoriesApi'],
        }),

        // delete service category
        deleteServiceCategory: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/service-categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['useServiceCategoriesApi'],
        }),
    }),
});

export const {
    useGetAllServicesCategoriesQuery,
    useCreateServiceCategoryMutation,
    useUpdateServiceCategoryMutation,
    useDeleteServiceCategoryMutation,
} = useServiceCategoriesApi;
