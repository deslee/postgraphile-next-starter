import * as React from 'react';
import Slice from './Slice';
import * as uuid from 'uuid/v4';
import { Fab, makeStyles, Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextSliceIcon from '@material-ui/icons/TextFields';
import ImagesSliceIcon from '@material-ui/icons/InsertPhoto';
import VideoSliceIcon from '@material-ui/icons/VideoLibrary';
import { Slice as SliceModel, SliceType } from './PostData'
import posed, { PoseGroup } from 'react-pose';
import { FieldArray } from 'formik';
const Item = posed.div();


interface Props {
    slices: SliceModel[]
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

const Slices = ({ slices }: Props) => {
    const classes = useStyles();
    const [newSlice, setNewSlice] = React.useState({ id: uuid(), state: 'NEW' } as SliceModel)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const closeMenu = () => {
        setAnchorEl(null);
    }

    return <>
        <FieldArray
            name="data.slices"
            render={({ move, swap, push, insert, unshift, pop, remove }) => {
                const addSlice = (type: SliceType) => {
                    push({
                        ...newSlice,
                        type,
                        state: 'ACTIVE'
                    });
                    setNewSlice({ id: uuid(), state: 'NEW' })
                    closeMenu();
                };

                return <>
                    <PoseGroup>
                        {[...slices, newSlice].map((slice, idx) => <Item key={slice.id}>
                            <Slice name={`data.slices[${idx}]`} slice={slice} onRemoveSlice={() => remove(slices.indexOf(slice))} onMoveUp={() => idx > 0 && move(idx, idx - 1)} onMoveDown={() => idx < slices.length - 1 && move(idx, idx + 1)} />
                        </Item>)}
                    </PoseGroup>
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
            }}
        />
    </>

}
export default Slices;