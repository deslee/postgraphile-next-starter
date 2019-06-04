import * as React from 'react';
import { NextContext } from 'next';
import Layout from '../components/Layout';
import AssetList from "../components/Asset/AssetList";
import {CustomNextContext} from "../utils/CustomNextContext";
import checkLoggedIn from "../utils/checkLoggedIn";
import redirect from "../utils/redirect";

interface InitialProps {

}

interface Props extends InitialProps {

}

class Assets extends React.Component<Props> {
    static async getInitialProps(ctx: CustomNextContext): Promise<InitialProps> {
        const loggedInUser = await checkLoggedIn(ctx.apolloClient);
        if (!loggedInUser) {
            redirect(ctx, "/login");
        }
        return {}
    }

    render() {
        return <Layout title="Assets">
            <AssetList />
        </Layout>
    }
}

export default Assets;