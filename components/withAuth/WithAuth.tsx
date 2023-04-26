import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { CookieManager } from '../../utils/CookieManager';

const withAuth = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter();

        const isAuthentication = CookieManager.getCookieWithToken();

        useEffect(() => {
            if (!isAuthentication) {
                router.push('/auth/login');
            }
        }, []);

        if (isAuthentication) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };

    return Auth;
};

export default withAuth;
