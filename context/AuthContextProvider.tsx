import React, { createContext, useEffect, useState } from 'react';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import { CookieManager } from '../utils/CookieManager';
import client from '@lib/apollo';
import { RoleOption } from '@constants/RoleOptions';
import { useRouter } from 'next/router';
import { IStudent } from '@features/student/interfaces/Student';
import { ICompanyPerson } from '@features/company/interfaces';
import { IAdvisor } from '@features/advisor/interface';

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
    is_company?: ICompanyPerson | null | undefined;
    is_advisor?: IAdvisor | null | undefined;
}

interface AuthContextValues {
    me: UserAuthData | null;
    setAuthUser: (user: UserAuthData | null) => void;
    useLogout: () => void;
    getMeRefetch: () => void;
}

const initialState: AuthContextValues = {
    me: null,
    setAuthUser: () => {},
    useLogout: () => {},
    getMeRefetch: () => {},
};

export const AuthenticationContext = createContext<AuthContextValues>(initialState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const { data, refetch: getMeRefetch, error } = useGetMe();
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
        await CookieManager.clearTokenFromCookie();
        await router.push('/');
        await setMe(null);
        // await client.resetStore();
    }

    return <AuthenticationContext.Provider value={{ me: me, setAuthUser, useLogout, getMeRefetch }}>{children}</AuthenticationContext.Provider>;
};

export default AuthContextProvider;
