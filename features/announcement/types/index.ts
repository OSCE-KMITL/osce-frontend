import { gql } from '@apollo/client';

export interface AnnouncementProps {
    id: string;
    title: string;
    updatedAt: string;
    description: string;
    createdAt: string;
    advisor_id: {
        name: string;
        last_name: string;
    };
}

export interface GetAnnouncementResponse {
    getAnnouncements: AnnouncementProps[] | null;
}

export const GET_ANNOUNCEMENTS = gql`
    query GetAnnouncements {
        getAnnouncements {
            id
            title
            updatedAt
            description
            createdAt
            advisor_id {
                name
                last_name
            }
        }
    }
`;
