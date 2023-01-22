import { gql, useQuery } from '@apollo/client';
import { RoleOption } from '../../../constants/RoleOptions';

export interface GetMeResponse {
    getMe: {
        id: string;
        email: string;
        role: RoleOption;
    };
}

export const FETCH_ME = {
    query: ` 
    query Query {
        getMe {
            id
            email
            role
        }
    }`,
};

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
