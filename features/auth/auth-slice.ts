import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../state/store';
import { CookieManager } from '../../utils/CookieManager';
import client from '../../lib/apollo/apollo-client';

export interface UserAuthData {
    id: string;
    email: string;
    token?: string;
    role: string;
}

export interface AuthenticationState {
    user?: UserAuthData;
    authenticate: boolean;
}

const initialState: AuthenticationState = { user: null, authenticate: false };

export const authenticationSlice = createSlice({
    name: 'Authentication',
    initialState: initialState,
    reducers: {
        userLogin: (state: AuthenticationState, action: PayloadAction<UserAuthData>) => {
            state.user = { ...state.user, ...action.payload };
            state.authenticate = true;
            CookieManager.setCookieWithToken(action.payload.token);
        },
        userLogout: (state: AuthenticationState, action: PayloadAction<void>) => {
            state.user = null;
            state.authenticate = false;
            CookieManager.clearTokenFromCookie();
            client.resetStore().then();
        },
    },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = authenticationSlice.actions;
export const authenticationSelector = (store: RootState) => store.authenticationReducer;
export default authenticationSlice.reducer;
