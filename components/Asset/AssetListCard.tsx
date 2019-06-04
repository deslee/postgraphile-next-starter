import * as React from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {Typography} from "@material-ui/core";
import {AssetWithData} from "./AssetData";
import * as mime from 'mime-types';
import * as dayjs from 'dayjs';
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import VideoIcon from "@material-ui/icons/VideoLibrary";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {useDialog} from "../../utils/DialogContext";
import {useSnackbar} from "notistack";
import {ASSET_LIST_QUERY, DELETE_ASSET_MUTATION, DeleteAssetInjectedProps, withDeleteAsset} from "./AssetQueries";
import Mutation from "react-apollo/Mutation";

interface ComponentProps {
    asset: AssetWithData
    onEditClicked: () => void
}

interface Props extends ComponentProps {
}

const useStyles = makeStyles(theme => {
    const cardAttribute = {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        display: 'block'
    };

    return {
        card: {
            width: 345,
        },
        cardMedia: {
            height: 150
        },
        fileName: {
            ...cardAttribute
        },
        fileType: {
            ...cardAttribute
        },
        date: {
            ...cardAttribute
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    }
});

type AssetType = 'IMAGE' | 'VIDEO' | 'PDF' | 'UNKNOWN'
const getAssetType: (fileName: string) => AssetType = fileName => {
    const mimeType = mime.lookup(fileName);
    if (mimeType !== false) {
        const firstPart = mimeType.split('/')[0];
        if (firstPart.toUpperCase() === 'IMAGE') {
            return 'IMAGE'
        } else if (firstPart.toUpperCase() === 'VIDEO') {
            return 'VIDEO'
        } else if (mimeType.toLowerCase() === 'application/pdf') {
            return 'PDF'
        } else {
            return 'UNKNOWN'
        }
    }
};

const AssetListCard = ({asset, onEditClicked}: Props) => {
    const classes = useStyles();
    const { confirmDialog } = useDialog();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const assetType = getAssetType(asset.uri);
    let cardMedia = <CardHeader
        className={classes.cardMedia}
        avatar={<IconButton aria-label="Unknown"><VideoIcon /></IconButton>}
        title={"unknown"}
    />;
    if (assetType === 'IMAGE') {
        cardMedia = <CardMedia
            className={classes.cardMedia}
            component={"img"}
            alt={asset.data.description}
            height="140"
            image={`${process.env.s3bucketUrl}/${asset.uri}`}
            title={asset.data.title}
        />
    }
    else if (assetType === 'VIDEO') {
        cardMedia = <CardHeader
            className={classes.cardMedia}
            avatar={<Avatar aria-label="Video">V</Avatar>}
            title={"Video"}
        />
    }
    else if (assetType === 'PDF') {
        cardMedia = <CardHeader
            className={classes.cardMedia}
            avatar={<Avatar aria-label="Pdf">P</Avatar>}
            title={"PDF"}
        />
    }

    return <Card className={classes.card}>
        <CardActionArea>
            {cardMedia}
            <CardContent>
                <Typography className={classes.fileName} variant="caption">{asset.data.name}</Typography>
                <Typography className={classes.fileType} variant="caption">{mime.lookup(asset.uri) || 'UNKNOWN'}</Typography>
                <Typography className={classes.date} variant="caption">{dayjs(asset.updatedAt).format('MM/DD/YYYY hh:mm:ss Z')}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
            <Button size="small" onClick={onEditClicked}>Edit <EditIcon className={classes.rightIcon}/></Button>
            <Mutation mutation={DELETE_ASSET_MUTATION} variables={{assetId: asset.id}} refetchQueries={[{query: ASSET_LIST_QUERY}]}>{(deleteAsset) =>
                <Button size="small" color="secondary" onClick={async () => {
                    if (await confirmDialog("Are you sure you want to delete this asset?")) {
                        try {
                            await deleteAsset();
                            enqueueSnackbar("Asset Deleted!", {variant: 'success'})
                        } catch (e) {
                            enqueueSnackbar(`Failed to delete asset: ${e.message}`, {variant: 'error'})
                        }
                    }
                }}>Delete <DeleteIcon className={classes.rightIcon}/></Button>
            }</Mutation>
        </CardActions>
    </Card>
};

export default AssetListCard;