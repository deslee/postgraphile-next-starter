import * as React from 'react';
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {AssetWithData, getAssetType} from "./Asset/AssetData";
import * as mime from 'mime-types';
import Lightbox from "./Lightbox";

const useStyle = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const SimpleModal = ({asset, onClose = () => {}}: {asset: AssetWithData, onClose: () => void}) => {
    const classes = useStyle();
    const type = getAssetType(asset.uri);
    const mimeType = mime.lookup(asset.uri);
    const cdnUri = `${process.env.s3bucketUrl}/${asset.uri}`;

    React.useEffect(() => {
        function keydown(e) {
            if(e.key=='Escape'||e.key=='Esc'||e.keyCode==27) {
                onClose();
                e.preventDefault();
                return false;
            }
        }
        window.addEventListener('keydown', keydown);
        return () => {
            window.removeEventListener('keydown', keydown);
        }
    }, []);

    if (type === 'IMAGE') {
        return <Lightbox
            open={true}
            initialIndex={0}
            images={[{url: cdnUri, alt: asset.description}]}
            onClose={onClose}
        />
    } else {
        return <Modal open={true}>
            <div className={classes.container}>
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                {type === 'AUDIO' && <ClickAwayListener onClickAway={onClose}><audio controls src={cdnUri} /></ClickAwayListener>}
                {mimeType !== false && type === 'VIDEO' && <ClickAwayListener onClickAway={onClose}>
                    <video controls width={window.innerWidth * .9}>
                        <source type={mimeType} src={cdnUri} />
                    </video>
                </ClickAwayListener>}
            </div>
        </Modal>
    }
};

export default SimpleModal;

