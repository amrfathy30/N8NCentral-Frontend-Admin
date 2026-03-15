import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../utils/axiosConfig";

export const useUserAuthApi = createApi({
  reducerPath: "useUserAuthApi",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["useUserAuth"],
  endpoints: (builder) => ({
    // Login
    addLogin: builder.mutation({
      query: (formData) => ({
        url: "/auth/login",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["useUserAuth"],
    }),
  }),
});

export const { useAddLoginMutation } = useUserAuthApi;
