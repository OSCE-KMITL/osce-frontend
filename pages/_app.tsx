import '../styles/globals.css';
import PageLayout from '../components/layout/PageLayout';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/apollo-client';
import AuthContextProvider from '../context/AuthContextProvider';
import AuthenticatedGuard from '../components/Guard/AuthenticatedGuard';
import { store } from '../state/store';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <Provider store={store}>
                    <PageLayout>
                        <AuthenticatedGuard>
                            <Component {...pageProps} />
                        </AuthenticatedGuard>
                    </PageLayout>
                </Provider>
            </AuthContextProvider>
        </ApolloProvider>
    );
}
