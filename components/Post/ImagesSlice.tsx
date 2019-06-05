import * as React from 'react'
import * as mime from 'mime-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import {ImagesSlice, PostInputWithData} from './PostData';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Query from "react-apollo/Query";
import {
    ASSET_LIST_QUERY,
    GetAssetListResult,
    GetAssetListVariables
} from "../Asset/AssetQueries";
import {AssetWithData, jsonToAssetData} from "../Asset/AssetData";
import Grid from "@material-ui/core/Grid";
import AssetListCard from "../Asset/AssetListCard";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {connect, FieldArray, FormikContext} from 'formik';
import {Asset} from "../../server/embeddedGraphql/bindings";
import CardActions from "@material-ui/core/CardActions";
import posed, { PoseGroup } from 'react-pose';

const useStyles = makeStyles(theme => ({
    addImageButton: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

interface ComponentProps {
    slice: ImagesSlice;
    name: string;
}

type Props = ComponentProps & { formik: FormikContext<PostInputWithData> };

const assetToAssetWithData: (asset: Asset) => AssetWithData = asset =>  ({...asset, data: jsonToAssetData(asset.data)} as AssetWithData);

const useDialogStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    empty: {
    }
}));


const SelectImageDialog = ({open, close, onAdded, assets}: {open: boolean, close: () => void, onAdded: (asset: AssetWithData) => void, assets: AssetWithData[]}) => {
    const classes = useDialogStyles();

    const renderAssetList = (assets: AssetWithData[]) => {
        return <Grid container spacing={2}>
            {assets.map(asset => <Grid item key={asset.id}><AssetListCard onAssetSelected={() => onAdded(asset)} asset={asset} /></Grid>)}
        </Grid>
    };

    return <Dialog open={open} onClose={close} aria-labelledby="Select an image" fullScreen>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={close} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Select an image
                </Typography>
            </Toolbar>
        </AppBar>
        <DialogContent>
            {assets.length ? renderAssetList(assets) :
                <p className={classes.empty}>There seems to be nothing here.</p>}
        </DialogContent>
    </Dialog>
}

const Item = posed(Grid)();

const ImagesSliceComponent = ({ formik: { setFieldValue, values }, slice, name }: Props) => {
    const [selectImageDialogOpen, setSelectImageDialogOpen] = React.useState(false);
    const classes = useStyles();
    const imageAssetIds = slice.assetIds || [];

    const addAssetToSlice = (asset: AssetWithData) => {
        const nextIdx = imageAssetIds.length;
        setFieldValue(`${name}.assetIds[${nextIdx}]`, asset.id)
        setSelectImageDialogOpen(false)
    };

    return <Query<GetAssetListResult, GetAssetListVariables> query={ASSET_LIST_QUERY}>{({ loading, data }) => <>
        {data && data.assets && <>
            <FieldArray name={`${name}.assetIds`} render={({ move, swap, push, insert, unshift, pop, remove }) => <Grid container spacing={2}>
                <PoseGroup>{imageAssetIds.map(id => data.assets.find(a => a.id === id)).filter(a => a).map(asset => assetToAssetWithData(asset)).map((asset, idx) => <Item item key={asset.id}>
                        <AssetListCard asset={asset} actions={<CardActions className={classes.cardActions}>
                            <Button size="small" onClick={() => idx > 0 && move(idx, idx - 1)}>Back</Button>
                            <Button size="small" onClick={() => remove(idx)}>Delete</Button>
                            <Button size="small" onClick={() => idx < imageAssetIds.length - 1 && move(idx, idx + 1)}>Forward</Button>
                        </CardActions>} />
                    </Item>
                )}</PoseGroup>
            </Grid>
            }/>
            <Button
                className={classes.addImageButton}
                size="medium"
                onClick={() => setSelectImageDialogOpen(true)}
                aria-label="Add Image"
            ><AddIcon />Add Image
            </Button>
            {selectImageDialogOpen && <SelectImageDialog
                open={selectImageDialogOpen}
                close={() => setSelectImageDialogOpen(false)}
                onAdded={addAssetToSlice}
                assets={data.assets.map(assetToAssetWithData).filter(a => imageAssetIds.indexOf(a.id) === -1).filter(t => mime.lookup(t.uri).toString().indexOf('image') === 0)}
            />}
        </>}

        {loading && <Typography>Loading...</Typography>}

    </>}</Query>
};

export default connect<ComponentProps>(ImagesSliceComponent);
