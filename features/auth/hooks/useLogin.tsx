import { gql, useMutation } from '@apollo/client';
import { MutationSignInArgs } from '../../../src/__generated__/graphql';
import { RoleOption } from '../../../constants/RoleOptions';

export interface AuthResponse {
    signIn: {
        id: string;
        email: string;
        token: string;
        role: RoleOption;
    };
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
    return useMutation<AuthResponse, MutationSignInArgs>(LOGIN);
};
