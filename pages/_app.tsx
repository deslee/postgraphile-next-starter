import * as React from 'react';
import App, { NextAppContext, Container } from 'next/app';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import withApollo from '../utils/withApollo';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/styles';

interface Props {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

interface State {

}


const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

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
            <style jsx global>{`
                body {
                    padding: 0;
                    margin: 0;
                }
            `}</style>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ApolloProvider>
        </Container>
    }
}


export default withApollo(CustomApp);