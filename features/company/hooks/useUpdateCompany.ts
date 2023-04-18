import { gql, useMutation } from '@apollo/client';

export const UPDATE_COMPANY = gql`
    mutation UpdateCompany($updateInput: UpdateCompanyInput!) {
        updateCompany(update_input: $updateInput) {
            id
        }
    }
`;

export interface UpdateCompanyResponse {
    updateCompany: {
        id: string;
    };
}
export interface UpdateCompanyInput {
    updateInput: {
        id: string;
        address: string;
        business_type: string;
        district: string;
        name_eng: string;
        name_th: string;
        phone_number: string;
        postal_code: string;
        province: string;
        sub_district: string;
        website_url: string;
    };
}

export const useUpdateCompany = () => {
    return useMutation<UpdateCompanyResponse, UpdateCompanyInput>(UPDATE_COMPANY);
};
