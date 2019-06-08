import * as React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import {ImagesSlice, isImagesSlice, PostInputWithData, VideoSlice} from './PostData';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Query from "react-apollo/Query";
import {
    ASSET_LIST_QUERY,
    GetAssetListResult,
    GetAssetListVariables
} from "../Asset/AssetQueries";
import {assetFilter, AssetType, AssetWithData, jsonToAssetData} from "../Asset/AssetData";
import Grid from "@material-ui/core/Grid";
import AssetListCard from "../Asset/AssetListCard";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {connect, FieldArray, FormikContext} from 'formik';
import {Asset} from "../../schema";
import CardActions from "@material-ui/core/CardActions";
import posed, { PoseGroup } from 'react-pose';

const useStyles = makeStyles(theme => ({
    addAssetButton: {
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
    slice: ImagesSlice | VideoSlice;
    name: string;
    type: AssetType
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


const SelectAssetDialog = ({open, close, onAdded, assets}: {open: boolean, close: () => void, onAdded: (asset: AssetWithData) => void, assets: AssetWithData[]}) => {
    const classes = useDialogStyles();

    const renderAssetList = (assets: AssetWithData[]) => {
        return <Grid container spacing={2}>
            {assets.map(asset => <Grid item key={asset.id}><AssetListCard onAssetSelected={() => onAdded(asset)} asset={asset} /></Grid>)}
        </Grid>
    };

    return <Dialog open={open} onClose={close} aria-labelledby="Select an asset" fullScreen>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={close} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Select an asset
                </Typography>
            </Toolbar>
        </AppBar>
        <DialogContent>
            {assets.length ? renderAssetList(assets) :
                <p className={classes.empty}>There seems to be nothing here.</p>}
        </DialogContent>
    </Dialog>
};

const Item = posed(Grid)();

const AssetSliceComponent = ({ formik: { setFieldValue, values }, slice, name, type }: Props) => {
    const [selectAssetDialogOpen, setSelectAssetDialogOpen] = React.useState(false);
    const classes = useStyles();

    type amount = 'SINGLE' | 'MULTIPLE'
    const amount: amount = isImagesSlice(slice) ? 'MULTIPLE':'SINGLE';
    const assetIds = slice.assetIds || [];

    const addAssetToSlice = (asset: AssetWithData) => {
        const nextIdx = assetIds.length;
        setFieldValue(`${name}.assetIds[${amount === 'SINGLE' ? 0 : nextIdx}]`, asset.id);
        setSelectAssetDialogOpen(false)
    };

    return <Query<GetAssetListResult, GetAssetListVariables> query={ASSET_LIST_QUERY}>{({ loading, data }) => <>
        {data && data.assets && <>
            <FieldArray name={`${name}.assetIds`} render={({ move, swap, push, insert, unshift, pop, remove }) => <Grid container spacing={2}>
                <PoseGroup>{assetIds.map(id => data.assets.find(a => a.id === id)).filter(a => a).map(asset => assetToAssetWithData(asset)).map((asset, idx) => <Item item key={asset.id}>
                        <AssetListCard asset={asset} actions={<CardActions className={classes.cardActions}>
                            <Button size="small" onClick={() => idx > 0 && move(idx, idx - 1)}>Back</Button>
                            <Button size="small" onClick={() => remove(idx)}>Delete</Button>
                            <Button size="small" onClick={() => idx < assetIds.length - 1 && move(idx, idx + 1)}>Forward</Button>
                        </CardActions>} />
                    </Item>
                )}</PoseGroup>
            </Grid>
            }/>
            <Button
                className={classes.addAssetButton}
                size="medium"
                onClick={() => setSelectAssetDialogOpen(true)}
                aria-label={`${amount === 'SINGLE' ? 'Select' : 'Add'} Asset`}
            ><AddIcon />{`${amount === 'SINGLE' ? 'Select' : 'Add'} Asset`}
            </Button>
            {selectAssetDialogOpen && <SelectAssetDialog
                open={selectAssetDialogOpen}
                close={() => setSelectAssetDialogOpen(false)}
                onAdded={addAssetToSlice}
                assets={data.assets.map(assetToAssetWithData).filter(a => assetIds.indexOf(a.id) === -1).filter(assetFilter(type))}
            />}
        </>}

        {loading && <Typography>Loading...</Typography>}

    </>}</Query>
};

export default connect<ComponentProps>(AssetSliceComponent);
