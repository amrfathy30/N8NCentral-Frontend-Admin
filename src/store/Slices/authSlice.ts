import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface Admin {
    uuid: string;
    name: string;
    email: string;
    status: string;
    language_code: string;
}

interface AuthState {
    admin: Admin | null;
    token: string | null;
}

const initialState: AuthState = {
    admin: localStorage.getItem('N8N_AdminData')
        ? JSON.parse(localStorage.getItem('N8N_AdminData') as string)
        : null,
    token: Cookies.get('N8N_AdminToken') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
            const { admin, token } = action.payload;
            state.admin = admin;
            state.token = token;
            localStorage.setItem('N8N_AdminData', JSON.stringify(admin));
            Cookies.set('N8N_AdminToken', token, { expires: 7 });
        },
        logout: state => {
            state.admin = null;
            state.token = null;
            localStorage.removeItem('N8N_AdminData');
            Cookies.remove('N8N_AdminToken');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.admin;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
