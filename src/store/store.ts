import { configureStore } from "@reduxjs/toolkit";
import { useUserAuthApi } from "./Api/Auth/useUserAuth";

export const store = configureStore({
  reducer: {
    [useUserAuthApi.reducerPath]: useUserAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(useUserAuthApi.middleware),
});
