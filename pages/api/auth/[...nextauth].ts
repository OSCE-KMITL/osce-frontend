import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import useAxios from '../../../lib/axios';
import { AUTH_SECRET } from '../../../constants';

export default NextAuth({
    session: { strategy: 'jwt' },
    secret: AUTH_SECRET,
    cookies: {
        sessionToken: {
            name: 'Authentication',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
    },

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req): Promise<any> {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const request = await useAxios({
                    data: {
                        query: `mutation SignIn( $email: String! ,$password: String!,) {
                      signIn( email: $email ,password: $password) {
                            id
                            email
                            token
                            role
                        }
                    }`,
                        variables: {
                            email: credentials.email,
                            password: credentials.password,
                        },
                    },
                });

                const { data } = request;
                const result = data.data.signIn;

                if (data.errors) {
                    throw new Error(data.errors[0].message);
                }

                return result;
            },
        }),
    ],
    debug: false,
    callbacks: {
        jwt({ token, account, isNewUser, profile, user }) {
            if (user) {
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.user = token;
            }
            return session; // The return type will match the one returned in `useSession()`
        },
    },
});
