import { useQuery } from '@apollo/client';
import { GET_ANNOUNCEMENTS, GetAnnouncementResponse } from '../types';

export const useGetAnnouncements = () => {
    return useQuery<GetAnnouncementResponse>(GET_ANNOUNCEMENTS, { pollInterval: 500 });
};
