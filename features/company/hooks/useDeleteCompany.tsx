import { gql, useMutation } from '@apollo/client';
import { ICompany } from '@features/company/interfaces';

const DELETE_COMPANY = gql`
    mutation DeleteCompany($company_id: String!) {
        deleteCompany(delete_by_id: $company_id) {
            name_th
        }
    }
`;

interface DeleteCompanyResponse {
    deleteCompany: ICompany;
}

interface DeleteCompanyResponsePayload {
    company_id: string;
}

export const useDeleteCompany = () => {
    return useMutation<DeleteCompanyResponse, DeleteCompanyResponsePayload>(DELETE_COMPANY);
};
