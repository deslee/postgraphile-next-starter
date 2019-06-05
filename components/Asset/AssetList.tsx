import * as React from 'react';
import FilePicker from "../FilePicker";
import {
    ASSET_LIST_QUERY,
    CreateAssetInjectedProps,
    CreateAssetVariables,
    GetAssetListResult,
    GetAssetListVariables,
    withCreateAsset
} from "./AssetQueries";
import {Query} from "react-apollo";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import {assetDataToJson, AssetWithData, jsonToAssetData} from "./AssetData";
import AssetListCard from "./AssetListCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import posed, { PoseGroup } from 'react-pose';
const Item = posed(Grid)();
import {EditAssetDialog} from "./EditAssetForm";

interface ComponentProps {

}

interface Props extends ComponentProps, CreateAssetInjectedProps {

}

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4)
    },
    uploadButton: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginBottom: theme.spacing(2)
    },
    container: {

    },
    empty: {
    }
}));

const AssetList = ({ createAsset }: Props) => {
    const classes = useStyles();
    const [assetEditing, setAssetEditing] = React.useState<AssetWithData|undefined>(undefined);
    const [uploadAssetState, setUploadAssetState] = React.useState<['NONE'|'UPLOADING'|'UPLOADED'|'ERROR', string?]>(['NONE']);

    const handleFilePicked = async (files: FileList | null) => {
        const file = files.length > 0 ? files[0] : undefined;
        if (!file) {
            return;
        }
        const variables: CreateAssetVariables = {
            input: {
                asset: {
                    state: 'CREATED',
                    data: assetDataToJson({name: file.name, fileName: file.name, privateNotes: ''}),
                    uri: file as any
                }
            }
        };

        setUploadAssetState(['UPLOADING', '0']);
        try {
            const response = await createAsset({
                variables,
                refetchQueries: [
                    {
                        query: ASSET_LIST_QUERY
                    }
                ],
                context: {
                    fetchOptions: {
                        useUpload: true,
                        onProgress: (ev: ProgressEvent) => {
                            setUploadAssetState(['UPLOADING', (ev.loaded / ev.total * 100).toString()]);
                        }
                    }
                }
            });
            if (response) {
                setUploadAssetState(['UPLOADED', response.data.createAsset.asset.uri]);
            } else {
                setUploadAssetState(['ERROR'])
            }
        } catch(e) {
            setUploadAssetState(['ERROR'])
        }
    };

    const renderAssetList = (assets: AssetWithData[]) => {
        return <Grid container spacing={2}>
            <PoseGroup>
                {assets.map(asset => <Item key={asset.id} item>
                    <AssetListCard actions={true} onEditClicked={() => setAssetEditing(asset)} asset={asset} />
                </Item>)}
            </PoseGroup>
        </Grid>
    };

    return <Container className={classes.container}>
        <Paper className={classes.paper}>
            <FilePicker className={classes.uploadButton} variant="contained" color="primary" handleFilePicked={handleFilePicked}>Upload</FilePicker>
            {uploadAssetState[0] === 'UPLOADING' &&  <LinearProgress variant="determinate"  value={parseInt(uploadAssetState[1])} />}
            <Divider className={classes.divider} />
            <Query<GetAssetListResult, GetAssetListVariables> query={ASSET_LIST_QUERY}>{({loading, data: {assets = []}}) =>
            loading ? <p>Loading</p> : assets.length ? renderAssetList(assets.map(asset => ({...asset, data: jsonToAssetData(asset.data)}))) : <p className={classes.empty}>There seems to be nothing here.</p>
            }</Query>
        </Paper>
        <EditAssetDialog assetEditing={assetEditing} onClose={() => setAssetEditing(undefined)} />
    </Container>
};

export default withCreateAsset<ComponentProps>()(AssetList);
