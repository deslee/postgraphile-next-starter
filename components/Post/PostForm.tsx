import * as React from 'react';
import { Paper, TextField, FormControl, InputLabel, FormHelperText, Grid, InputAdornment, FormControlLabel, Switch, FormGroup, Button, IconButton, Divider, Fab, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import { DatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import * as dayjs from 'dayjs';
import Slices, { SliceModel } from './Slices';
import * as uuid from 'uuid/v4';

interface Props {

}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        minHeight: `calc(100% - ${theme.spacing(3) * 2}px)`,
    },
    paper: {
        padding: theme.spacing(4),
    },
    actionButtons: {
        textAlign: 'right'
    },
    saveAction: {
        marginLeft: theme.spacing(2),
        alignSelf: 'baseline',
        marginTop: theme.spacing(1)
    },
    deleteAction: {
        alignSelf: 'start'
    },
    permaLink: {
        flexGrow: 1
    },
    top: {
        display: 'flex'
    },
    addNextSlice: {

    },
}))

const PostForm = (props: Props) => {
    const classes = useStyles();
    const [slices, setSlices] = React.useState([{ id: uuid(), state: 'ACTIVE' }] as SliceModel[])

    return <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.top}>
                    <TextField
                        variant="outlined"
                        className={classes.permaLink}
                        label="Permalink"
                        helperText="This will go in the url"
                        InputProps={{ startAdornment: <InputAdornment position="start">/posts/</InputAdornment> }}
                    />
                    <IconButton className={classes.deleteAction} aria-label="Delete">
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                    <Button className={classes.saveAction} size="large" color="primary" variant="contained">Save</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        //variant="outlined"
                        fullWidth
                        label="Title"
                        helperText="The title of the post"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DatePicker fullWidth helperText="The date of the post" label="Date" value={dayjs('2019-06-28')} onChange={() => { }} />
                </Grid>
                <Grid item xs={6} md={6}>
                    <FormGroup row>
                        <TextField
                            fullWidth
                            type="password"
                            label="Passport protection"
                            helperText="Password protection is disabled"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper>
        <Slices slices={slices} onSlicesUpdate={slices => {
            setSlices(slices)
        }} />
    </div>

}

export default PostForm;