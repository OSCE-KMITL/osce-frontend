import { useQuery } from '@apollo/client';
import { GET_ANNOUNCEMENTS, GetAnnouncementsResponse } from '../interfaces';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { storeAnnouncement } from '../announcement.slice';

export const useGetAnnouncements = () => {
    const dispatch = useDispatch();

    const { data, loading, error, refetch } = useQuery<GetAnnouncementsResponse>(GET_ANNOUNCEMENTS, { pollInterval: 500 });

    useEffect(() => {
        if (data) {
            dispatch(storeAnnouncement(data));
        }
    }, [data, error, refetch()]);
    useEffect(() => {
        if (error) {
            dispatch(storeAnnouncement(null));
        }
    }, [data, error, refetch()]);

    return { data, loading, error, refetch };
};
