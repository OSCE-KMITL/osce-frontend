import React, { FunctionComponent } from 'react';

interface AvartarProp {
    email: string;
}

type Props = AvartarProp;

const UserAvatar: FunctionComponent<Props> = ({ email }) => {
    return (
        <div className={'font-bold text-white text-md px-2 py-1 rounded-md bg-white flex items-center bg-primary-500 justify-center font-mono'}>{email}</div>
    );
};

export default UserAvatar;
