import { signOut } from 'next-auth/react';

export const useLogout = async () => {
    await signOut();
    await localStorage.clear();
};
