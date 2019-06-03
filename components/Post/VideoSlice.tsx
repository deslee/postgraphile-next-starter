import * as React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { VideoSlice } from './PostData';

const useStyles = makeStyles(theme => ({
    textArea: {
        minHeight: 350
    }
}))

interface Props {
    slice: VideoSlice;
    name: string;
}

const VideoSliceComponent = (props: Props) => {
    const classes = useStyles()
    return <></>
}

export default VideoSliceComponent;