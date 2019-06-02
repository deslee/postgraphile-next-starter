import * as React from 'react';
import { Paper, TextField, FormControl, InputLabel, FormHelperText, Grid, InputAdornment, FormControlLabel, Switch, FormGroup, Button, IconButton, Divider, Fab, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { DatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import * as dayjs from 'dayjs';
import clsx from 'clsx';
import UpIcon from '@material-ui/icons/ArrowDropUp'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import { SliceModel } from './Slices';

interface Props {
    onRemoveSlice: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    slice: SliceModel;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(4),
    },
    toolBar: {
        textAlign: 'right'
    },
}))

const Slice = ({ slice, onRemoveSlice, onMoveUp, onMoveDown }: Props) => {
    const classes = useStyles();

    return <>
        <Collapse in={slice.state === 'ACTIVE'}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} className={classes.toolBar}>
                        <IconButton color="secondary" onClick={() => onRemoveSlice()} >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => onMoveUp()} >
                            <UpIcon />
                        </IconButton>
                        <IconButton onClick={() => onMoveDown()} >
                            <DownIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        {slice.id}
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Paper>
        </Collapse>
    </>
}

export default Slice;