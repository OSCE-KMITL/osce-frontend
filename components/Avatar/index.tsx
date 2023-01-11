import React, { FunctionComponent } from 'react';
import { Avatar } from 'antd';

interface AvartarProp {
    email: string;
}

type Props = AvartarProp;

const UserAvatar: FunctionComponent<Props> = ({ email }) => {
    return (
        <Avatar size={55} className="bg-black text-2  flex items-center ">
            {email[0].toUpperCase()}
        </Avatar>
    );
};

export default UserAvatar;
