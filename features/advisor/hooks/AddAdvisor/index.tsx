import { gql, useMutation } from '@apollo/client';
import { RoleOption } from '@constants/RoleOptions';
import { IAccount } from '@features/user-account/interfaces';

export interface RegisterAdvisorProps {
    name_prefix: string;
    name: string;
    last_name: string;
    email: string;
    is_committee: RoleOption;
}

export const ADD_ADVISOR = gql`
    mutation RegisterAdvisor($payload: AdvisorAccountInput!) {
        registerAdvisor(advisorAccountInfo: $payload) {
            id
        }
    }
`;

interface PayloadAddAdvisor {
    payload: RegisterAdvisorProps;
}
interface AddAdvisorResponse {
    response: IAccount;
}
export const useAddAdvisor = () => {
    return useMutation<AddAdvisorResponse, PayloadAddAdvisor>(ADD_ADVISOR);
};
