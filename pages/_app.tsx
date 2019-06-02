import * as React from 'react';
import App, { NextAppContext, Container } from 'next/app';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import withApollo from '../utils/withApollo';
import { ApolloProvider } from 'react-apollo';

interface Props {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

interface State {

}

export class CustomApp extends App<Props, State> {
    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps: any = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps }
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode!.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, apolloClient } = this.props;

        return <Container>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Container>
    }
}


export default withApollo(CustomApp);