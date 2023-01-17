import { ApolloError, gql, useQuery } from '@apollo/client';

export const GET_ACCOUNTS = gql`
    query GetAccounts {
        getAccounts {
            email
            is_advisor {
                name
                last_name
            }
            is_company {
                full_name
            }
            is_student {
                name
                lastname
            }
            role
        }
    }
`;

interface Result {
    loading: boolean;
    error: ApolloError | undefined;
    data: any;
}

export function useQueryAccounts(): Result {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(GET_ACCOUNTS);

    return { data, loading, error };
}
