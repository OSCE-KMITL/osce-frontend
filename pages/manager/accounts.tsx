import React, { FC } from 'react';
import withAuth from '@components/withAuth/WithAuth';

interface OwnProps {}

type Props = OwnProps;

const AccountManager: FC<Props> = (props) => {
    return (
        <>
            <h1>this page has not implemented !</h1>
        </>
    );
};

export default withAuth(AccountManager);
