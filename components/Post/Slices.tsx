import * as React from 'react';
import Slice from './Slice';
import * as uuid from 'uuid/v4';
import { Fab, makeStyles, Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextSliceIcon from '@material-ui/icons/TextFields';
import ImagesSliceIcon from '@material-ui/icons/InsertPhoto';
import VideoSliceIcon from '@material-ui/icons/VideoLibrary';
import debounce from '../../utils/debounce';
import arrayMove from '../../utils/arrayMove';
import posed, { PoseGroup } from 'react-pose';
const Item = posed.div();



type SliceState = 'NEW' | 'ACTIVE'
type SliceType = 'TEXT' | 'IMAGES' | 'VIDEO'

export interface SliceModel {
    id: string,
    state: SliceState,
    type?: SliceType
}

interface Props {
    slices: SliceModel[]
    onSlicesUpdate: (slices: SliceModel[]) => void;
}

const useStyles = makeStyles(theme => ({
    addSliceAction: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    addSliceButton: {
    },
    addSliceIcon: {
        marginRight: theme.spacing(1)
    },
}))

const Slices = ({ slices, onSlicesUpdate }: Props) => {
    const classes = useStyles();
    const [newSlice, setNewSlice] = React.useState({ id: uuid(), state: 'NEW' } as SliceModel)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onAdd = (slice: SliceModel) => {
        onSlicesUpdate([...slices, { ...slice, state: 'ACTIVE' }])
    }

    const onRemove = (slice: SliceModel) => {
        onSlicesUpdate(slices.filter(s => s.id !== slice.id))
    }

    const onMoveUp = (slice: SliceModel) => {
        const index = slices.indexOf(slice);
        onSlicesUpdate(arrayMove(slices, index, index-1))
    }

    const onMoveDown = (slice: SliceModel) => {
        const index = slices.indexOf(slice);
        onSlicesUpdate(arrayMove(slices, index, index+1))
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const addSlice = (type: SliceType) => {
        onAdd({
            ...newSlice,
            type
        })
        setNewSlice({id: uuid(), state: 'NEW'})
        closeMenu();
    }

    return <>
        <PoseGroup>{[...slices, newSlice].map((slice, idx) => <Item key={slice.id}>
            <Slice slice={slice} onRemoveSlice={() => onRemove(slice)} onMoveUp={idx !== 0 ? () => onMoveUp(slice) : undefined} onMoveDown={idx !== slices.length - 1 ? () => onMoveDown(slice) : undefined} />
        </Item>)}</PoseGroup>
        <div className={classes.addSliceAction}>
            <Fab 
                aria-owns={anchorEl ? 'add-new-slice-menu' : undefined}
                aria-haspopup="true"
                onClick={(event) => {
                    setAnchorEl(event.target)
                }}
                variant="extended"
                className={classes.addSliceButton}
                color="primary"
                size="medium"
                aria-label="Add Slice"
            ><AddIcon className={classes.addSliceIcon} />Add Slice</Fab>
            <Menu id="add-new-slice-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => closeMenu()}>
                <MenuItem onClick={() => addSlice('TEXT')}>
                    <ListItemIcon>
                        <TextSliceIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Text</Typography>
                </MenuItem>
                <MenuItem onClick={() => addSlice('IMAGES')}>
                    <ListItemIcon>
                        <ImagesSliceIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Images</Typography>
                </MenuItem>
                <MenuItem onClick={() => addSlice('VIDEO')}>
                    <ListItemIcon>
                        <VideoSliceIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Video</Typography>
                </MenuItem>
            </Menu>
        </div>
    </>
}
const propsAreEqual = ({slices: prevSlices}: Props, {slices}: Props) => slices.map(s => s.id).join(',') === prevSlices.map(s => s.id).join(',')
export default React.memo<Props>(Slices, propsAreEqual);