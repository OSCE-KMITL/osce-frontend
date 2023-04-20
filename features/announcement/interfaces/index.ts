import { gql } from '@apollo/client';
import { IAdvisor } from '@features/advisor/interface';

export interface AnnouncementProps {
    id: string;
    title: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    advisor_id: IAdvisor;
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
