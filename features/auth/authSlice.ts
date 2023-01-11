import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../state/store';
import { AuthResponse, LOGIN, LoginInput, useLogin } from './hooks/useLogin';
import { useMutation } from '@apollo/client';
import { AuthData } from '../../src/__generated__/graphql';

export interface UserData {
    id: string;
    email: string;
    full_name: string;
    token: string;
    role: string;
}

export interface AuthenticationState {
    user: UserData | null;
    authenticate: boolean;
}

const initialState: AuthenticationState = { user: null, authenticate: false };

export const authenticationSlice = createSlice({
    name: 'Authentication',
    initialState: { number: 0 },
    reducers: {
        loginReducer: (state) => {
            // const { email, id, token, role } = action.payload.signIn;
            state.number += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginReducer } = authenticationSlice.actions;
export const authenticationSelector = (store: RootState) => store.authenticationReducer;
export default authenticationSlice.reducer;

export const loginReducerAsync = createAsyncThunk('Authentication/login', async (input: LoginInput) => {
    const [login, { data, loading, error }] = useMutation(LOGIN);
    try {
        const response = await login({
            variables: {
                email: input.email,
                password: input.password,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});
