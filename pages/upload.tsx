import * as React from 'react';
import { MutateProps, withApollo, graphql } from 'react-apollo';
import { Asset, CreateAssetPayload, AssetInput, CreateAssetInput } from 'server/embeddedGraphql/bindings/generated';
import gql from 'graphql-tag';
import { Input, Button, Typography } from '@material-ui/core';
import { useState } from 'react';

interface ComponentProps {

}
interface Props extends ComponentProps, MutateProps<CreateAssetResponse> {

}


const UploadComponent: React.FC<Props> = (props: Props) => {
    const { mutate } = props;
    const [filename, setFilename] = useState<string>("Select file");
    const [loading, setLoading] = useState<boolean>(false);

    return <div>
        <form
            onSubmit={async event => {
                event.preventDefault();
                const target = event.target;
                const fd = new FormData(event.target as any);
                const name = fd.get("name")
                const file = fd.get("file");

                const input: CreateAssetInput = {
                    asset: {
                        state: 'CREATED',
                        siteId: 2,
                        data: JSON.stringify({ name }),
                        uri: file as any
                    }
                }

                await mutate({
                    variables: {
                        input
                    }
                })
            }}
        >
            {filename}<br />
            <Input type="text" name="name" required />
            <input type="file" name="file" required onChange={e => {
                const fileName =
                    e.target.files.length > 0 ? e.target.files[0].name : "";
            }} />

            <Button type="submit">Submit</Button>
        </form>
        {loading && <Typography>Loading...</Typography>}
    </div>

}

interface CreateAssetResponse {
    createAsset: CreateAssetPayload
}
export default graphql<ComponentProps, CreateAssetResponse>(gql`
mutation createAsset($input: CreateAssetInput!) {
    createAsset(input: $input) {
        asset {
            id
            siteId
        }
    }
}
`)(UploadComponent)