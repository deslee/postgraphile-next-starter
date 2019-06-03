import * as React from 'react';
import App, { NextAppContext, Container } from 'next/app';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import withApollo from '../utils/withApollo';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import theme from '../theme';
import { SnackbarProvider } from 'notistack';
import { DialogProvider } from '../utils/DialogContext';

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
            <style jsx global>{`
                body {
                    padding: 0;
                    margin: 0;
                }
            `}</style>
            <ApolloProvider client={apolloClient}>
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                    <ThemeProvider theme={theme}>
                        <DialogProvider>
                            <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </DialogProvider>
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </ApolloProvider>
        </Container>
    }
}


export default withApollo(CustomApp);