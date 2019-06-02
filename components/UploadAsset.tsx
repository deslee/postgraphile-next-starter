import * as React from 'react';
import { MutateProps, withApollo, graphql } from 'react-apollo';
import { Asset, CreateAssetPayload, AssetInput, CreateAssetInput } from 'server/embeddedGraphql/bindings/generated';
import gql from 'graphql-tag';
import { Input, Button, Typography, makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';

interface ComponentProps {

}
interface Props extends ComponentProps, MutateProps<CreateAssetResponse, CreateAssetVariables> {

}

const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
    },
}));


const UploadAssetComponent: React.FC<Props> = (props: Props) => {
    const { mutate } = props;
    const [filename, setFilename] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [uri, setUri] = useState<string>('');
    const classes = useStyles();

    return <>
        <Typography variant="h2">Upload Asset</Typography>
        <Formik<any>
            initialValues={{}}
            onSubmit={async (values, action) => {
                setLoading(true);
                const fd = new FormData(event.target as any);
                const file = fd.get("file");

                const input: CreateAssetInput = {
                    asset: {
                        state: 'CREATED',
                        data: JSON.stringify({ name: values.name }),
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
                catch(e) {
                    action.setError(e.message);
                }
                finally {
                    setLoading(false);
                    action.setSubmitting(false);
                }
            }}
        >
        {({error, errors, touched}) => <Form>
            {error && <Typography className={classes.error}>{error}</Typography>}<br />
            <Field name="name" component={TextField} type="text" label="Name" required/><br />
            <Field name="file" component="input" type="file" label="file" onChange={e => {
                const fileName =
                    e.target.files.length > 0 ? e.target.files[0].name : "";
                setFilename(fileName);
            }} />            
            <Button type="submit">Submit</Button><br />
            {uri && <Typography>Uploaded:: <a target="_blank" href={`${process.env.s3bucketUrl}/${uri}`}>{`${process.env.s3bucketUrl}/${uri}`}</a></Typography>}
            {loading && <Typography>Loading...</Typography>}
        </Form>}</Formik>
    </>
}

interface CreateAssetVariables {
    input: CreateAssetInput
}
interface CreateAssetResponse {
    createAsset: CreateAssetPayload
}
export default graphql<ComponentProps, CreateAssetResponse, CreateAssetVariables>(gql`
mutation createAsset($input: CreateAssetInput!) {
    createAsset(input: $input) {
        asset {
            id
            state
            uri
        }
    }
}
`)(UploadAssetComponent)