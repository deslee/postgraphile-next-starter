import * as React from 'react';
import Document, { NextDocumentContext, Html, NextScript, Head, Main } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: NextDocumentContext) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets();

        // slurp the style sheets out of the page
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />)
        })

        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps, styles: <>{sheets.getStyleElement()} {flush() || null}</> }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
                    <style>{`.ReactModal__Overlay {
                        z-index: 2200 !important;
                    }`}</style>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}