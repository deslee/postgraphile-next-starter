import * as React from 'react';
import App, { NextAppContext, Container } from 'next/app';

interface Props {

}

interface State {

}

export default class CustomApp extends App<Props, State> {
    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps: any = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props;

        return <Container>
            <Component {...pageProps} />
        </Container>
    }
}