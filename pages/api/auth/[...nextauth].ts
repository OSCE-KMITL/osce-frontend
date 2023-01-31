import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../constants';

export const authOptions: any = {
    // Configure one or more authentication providers

    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === 'google') {
                return profile.email_verified && profile.email.endsWith('@kmitl.ac.th') && profile.email.startsWith(['63', '64']);
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
};
export default NextAuth(authOptions);
