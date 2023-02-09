import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { API_URI, TOKEN_NAME } from '../../constants';
import { setContext } from '@apollo/client/link/context';
import { CookieManager } from '../../utils/CookieManager';
import { createUploadLink } from 'apollo-upload-client';

const http_link = createUploadLink({
    uri: API_URI,
});

const auth_link = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    if (typeof window !== 'undefined') {
        const token = CookieManager.getCookieWithToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    }
    return {
        headers: {
            ...headers,
            authorization: '',
        },
    };
});
const uploadLink = createUploadLink({headers:{}})
const client = new ApolloClient({
    link: auth_link.concat(http_link),
    cache: new InMemoryCache(),
});

export default client;
