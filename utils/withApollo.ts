import * as React from 'react';
import * as cookie from 'cookie';
import { getDataFromTree, renderToStringWithData } from 'react-apollo'
import Head from 'next/head'
import { default as NextApp, NextAppContext, Container, DefaultAppIProps, AppProps } from 'next/app';

import initApollo from './initApollo'
import { IncomingMessage } from 'http';
import { CustomApp } from '../pages/_app';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { CustomRequest } from '../server/CustomRequestResponse';
import { AppContext } from './AppContext';

function parseCookies(req?: IncomingMessage, options = {}) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

const withApollo = (App: typeof CustomApp) => {
    return class WithData extends React.Component<AppProps & DefaultAppIProps> {
        apolloClient: ApolloClient<NormalizedCacheObject>;
        appContext: AppContext;
        static async getInitialProps(ctx: NextAppContext) {
            const {
                Component,
                router,
                ctx: { req, res }
            } = ctx
            const apollo = initApollo(
                {},
                {
                    getToken: () => parseCookies(req).token,
                    getXsrfId: () => parseCookies(req)['X-XSRF-ID'],
                    link: req && (req as any).link
                }
            )

            //ctx.ctx.apolloClient = apollo
            let appProps: DefaultAppIProps = {
                pageProps: undefined
            }

            if (CustomApp.getInitialProps) {
                appProps = await CustomApp.getInitialProps(ctx)
            }

            if (res && res.finished) {
                // When redirecting, the response is finished.
                // No point in continuing to render
                return {}
            }

            let appContext: AppContext;
            if (!process.browser) {
                const config = (req as CustomRequest).config
                appContext = {
                    s3Url: `https://${config.awsS3UploadBucket}.s3.amazonaws.com`
                }

                // Run all graphql queries in the component tree
                // and extract the resulting data
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        React.createElement(
                            App,
                            {
                                ...appProps,
                                Component,
                                router,
                                apolloClient: apollo,
                                appContext
                            }
                        )
                    )
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                    console.error('Error while running `getDataFromTree`', error)
                }

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind()
            }

            // Extract query data from the Apollo's store
            const apolloState = apollo.cache.extract()

            return {
                ...appProps,
                apolloState,
                appContext
            }
        }

        constructor(props: any) {
            super(props)
            // `getDataFromTree` renders the component first, the client is passed off as a property.
            // After that rendering is done using Next's normal rendering pipeline
            this.apolloClient = initApollo(props.apolloState, {
                getToken: () => parseCookies().token,
                getXsrfId: () => parseCookies()['X-XSRF-ID'],
            })
            this.appContext = props.appContext;
        }

        render() {
            return React.createElement(App, {
                ...this.props,
                apolloClient: this.apolloClient,
                appContext: this.appContext
            });
    }
    }
}

export default withApollo;