import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../state/store';
import { AnnouncementProps } from '../../features/announcement/types';
import { useGetAnnouncements } from '../../features/announcement/hooks/useGetAnnouncement';

interface OwnProps {}

type Props = OwnProps;

const AnnouncementContent: FunctionComponent<Props> = () => {
    const router = useRouter();
    const { id } = router.query;
    const { announcements } = useAppSelector((state) => state.announcement);
    const [content, setContent] = useState<AnnouncementProps | null>(null);
    const { refetch } = useGetAnnouncements();
    useEffect(() => {
        if (!announcements) {
            router.push('/announcement');
            refetch().then();
        } else {
            const ann = announcements.find((data) => data.id === id);
            setContent(ann);
        }
    }, [announcements]);

    return (
        <div className="font-primary_noto">
            <h1 onClick={() => router.back()} className="text-xl">
                Back{' '}
            </h1>
            <h1 className="text-xl">{content?.title}</h1>
        </div>
    );
};

export default AnnouncementContent;
