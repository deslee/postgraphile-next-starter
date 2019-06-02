import * as React from 'react';
import { MutateProps, withApollo, graphql } from 'react-apollo';
import { Asset, CreateAssetPayload, AssetInput, CreateAssetInput } from 'server/embeddedGraphql/bindings/generated';
import gql from 'graphql-tag';
import { Input, Button, Typography } from '@material-ui/core';
import { useState, useContext } from 'react';

interface ComponentProps {

}
interface Props extends ComponentProps, MutateProps<CreateAssetResponse> {

}


const UploadComponent: React.FC<Props> = (props: Props) => {
    const { mutate } = props;
    const [filename, setFilename] = useState<string>("Select file");
    const [loading, setLoading] = useState<boolean>(false);
    const [uri, setUri] = useState<string>('');

    return <div>
        <form
            onSubmit={async event => {
                event.preventDefault();
                setLoading(true);
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

                try {
                    const response = await mutate({
                        variables: {
                            input
                        }
                    })
                    if (response) {
                        setUri(response.data.createAsset.asset.uri)
                    }
                }
                finally {
                    setLoading(false);
                }
            }}
        >
            {filename}<br />
            <Input type="text" name="name" required />
            <input type="file" name="file" required onChange={e => {
                const fileName =
                    e.target.files.length > 0 ? e.target.files[0].name : "";
            }} />
            <Button type="submit">Submit</Button><br />
            {uri && <Typography>Uploaded:: <a target="_blank" href={`${process.env.s3bucketUrl}/${uri}`}>{`${process.env.s3bucketUrl}/${uri}`}</a></Typography>}

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
            uri
        }
    }
}
`)(UploadComponent)