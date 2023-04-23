import { gql } from '@apollo/client';

export interface AnnouncementProps {
    id: string;
    title: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    advisor_id?: IAdvisor | null;
}

export interface GetAnnouncementsResponse {
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
