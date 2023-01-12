import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/apollo-client';
import AuthContextProvider from '../context/AuthContextProvider';
import AuthenticatedGuard from '../components/Guard/AuthenticatedGuard';
import { store } from '../state/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <Provider store={store}>
                    <Layout>
                        <AuthenticatedGuard>
                            <Component {...pageProps} />
                        </AuthenticatedGuard>
                    </Layout>
                </Provider>
            </AuthContextProvider>
        </ApolloProvider>
    );
}
