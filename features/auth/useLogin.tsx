import { gql, useMutation } from "@apollo/client";
import { MutationSignInArgs } from "../../src/__generated__/graphql";

interface AuthData {
  id: string;
  email: string;
  token: string;
  role: string;
}
export interface LoginInput {
  email: string;
  password: string;
}

export const LOGIN = gql`
  mutation SignIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email) {
      email
      token
      role
    }
  }
`;

export const useLogin = () => {
  return  useMutation<AuthData, MutationSignInArgs>(LOGIN);
};
