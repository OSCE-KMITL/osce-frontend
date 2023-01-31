import React, { FunctionComponent } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface OwnProps {}

type Props = OwnProps;

const CoopRegisterPage: FunctionComponent<Props> = (props) => {
    const { data, status } = useSession();

    return (
        <div>
            <Image className={'rounded-xl'} src={data?.user.image} alt={data?.user.email} width={200} height={200}></Image>
            <h1>{data?.user.name} || null</h1>
        </div>
    );
};

export default CoopRegisterPage;
