import * as React from 'react';
import { Paper, TextField, FormControl, InputLabel, FormHelperText, Grid, InputAdornment, FormControlLabel, Switch, FormGroup, Button, IconButton, Divider, Fab, Collapse, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { DatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import * as dayjs from 'dayjs';
import clsx from 'clsx';
import UpIcon from '@material-ui/icons/ArrowUpward'
import DownIcon from '@material-ui/icons/ArrowDownward'
import { SliceModel } from './Slices';
import ImagesSlice from './ImagesSlice';
import VideoSlice from './VideoSlice';
import TextSlice from './TextSlice';

interface Props {
    onRemoveSlice: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    slice: SliceModel;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(4),
        position: 'relative'
    },
    toolBar: {
        textAlign: 'right',
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2)
    },
    title: {
        textTransform: 'capitalize'
    },
}))

const Slice = ({ slice, onRemoveSlice, onMoveUp, onMoveDown }: Props) => {
    const classes = useStyles();
    const [deleted, setDeleted] = React.useState(false);

    const s = () => {
        switch (slice.type) {
            case 'TEXT':
                return <TextSlice />
            case 'IMAGES':
                return <ImagesSlice />
            case 'VIDEO':
                return <VideoSlice />
            default:
                return undefined;
        }
    }

    return <>
        <Collapse in={slice.state === 'ACTIVE' && !deleted} mountOnEnter={true} unmountOnExit={true} onExited={() => onRemoveSlice()}>
            <Paper className={classes.paper} elevation={1}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.title}>{slice.type && slice.type.toLowerCase()}</Typography>
                        <div className={classes.toolBar}>
                            <IconButton 
                                size="small" 
                                color="secondary" 
                                onClick={() => {
                                    setDeleted(true);
                                }} 
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton size="small" disabled={onMoveUp === undefined} onClick={() => onMoveUp && onMoveUp()} >
                                <UpIcon />
                            </IconButton><br />
                            <IconButton size="small" disabled={onMoveDown === undefined} onClick={() => onMoveDown && onMoveDown()} >
                                <DownIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {s()}
                    </Grid>
                </Grid>
            </Paper>
        </Collapse>
    </>
}

export default Slice;