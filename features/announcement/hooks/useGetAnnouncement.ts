import { useQuery } from '@apollo/client';
import { GET_ANNOUNCEMENTS, GetAnnouncementsResponse } from '../types';

export const useGetAnnouncements = () => {
    return useQuery<GetAnnouncementsResponse>(GET_ANNOUNCEMENTS, { pollInterval: 500 });
};
