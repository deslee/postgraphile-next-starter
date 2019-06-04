import * as React from 'react';
import { NextContext } from 'next';
import Layout from '../components/Layout';
import AssetList from "../components/Asset/AssetList";

interface InitialProps {

}

interface Props extends InitialProps {

}

class Assets extends React.Component<Props> {
    static getInitialProps({ query }: NextContext): InitialProps {
        return {}
    }

    render() {
        return <Layout title="Assets">
            <AssetList />
        </Layout>
    }
}

export default Assets;