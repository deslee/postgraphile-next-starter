import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  (global as any).fetch = fetch
}

export interface InitApolloOptions {
    getToken: () => string | undefined;
    getXsrfId: () => string | undefined;
    link?: ApolloLink
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

function create(initialState: NormalizedCacheObject, { getToken, link, getXsrfId }: InitApolloOptions) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        // if SSR, provide link
        link: link ? link : ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        ),
                    );
                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            setContext((_, { headers }) => {
                const token = getToken()
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : '',
                        'X-XSRF-ID': getXsrfId()
                    }
                }
            }),
            createHttpLink({
                uri: '/graphql',
                credentials: 'same-origin'
            })
        ]),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState: NormalizedCacheObject, options: InitApolloOptions) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}