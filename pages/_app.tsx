import '../styles/globals.scss';
import PageLayout from '../components/layout/PageLayout';
import { ApolloProvider } from '@apollo/client';
import client from '@lib/apollo';
import AuthContextProvider from '@context/AuthContextProvider';
import { store } from '@store';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

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
            <AuthContextProvider>
                <Provider store={store}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </Provider>
            </AuthContextProvider>
        </ApolloProvider>
    );
}
