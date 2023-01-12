import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../../features/auth/auth-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducers = {
    authenticationReducer,
};
export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
