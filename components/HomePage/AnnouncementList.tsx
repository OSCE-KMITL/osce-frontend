import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useGetAnnouncements } from '@features/announcement/hooks/useGetAnnouncement';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import { ENDPOINT_URI } from '@constants';
import { Divider } from 'antd';
import { formatDateToThai } from '../../utils/common';
import { useRouter } from 'next/router';

const AnnouncementList: FunctionComponent = (props) => {
    const { data: announcements, loading: announcements_loading, error: announcements_error } = useGetAnnouncements();
    const router = useRouter();

    if (announcements_loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (announcements_error) return <p>{announcements_error.message}</p>;

    return (
        <div className="h-[70%] flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <p className="font-semibold">ประกาศ</p>
            </div>
            <div className="w-full flex flex-col justify-center bg-white rounded-md">
                {announcements.getAnnouncements.slice(0, 5).map((announcement) => (
                    <div
                        onClick={() => router.push('/announcement/' + announcement.id)}
                        key={announcement.id}
                        className="px-4 pt-2 flex flex-col align-middle cursor-pointer"
                    >
                        <p> {announcement.title}</p>
                        <p className="text-md text-primary-500">{formatDateToThai(announcement.createdAt.toString())}</p>
                        <Divider />
                    </div>
                ))}
            </div>
            <div
                onClick={() => router.push('/announcement/')}
                className="gap-4 cursor-pointer border border-primary-500 border-1 w-1/6 text-center px-4 py-2 text-primary-500 rounded-md"
            >
                <p className="font-semibold">ดูเพิ่มเติม</p>
            </div>
        </div>
    );
};

export default AnnouncementList;
