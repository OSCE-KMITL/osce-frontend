import React, { FC } from 'react';

interface GuardProps {
    me?: string;
    children: JSX.Element;
}

type Props = GuardProps;

const AuthenticatedGuard: FC<Props> = ({ me, children }) => {
    return <>{children}</>;
};

export default AuthenticatedGuard;
