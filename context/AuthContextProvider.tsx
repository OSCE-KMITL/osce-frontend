import React, { createContext, useEffect, useState } from 'react';
import { UserAuthData } from '../features/auth/auth-slice';
import { useGetMe } from '../features/auth/hooks/useGetMe';
import { CookieManager } from '../utils/CookieManager';
import client from '../lib/apollo/apollo-client';

interface Props {
    children: JSX.Element;
}

interface AuthContextValues {
    user: UserAuthData;
    setAuthUser: (user: UserAuthData | null) => void;
    useLogout: () => void;
}

const initialState: AuthContextValues = {
    user: null,
    setAuthUser: () => {},
    useLogout: () => {},
};

export const AuthenticationContext = createContext<AuthContextValues>(initialState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const { data } = useGetMe();
    const [user, setUser] = useState<UserAuthData | null>(null);

    useEffect(() => {
        if (data?.getMe) {
            setUser({ ...user, ...data.getMe });
        }
    }, [data?.getMe]);

    function setAuthUser(user: UserAuthData | null) {
        setUser(user);
        CookieManager.setCookieWithToken(user.token);
    }

    async function useLogout() {
        setUser(null);
        CookieManager.clearTokenFromCookie();
        await client.resetStore();
    }

    return <AuthenticationContext.Provider value={{ user, setAuthUser, useLogout }}>{children}</AuthenticationContext.Provider>;
};

export default AuthContextProvider;
