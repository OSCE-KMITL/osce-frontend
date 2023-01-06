import { ApolloError, gql, useQuery } from "@apollo/client";
import accounts from "../../../pages/accounts";
import { Account } from "../../../src/__generated__/graphql";

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    getAccounts {
      id
      email
      role

      is_advisor {
        name
      }
      is_company {
        full_name
      }
      is_student {
        name
      }
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
