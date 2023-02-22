import React, { createContext, useEffect, useState } from 'react';
import { useGetMe } from '../features/auth/hooks/useGetMe';
import { CookieManager } from '../utils/CookieManager';
import client from '@lib/apollo';
import { RoleOption } from '../constants/RoleOptions';
import { router } from 'next/client';
import { useRouter } from 'next/router';
import { API_URI, ENDPOINT_URI } from '../constants';
import axios from 'axios';
import { IStudent } from '@features/student/interfaces/Student';

interface Props {
    children: JSX.Element;
}

export interface UserAuthData {
    id: string;
    email: string;
    token?: string;
    role: RoleOption;
    profile_image?: string;
    is_student?: IStudent | null | undefined;
    is_company?: {
        company_id?: {
            id: string;
        };
    };
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
    const { data, refetch } = useGetMe();
    const [me, setMe] = useState<UserAuthData | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (data?.getMe) {
            setMe({ ...me, ...data.getMe });
        }
    }, [data?.getMe, router]);

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
