import React, { useContext, useEffect } from 'react';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { useRouter, Router } from 'next/router';

export const withAuth = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const AuthenticationComponent = (props: P) => {
        const { me } = useContext(AuthenticationContext);
        const router = useRouter();
        useEffect(() => {
            if (!me) {
                router.push('/auth/login');
            }
        }, []);

        return <Component {...props} />;
    };

    return AuthenticationComponent;
};
