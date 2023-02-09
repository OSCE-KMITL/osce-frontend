import { ApolloError, gql, useQuery } from '@apollo/client';

export const GET_ALL_COMPANIES = gql`
    query GetAllCompanies {
        getAllCompanies {
            id
            name_th
            name_eng
            address
            sub_district
            district
            province
            postal_code
            phone_number
            website_url
            business_type
            created_at
            updated_at
            company_persons {
                company_person_id
                full_name
                job_title
                is_coordinator
                created_at
                updated_at
            }
            job {
                id
            }
        }
    }
`;

export interface CompanyProps {
    id: string;
    name_th: string;
    name_eng: string;
    address: string;
    sub_district: string;
    district: string;
    province: string;
    postal_code: string;
    phone_number: string;
    website_url: string;
    business_type: string;
    company_persons: {
        company_person_id: string;
        full_name: string;
        job_title: string;
        is_coordinator: string;
    };
    job: {
        id: string;
    };
}

export interface CompanyResponses {
    getAllCompanies: CompanyProps[] | null;
}

export function useGetAllCompany() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery<CompanyResponses>(GET_ALL_COMPANIES);

    return { data, loading, error };
}
