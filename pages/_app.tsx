import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/apollo-client';
import { SessionProvider } from 'next-auth/react';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </ApolloProvider>
    );
}
