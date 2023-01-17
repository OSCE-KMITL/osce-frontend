import { gql, useQuery } from '@apollo/client';
import { AnnouncementProps } from '../types';

export interface GetAnnouncementInput {
    withKey: {
        target: string;
        value: string;
    };
}

export interface GetAnnouncementByIdResponse {
    getAnnouncement: AnnouncementProps | null;
}
export const GET_ANNOUNCEMENT = gql`
    query GetAnnouncement($withKey: GetWithKeyInput!) {
        getAnnouncement(with_key: $withKey) {
            id
            title
            updatedAt
            description
            createdAt
            advisor_id {
                is_committee
                last_name
                name
                updated_at
                faculty
                created_at
                advisor_id
            }
        }
    }
`;

export function useGetPost(id: string) {
    return useQuery<GetAnnouncementByIdResponse, GetAnnouncementInput>(GET_ANNOUNCEMENT, {
        variables: {
            withKey: {
                target: 'id',
                value: id,
            },
        },
    });
}
