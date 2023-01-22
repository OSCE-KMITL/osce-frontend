import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps;

const AnnouncementContent: FunctionComponent<Props> = (props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1 className="text-3xl">Hello {id} </h1>
            <h1 onClick={() => router.back()} className="text-xl">
                Back{' '}
            </h1>
        </div>
    );
};

export default AnnouncementContent;
