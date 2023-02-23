import { gql, useMutation } from '@apollo/client';
import { AnnouncementProps } from '../interfaces';

const DELETE_POST = gql`
    mutation DeletePost($announcementId: String!) {
        deleteAnnouncement(announcement_id: $announcementId) {
            title
        }
    }
`;

export interface DeletePostArg {
    announcementId: string;
}
export interface DeletedResponse {
    deleteAnnouncement: AnnouncementProps;
}
export const useDeletePost = (id: string) => {
    return useMutation<DeletePostArg>(DELETE_POST, { variables: { announcementId: id } });
};
