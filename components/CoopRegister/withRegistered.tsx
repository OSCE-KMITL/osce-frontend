import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { CoopStatus } from '../../features/student/interfaces/index';

const withProtected = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
        const router = useRouter();
        const { me } = useContext(AuthenticationContext);

        const apply_status = me?.is_student?.coop_status;

        React.useEffect(() => {
            if (apply_status === CoopStatus.APPLYING) {
                router.push('/student/63015208');
            }
        }, [apply_status, router]);

        if (me) {
            return <Component {...props} />;
        } else {
            return null;
        }
    };

    return AuthenticatedComponent;
};

export default withProtected;
