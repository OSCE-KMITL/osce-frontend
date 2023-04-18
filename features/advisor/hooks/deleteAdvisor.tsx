import { gql, useMutation } from '@apollo/client';
import { IAccount } from '@features/user-account/interfaces';

export const DELETE_ADVISOR = gql`
    mutation DeleteAdvisorAccount($account_id: String!) {
        deleteAdvisorAccount(id: $account_id) {
            email
        }
    }
`;

export interface DeleteAdvisorResponse {
    deleteAdvisorAccount: IAccount;
}

export interface DeleteAdvisorPayload {
    account_id: string;
}
export function useDeleteAdvisor() {
    return useMutation<DeleteAdvisorResponse, DeleteAdvisorPayload>(DELETE_ADVISOR);
}
