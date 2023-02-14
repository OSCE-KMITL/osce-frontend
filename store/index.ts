import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import announcementReducer from '@features/announcement/announcement.slice';
import facultyState from '@features/register-coop/coopregister.slice';
export const store = configureStore({
    reducer: { announcement: announcementReducer, facultyState: facultyState },
    devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` interfaces from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
