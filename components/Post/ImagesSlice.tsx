import * as React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ImagesSlice } from './PostData';

const useStyles = makeStyles(theme => ({
    textArea: {
        minHeight: 350
    }
}))

interface Props {
    slice: ImagesSlice;
    name: string;
}

const ImagesSliceComponent = (props: Props) => {
    const classes = useStyles()
    return <></>
}

export default ImagesSliceComponent;