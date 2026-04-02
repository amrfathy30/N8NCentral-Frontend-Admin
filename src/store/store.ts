import { configureStore } from '@reduxjs/toolkit';
import { useUserAuthApi } from './Api/Auth/useUserAuth';
import authReducer from './Slices/authSlice';
import { useDropDownMenuSettingsApi } from './Api/DropDownMenuSettings/useDropDownMenuSettingsApi';
import { usePlansApi } from './Api/Setting/usePlansApi';
import { useSellersApi } from './Api/users/Sellers/useSellersApi';
import { useServicesApi } from './Api/Services/useServicesApi';

export const store = configureStore({
    reducer: {
        [useUserAuthApi.reducerPath]: useUserAuthApi.reducer,
        [usePlansApi.reducerPath]: usePlansApi.reducer,
        [useSellersApi.reducerPath]: useSellersApi.reducer,
        [useServicesApi.reducerPath]: useServicesApi.reducer,
        [useDropDownMenuSettingsApi.reducerPath]: useDropDownMenuSettingsApi.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            useUserAuthApi.middleware,
            usePlansApi.middleware,
            useServicesApi.middleware,
            useSellersApi.middleware,
            useDropDownMenuSettingsApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
