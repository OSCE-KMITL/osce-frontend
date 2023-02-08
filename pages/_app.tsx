import '../styles/globals.css';
import PageLayout from '../components/layout/PageLayout';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/apollo-client';
import AuthContextProvider from '../context/AuthContextProvider';
import AuthenticatedGuard from '../components/Guard/AuthenticatedGuard';
import { store } from '../state/store';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';

const colorTheme = {
    primary_100: '#FFEEE6',
    primary_200: '#FFCAAE',
    primary_300: '#FFA576',
    primary_400: '#FF813E',
    primary_500: '#e35205',
    primary_600: '#B03D00',
    primary_700: '#7D2B00',
    primary_800: '#4A1A00',
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={pageProps.session}>
                <AuthContextProvider>
                    <Provider store={store}>
                        <PageLayout>
                            <AuthenticatedGuard>
                                <Component {...pageProps} />
                            </AuthenticatedGuard>
                        </PageLayout>
                    </Provider>
                </AuthContextProvider>
            </SessionProvider>
        </ApolloProvider>
    );
}
