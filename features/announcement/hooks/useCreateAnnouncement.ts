import { gql, useMutation } from '@apollo/client';
import { AnnouncementProps, GET_ANNOUNCEMENTS } from '../types';

export interface CreateAnnouncementInput {
    announcementInfo: {
        title: string;
        desc: string;
    };
}
export const CREATE_ANNOUNCEMENT = gql`
    mutation CreatePost($announcementInfo: AnnouncementInput!) {
        createAnnouncement(announcement_info: $announcementInfo) {
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`;

export interface AnnouncementResponse {
    createAnnouncement: AnnouncementProps;
}

export const useCreateAnnouncement = () => {
    return useMutation<AnnouncementResponse, CreateAnnouncementInput>(CREATE_ANNOUNCEMENT);
};
