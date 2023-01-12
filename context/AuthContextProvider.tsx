import React, { createContext, useEffect, useState } from 'react';
import { useGetMe } from '../features/auth/hooks/useGetMe';
import { CookieManager } from '../utils/CookieManager';
import client from '../lib/apollo/apollo-client';
import { GetServerSideProps } from 'next';
import { TOKEN_NAME } from '../constants';
import { cookies } from 'next/headers';
import { RoleOption } from '../constants/RoleOptions';

interface Props {
    children: JSX.Element;
}

export interface UserAuthData {
    id: string;
    email: string;
    token?: string;
    role: RoleOption;
}

interface AuthContextValues {
    me: UserAuthData | null;
    setAuthUser: (user: UserAuthData | null) => void;
    useLogout: () => void;
}

const initialState: AuthContextValues = {
    me: null,
    setAuthUser: () => {},
    useLogout: () => {},
};

export const AuthenticationContext = createContext<AuthContextValues>(initialState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const { data, error } = useGetMe();
    const [me, setMe] = useState<UserAuthData | null>(null);

    useEffect(() => {
        if (data?.getMe) {
            setMe({ ...me, ...data.getMe });
        } else if (error) {
            setMe(null);
            CookieManager.clearTokenFromCookie();
        }
    }, [data?.getMe, error]);

    function setAuthUser(user: UserAuthData | null) {
        setMe(user);
        CookieManager.setCookieWithToken(user.token);
    }

    async function useLogout() {
        setMe(null);
        CookieManager.clearTokenFromCookie();
        await client.resetStore();
    }

    return <AuthenticationContext.Provider value={{ me: me, setAuthUser, useLogout }}>{children}</AuthenticationContext.Provider>;
};

export default AuthContextProvider;
