import { gql, useMutation } from '@apollo/client';
import { IUpdateAdvisorArgs } from '@features/advisor/hooks/update/useUpdateAdvisorState';
import { IAccount } from '@features/user-account/interfaces';

export const UPDATE_ADVISOR_ACCOUNT = gql`
    mutation UpdateAdvisorAccount($payload: UpdateAdvisorArgs!) {
        updateAdvisorAccount(updateInfo: $payload) {
            id
            email
        }
    }
`;

export interface UpdateAdvisorPayload {
    payload: IUpdateAdvisorArgs;
}

export interface UpdateAdvisorResponse {
    updateAdvisorAccount: IAccount;
}

export const useUpdateAdvisor = () => {
    return useMutation<UpdateAdvisorResponse, UpdateAdvisorPayload>(UPDATE_ADVISOR_ACCOUNT);
};
