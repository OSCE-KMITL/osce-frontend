import { ApolloError, gql, useQuery } from '@apollo/client';
import { IStudent } from '@features/student/interfaces/Student';

export const GET_ACCOUNTS = gql`
    query getAccounts {
        getAccounts {
            id
            email
            created_at
            profile_image
            role
            status
            updated_at
            is_advisor {
                name
                last_name
                is_committee
                faculty
                advisor_id
            }
        }
    }
`;

export const GET_ACCOUNT_BY_ID = gql`
    query GetAccount($accountId: String!) {
        getAccount(account_id: $accountId) {
            id
            email
            password
            role
            status
            created_at
            updated_at
            is_advisor {
                advisor_id
                name
                last_name
                faculty
                is_committee
                created_at
                updated_at
            }
            is_company {
                company_person_id
                full_name
                job_title
                is_coordinator
                company_id {
                    id
                    name
                    address
                    phone_number
                    website_url
                    business_type
                    created_at
                    updated_at
                }
                created_at
                updated_at
            }
            is_student {
                student_id
                name
                lastname
            }
        }
    }
`;

interface Result {
    loading: boolean;
    error: ApolloError | undefined;
    data: any;
}

export interface AccountProps {
    id: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
    is_advisor?: {
        advisor_id: string;
        name: string;
        last_name: string;
        faculty: string;
        is_committee: string;
        created_at: string;
        updated_at: string;
    };
    is_company?: {
        company_person_id: string;
        full_name: string;
        job_title: string;
        is_coordinator: string;
        company_id: {
            id: string;
            name: string;
            address: string;
            phone_number: string;
            website_url: string;
            business_type: string;
            created_at: string;
            updated_at: string;
        };
        created_at: string;
        updated_at: string;
    };
    is_student?: IStudent;
}

export interface AccountResponse {
    getAccount: AccountProps[] | null;
}

export function useGetAccounts() {
    return useQuery(GET_ACCOUNTS);
}

export function useQueryAccount({ accountId: string }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery<AccountResponse>(GET_ACCOUNT_BY_ID, { variables: { accountId: string } });

    return { data, loading, error };
}
