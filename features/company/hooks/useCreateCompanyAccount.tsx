import { gql, useMutation } from '@apollo/client';
import { ICompany } from '@features/company/interfaces';
import { IAccount } from '@features/user-account/interfaces';

export const CREATE_COMPANY_ACCOUNT = gql`
    mutation Mutation($payload: CompanyPersonWithCompanyNameInput!) {
        registerCompanyPersonByCommittee(CompanyPersonAccountInfo: $payload) {
            id
        }
    }
`;

export interface IAddCompanyPersonState {
    company_name: string;
    email: string;
    full_name: string;
    is_coordinator: true;
    phone_number: string;
    job_title: string;
}

interface CreateCompanyResponse {
    registerCompanyPersonByCommittee: IAccount;
}
export interface CreateCompanyPayload {
    payload: IAddCompanyPersonState;
}

export const useCreateCompanyAccount = () => {
    return useMutation<CreateCompanyResponse, CreateCompanyPayload>(CREATE_COMPANY_ACCOUNT);
};
