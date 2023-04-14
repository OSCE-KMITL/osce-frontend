import { gql, useQuery } from '@apollo/client';
import { IAccount } from '@features/user-account/interfaces';

export const GET_ADVISOR_ACCOUNTS = gql`
    query getAdvisorAccounts {
        getAdvisorAccounts {
            role
            is_advisor {
                updated_at
                name_prefix
                name
                last_name
                is_committee
                faculty
                department
                created_at
                advisor_id
                students {
                    student_id
                    name_th
                    lastname_th
                    name_prefix
                }
            }
            profile_image
            status
            updated_at
            email
            id
            created_at
        }
    }
`;

export interface getAdvisorAccountsResponse {
    getAdvisorAccounts?: IAccount[];
}

export function getAdvisorAccounts() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<getAdvisorAccountsResponse>(GET_ADVISOR_ACCOUNTS, { pollInterval: 500 });
}
