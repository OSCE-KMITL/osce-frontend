import { gql, useQuery } from '@apollo/client';

export interface GetMeResponse {
    getMe: {
        id: string;
        email: string;
        role: string;
    };
}
export const GET_ME = gql`
    query Query {
        getMe {
            id
            email
            role
        }
    }
`;

export const useGetMe = () => {
    return useQuery<GetMeResponse>(GET_ME);
};
